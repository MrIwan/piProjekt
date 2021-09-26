from .msj import MSJ

class GameServer:
    def __init__(self):
        self.msj = MSJ()
        self.available = ['msj']
    def get_available(self):
        gm = []
        gm.append(self.msj.get_info())
        return gm