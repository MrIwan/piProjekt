import asyncio
import socketio
from server.gameServerMenager import GameServerMenager
from server.auslastung import Workload, get_system_status

URL = 'http://127.0.0.1:5000/'

sio = socketio.AsyncClient()

server_menager = GameServerMenager()

def collect_all_data():
    data = {}
    data['game_server'] = server_menager.get_available()
    data['status'] = get_system_status()
    return data


async def update_status(my_argument):
    while True:
        data = collect_all_data()
        await sio.emit('update_status', data)
        await sio.sleep(5)


@sio.event
async def connect():
    print('connection established')
    await sio.emit('server_online')

@sio.event
async def disconnect():
    print('disconnected from server')

@sio.on('start_game_server_forward')
async def start_game_server_forward(id):
    server_menager.start_game_server(id)
    await sio.emit('update_status', collect_all_data())

@sio.on('stop_game_server_forward')
async def stop_game_server_forward(id):
    server_menager.stop_game_server(id)
    await sio.emit('update_status', collect_all_data())


async def main():
    await sio.connect(URL)
    task = sio.start_background_task(update_status, 123)
    await sio.wait()

if __name__ == '__main__':
    asyncio.run(main())