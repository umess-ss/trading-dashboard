import json
from channels.generic.websocket import AsyncWebsocketConsumer

class MarketConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, code):
        pass

    async def receive(self, text_data):
        pass