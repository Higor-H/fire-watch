import asyncio
import tornado.web
import tornado.websocket
import serial
import time
from datetime import datetime
import socket


serial_port_name = '/dev/ttyACM1'
serial_port = serial.Serial(serial_port_name, 9600)
time.sleep(2)


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

# adiciona estado persistente com as chaves solicitadas
state = {
    "umidade": "",
    "temperatura": "",
    "gas": "",
    "risco": ""
}

async def read_serial_data():
    """Lê dados do Arduino e envia para todos os clientes."""
    while True:
        if serial_port.in_waiting > 0:
            data = serial_port.readline().decode('utf-8', errors='ignore').strip()
            print("Dados recebidos do Arduino:", data)

            # mantém lógica de mapeamento, atualizando apenas a respectiva chave
            if data.startswith("Risk"):
                state["risco"] = data.replace("Risk: ", "").replace("Risk: ", "").replace(":", "").strip()
            elif data.startswith("Smoke:") or data.lower().startswith("smoke"):
                state["gas"] = data.replace("Smoke:", "").replace("Smoke", "").replace(":", "").strip()
            elif "Celsius" in data or " Celsius" in data or data.lower().startswith("temp"):
                state["temperatura"] = data.replace("Celsius:", "").replace("Celsius", "").replace(" Celsius:", "").replace(" Celsius", "").replace(":", "").strip()
            elif "Humidity" in data or " Humidity" in data or data.lower().startswith("humidity"):
                state["umidade"] = data.replace("Humidity:", "").replace("Humidity", "").replace(" Humidity:", "").replace(" Humidity", "").replace(":", "").strip()

            # envia o estado atual (sempre com as 4 chaves) como JSON-like dict
            await asyncio.sleep(0)  # yield para o loop de eventos

            for client in list(clients):
                try:
                    print(state)
                    client.write_message(state)
                except:
                    clients.discard(client)

        await asyncio.sleep(0.1)

# função utilitária para checar porta livre
def is_port_free(port, host="0.0.0.0"):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        try:
            s.bind((host, port))
            return True
        except OSError:
            return False

async def main():
    app = make_app()
    # tenta a porta padrão e, se ocupada, tenta portas seguintes (até +9)
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
