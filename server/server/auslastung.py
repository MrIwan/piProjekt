import psutil

class Workload:
    def __init__(self):
        self.cpu_percent = 0
        self.virtual_memory = {}
    def update(self):
        self.cpu_percent = psutil.cpu_percent(5)
        self.virtual_memory = psutil.virtual_memory()
    def status(self):
        stat = {}
        stat['cpu_percent'] = self.cpu_percent
        stat['virtual_memory'] = self.virtual_memory
        return stat

def get_system_status():
    stat = {}
    stat['cpu_percent'] = psutil.cpu_percent(1)
    stat['virtual_memory'] = psutil.virtual_memory()[2]
    return stat
