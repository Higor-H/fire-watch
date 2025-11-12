import asyncio
import tornado.web
import tornado.websocket
import serial
import time
from datetime import datetime
import socket

import pika
import os
import random



serial_port_name = '/dev/ttyACM0'
serial_port = serial.Serial(serial_port_name, 9600)
time.sleep(2)


params = pika.URLParameters('')
connection = None
channel = None

clients = set()

class WebSocketHandler(tornado.websocket.WebSocketHandler):
    def open(self):
        print("WebSocket aberto:", self.request.remote_ip)
        clients.add(self)

    def on_close(self):
        print("WebSocket fechado:", self.request.remote_ip)
        clients.discard(self)

    def check_origin(self, origin):

        return True


def make_app():
    return tornado.web.Application([
        (r"/ws", WebSocketHandler),
    ])


state = {
    "zona": "1",
    "umidade": "",
    "temperatura": "",
    "gas": "",
    "risco": ""
}


def setup_rabbitmq():
    """Inicializa conexão/canal RabbitMQ e garante a fila."""
    global connection, channel, params
    try:
        if connection is None or getattr(connection, "is_closed", False):
            connection = pika.BlockingConnection(params)
        if channel is None or getattr(channel, "is_closed", False):
            channel = connection.channel()
        try:

            channel.queue_declare(queue='zona_1', passive=True)
        except pika.exceptions.ChannelClosedByBroker as e:

            if getattr(e, "reply_code", None) == 404:
                channel = connection.channel()
                channel.queue_declare(queue='zona_1', durable=True)
            else:
                print("Erro ao verificar fila zona_teste:", e)
                try:
                    channel = connection.channel()
                except Exception:
                    pass
        return True
    except Exception as e:
        print("Falha ao conectar ao RabbitMQ:", e)
        connection = None
        channel = None
        return False

def upload_data_to_server(data):
    import json
    global connection, channel
    try:
        if not setup_rabbitmq():
            return

        data["timestamp"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        payload = json.dumps(data)
        channel.basic_publish(exchange='', routing_key='zona_1', body=payload)
        print("Dados enviados para fila zona_teste:", payload)
    except Exception as e:
        print("Erro ao enviar para RabbitMQ:", e)

        try:
            if channel and not channel.is_closed:
                channel.close()
        except Exception:
            pass
        channel = None

async def read_serial_data():
    """Lê dados do Arduino e envia para todos os clientes."""
    while True:
        if serial_port.in_waiting > 0:
            data = serial_port.readline().decode('utf-8', errors='ignore').strip()
            print("Dados recebidos do Arduino:", data)


            if data.startswith("Risk"):
                state["risco"] = data.replace("Risk: ", "").replace("Risk: ", "").replace(":", "").strip()
            elif data.startswith("Smoke:") or data.lower().startswith("smoke"):
                state["gas"] = data.replace("Smoke:", "").replace("Smoke", "").replace(":", "").strip()
            elif "Celsius" in data or " Celsius" in data or data.lower().startswith("temp"):
                state["temperatura"] = data.replace("Celsius:", "").replace("Celsius", "").replace(" Celsius:", "").replace(" Celsius", "").replace(":", "").strip()
            elif "Humidity" in data or " Humidity" in data or data.lower().startswith("humidity"):
                state["umidade"] = data.replace("Humidity:", "").replace("Humidity", "").replace(" Humidity:", "").replace(" Humidity", "").replace(":", "").strip()

            upload_data_to_server(state)
            await asyncio.sleep(0)

            for client in list(clients):
                try:
                    print(state)
                    client.write_message(state)
                except:
                    clients.discard(client)

        await asyncio.sleep(0.1)


def is_port_free(port, host="0.0.0.0"):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        try:
            s.bind((host, port))
            return True
        except OSError:
            return False

async def main():
    app = make_app()

    base_port = 8888
    port = None
    for p in range(base_port, base_port + 10):
        if is_port_free(p, "0.0.0.0"):
            port = p
            break

    if port is None:
        print(f"Erro: nenhuma porta livre encontrada entre {base_port} e {base_port+9}.")
        return

    app.listen(port, address="0.0.0.0")
    print(f"Servidor WebSocket rodando em ws://localhost:{port}/ws")


    await read_serial_data()

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Encerrando servidor...")
        serial_port.close()