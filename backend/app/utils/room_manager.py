# app/utils/room_manager.py
import time
import asyncio
from typing import Dict, List, Any
from fastapi import WebSocket
from collections import OrderedDict
from app.utils.db import rooms_history_collection  # MongoDB pour sauvegarde historique

class Room:
    def __init__(
        self,
        room_id: str,
        challenge_id: str,
        max_players: int = 10,
        duration_seconds: int = 600
    ):
        self.room_id = room_id
        self.challenge_id = challenge_id
        self.max_players = max_players
        self.duration_seconds = duration_seconds
        self.started_at: float | None = None
        self.clients: Dict[str, WebSocket] = {}       # username -> websocket
        self.scores: Dict[str, int] = {}              # username -> score
        self.chat_history: List[Dict[str, Any]] = []  # messages
        self.lock = asyncio.Lock()

    def start(self):
        self.started_at = time.time()

    def time_left(self):
        if not self.started_at:
            return self.duration_seconds
        left = int(self.duration_seconds - (time.time() - self.started_at))
        return max(0, left)

    def is_active(self):
        return self.time_left() > 0

    def add_chat(self, username: str, message: str):
        msg = {
            "username": username,
            "message": message,
            "timestamp": time.time()
        }
        self.chat_history.append(msg)
        return msg

class RoomManager:
    def __init__(self):
        self.rooms: Dict[str, Room] = {}

    # -----------------------------
    # Internal: Save Room to DB
    # -----------------------------
    def _save_room_to_db(self, room: Room):
        if not room:
            return
        data = {
            "room_id": room.room_id,
            "challenge_id": room.challenge_id,
            "players": list(room.scores.keys()),
            "scores": room.scores,
            "winner": max(room.scores, key=room.scores.get) if room.scores else None,
            "chat_history": room.chat_history,
            "start_time": room.started_at if room.started_at else time.time(),
            "end_time": time.time()
        }
        # Upsert: insert if not exist, otherwise update
        rooms_history_collection.update_one(
            {"room_id": room.room_id},
            {"$set": data},
            upsert=True
        )

    # -----------------------------
    # Room CRUD
    # -----------------------------
    def create_room(
        self,
        room_id: str,
        challenge_id: str,
        max_players=10,
        duration_seconds=600
    ) -> Room:
        if room_id in self.rooms:
            raise ValueError("Room already exists")
        room = Room(room_id, challenge_id, max_players, duration_seconds)
        self.rooms[room_id] = room
        self._save_room_to_db(room)  # sauvegarde automatique
        return room

    def get_room(self, room_id: str) -> Room | None:
        return self.rooms.get(room_id)

    def delete_room(self, room_id: str):
        if room_id in self.rooms:
            del self.rooms[room_id]

    # -----------------------------
    # WebSocket Management
    # -----------------------------
    async def connect(self, room_id: str, username: str, websocket: WebSocket):
        room = self.get_room(room_id)
        if not room:
            raise KeyError("Room not found")
        async with room.lock:
            if len(room.clients) >= room.max_players:
                raise RuntimeError("Room full")
            await websocket.accept()
            room.clients[username] = websocket
            if username not in room.scores:
                room.scores[username] = 0
        self._save_room_to_db(room)

    async def disconnect(self, room_id: str, username: str):
        room = self.get_room(room_id)
        if not room:
            return
        async with room.lock:
            room.clients.pop(username, None)
        self._save_room_to_db(room)

    async def broadcast(self, room_id: str, message: dict):
        room = self.get_room(room_id)
        if not room:
            return
        dead = []
        async with room.lock:
            for username, ws in list(room.clients.items()):
                try:
                    await ws.send_json(message)
                except Exception:
                    dead.append(username)
            for u in dead:
                room.clients.pop(u, None)

    async def send_to_user(self, room_id: str, username: str, message: dict):
        room = self.get_room(room_id)
        if not room:
            return
        ws = room.clients.get(username)
        if ws:
            await ws.send_json(message)

    # -----------------------------
    # Score Management
    # -----------------------------
    def update_score(self, room_id: str, username: str, score_delta: int, final: bool = False):
        room = self.get_room(room_id)
        if not room:
            return
        room.scores[username] = room.scores.get(username, 0) + score_delta
        self._save_room_to_db(room)  # sauvegarde automatique
        return room.scores[username]

    def get_leaderboard(self, room_id: str):
        room = self.get_room(room_id)
        if not room:
            return []
        return sorted(room.scores.items(), key=lambda kv: kv[1], reverse=True)

    # -----------------------------
    # Chat Management
    # -----------------------------
    def add_message(self, room_id: str, username: str, message: str):
        room = self.get_room(room_id)
        if not room:
            return None
        msg = room.add_chat(username, message)
        self._save_room_to_db(room)  # sauvegarde automatique
        return msg

# Singleton pour l’import
room_manager = RoomManager()
