import asyncio
import time
import docker
import os

def get_container(client):
    containers = client.containers.list()
    for c in containers:
        if( c.image.tags[0].split(':')[0] == 'itzg/minecraft-server'):
            return client.containers.get(c.id)
    return client.containers.create(image='itzg/minecraft-server', detach=True, environment=['EULA=TRUE'], ports={'25565/tcp':'25565'}, tty=True, volumes=['/home/iwan/workSpace/piProjekt/server/src/server/msj_data:/data'] )


class MSJ:
    def __init__(self):
        self.id = 'msj'
        self.name = 'MSJ'
        self.status = 'offline'
        self.server_address = '192.168.0.27:5000'
        self.start_button = True
        self.download_button = True
        self.client = docker.from_env()

        self.container = get_container(self.client)

    def get_info(self):
        data = {}
        data['id'] = self.id
        data['name'] = self.name
        data['status'] = self.status
        self.container.reload()
        data['docker_status'] = self.container.status
        data['server_address'] = self.server_address
        data['start_button'] = self.start_button
        data['download_button'] = self.download_button
        return data
    def start(self):
        self.container.start()
        self.status = 'online'
    def stop(self):
        self.container.stop()
        self.status = 'offline'
    def command(self, command):
        pass
