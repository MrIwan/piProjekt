import asyncio

class MSJ:
    def __init__(self):
        self.id = 1
        self.name = 'MSJ'
        self.status = 'offline'
        self.server_address = '192.168.0.27:5000'
        self.start_button = True
        self.download_button = True
    def get_info(self):
        data = {}
        data['id'] = self.id
        data['name'] = self.name
        data['status'] = self.status
        data['server_address'] = self.server_address
        data['start_button'] = self.start_button
        data['download_button'] = self.download_button
    def start(self):
        self.status = 'online'
    def stop(self):
        self.status = 'offline'