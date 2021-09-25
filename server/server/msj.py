import asyncio

class MSJ:
    def __init__(self):
        self.status = 'offline'
    async def start(self):
        self.status = 'starting'
        await asyncio.sleep(10)
        self.status = 'online'
        return self.status
    async def stop(self):
        self.status = 'stopping'
        await asyncio.sleep(2)
        self.status = 'offline'
        return self.status