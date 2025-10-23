import asyncio
import tornado.web
import tornado.websocket
import serial
import time
from datetime import datetime


serial_port_name = '/dev/ttyACM0'
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

async def read_serial_data():
    """Lê dados do Arduino e envia para todos os clientes."""
    while True:
        if serial_port.in_waiting > 0:
            data = serial_port.readline().decode('utf-8', errors='ignore').strip()
            print("Dados recebidos do Arduino:", data)
            time.sleep(1)

          
            for client in list(clients):
                try:
                    client.write_message(data)
                except:
                    clients.discard(client)

        await asyncio.sleep(0.1)

async def main():
    app = make_app()
    app.listen(8888, address="0.0.0.0")
    print("Servidor WebSocket rodando em ws://localhost:8888/ws")


    await read_serial_data()

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("Encerrando servidor...")
        serial_port.close()
