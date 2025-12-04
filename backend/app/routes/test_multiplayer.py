# app/routers/test_multiplayer.py
from fastapi import APIRouter
from app.utils.room_manager import room_manager
from fastapi import WebSocket
import asyncio

router = APIRouter()

# -----------------------------
# Créer une room de test
# -----------------------------
@router.post("/test/create_room")
def create_room(room_id: str = "room1", challenge_id: str = "challenge123"):
    try:
        room = room_manager.create_room(room_id, challenge_id)
        room.start()
        return {"status": "room_created", "room_id": room.room_id, "challenge_id": room.challenge_id}
    except ValueError:
        return {"status": "failed", "reason": "Room already exists"}

# -----------------------------
# Ajouter un joueur et mettre à jour son score
# -----------------------------
@router.post("/test/update_score")
def update_score(room_id: str = "room1", username: str = "player1", score: int = 50):
    current_score = room_manager.update_score(room_id, username, score)
    return {"status": "score_updated", "username": username, "current_score": current_score}

# -----------------------------
# Ajouter un message chat
# -----------------------------
@router.post("/test/send_message")
def send_message(room_id: str = "room1", username: str = "player1", message: str = "Bonjour!"):
    msg = room_manager.add_message(room_id, username, message)
    return {"status": "message_sent", "message": msg}

# -----------------------------
# Sauvegarder la room dans MongoDB
# -----------------------------
@router.post("/test/save_room")
def save_room(room_id: str = "room1"):
    saved = room_manager.save_room_to_db(room_id)
    return {"status": "saved" if saved else "failed"}
