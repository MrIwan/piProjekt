from .msj import MSJ

def create_gameserver_json():
    #test mit msj
    msj = {}
    msj['id'] = 1
    msj['name'] = 'MSJ'
    msj['status'] = 'online'
    msj['server_address'] = '192.168.0.27:5000'
    msj['start_button'] = True
    msj['download_button'] = True

    #test mit factorio
    fact = {}
    fact['id'] = 2
    fact['name'] = 'Factorio'
    fact['status'] = 'offline'
    fact['server_address'] = 'gameserver.zuern.xyz:6001'
    fact['stat_button'] = False
    fact['download_button'] = True
    
    gm = []
    gm.append(msj)
    gm.append(fact)

    return gm

class GameServer:
    def __init__(self):
        self.msj = MSJ()
        self.available = ['msj']
    def get_available(self):
        return create_gameserver_json()