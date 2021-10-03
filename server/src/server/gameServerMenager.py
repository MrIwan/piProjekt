from .msj import MSJ

class GameServerMenager:
    def __init__(self):
        self.msj = MSJ()
        self.available = ['msj']
    def get_available(self):
        gm = []
        print(self.msj.get_info())
        gm.append(self.msj.get_info())
        return gm
    def start_game_server(self, id):
        if id == 'msj':
            self.msj.start()
    def stop_game_server(self, id):
        if id == 'msj':
            self.msj.stop()