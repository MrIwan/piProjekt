import subprocess

class PhysicalServer:
    def __init__(self):
        self.sp = None
        self.status = 'offline'
    def get_status(self):
        return self.status
    def start(self):
        if self.status == 'offline':
            self.sp = subprocess.Popen(['python3', '/home/iwan/workSpace/piProjekt/server/main.py'])
            self.status = 'online'
    def stop(self):
        if self.status == 'online':
            self.sp.terminate()
            self.status = 'offline'
        print('hallo aus stop')

class Menager:
    def __init__(self):
        self.user_online = []
        self.game_server = None
        self.system_info = {}
        self.phyServer = PhysicalServer()
    def get_data(self):
        data = {}
        data['status'] = self.phyServer.get_status()
        data['system_info'] = self.system_info
        data['user_online'] = self.user_online
        data['game_server'] = self.game_server
        return data
    def start(self):
        self.phyServer.start()
    def stop(self):
        self.phyServer.stop()
    def add_user(self, c):
        if not c in self.user_online:
            self.user_online.append(c)
    def remove_user(self, c):
        if c in self.user_online:
            self.user_online.remove(c)
    def set_server_status(self, gs):
        self.game_server = gs['game_server']
        self.system_info = gs['status']
    def get_game_server(self):
        return self.game_server