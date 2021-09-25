import asyncio
import socketio
from server.gameServer import GameServer
from server.auslastung import Workload, get_system_status

URL = 'http://localhost:5000'

sio = socketio.AsyncClient()

game_server = GameServer()
workload = Workload()


async def update_status(my_argument):
    while True:
        data = {}
        data['game_server'] = game_server.get_available()
        data['status'] = get_system_status()
        await sio.emit('update_status', data)
        await sio.sleep(5)


@sio.event
async def connect():
    print('connection established')
    await sio.emit('server_online')

@sio.event
async def disconnect():
    print('disconnected from server')


async def main():
    await sio.connect(URL)
    task = sio.start_background_task(update_status, 123)
    await sio.wait()

if __name__ == '__main__':
    asyncio.run(main())