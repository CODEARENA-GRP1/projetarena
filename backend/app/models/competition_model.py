# app/models/competition_model.py
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

class JoinRoomRequest(BaseModel):
    room_id: str
    username: str

class CreateRoomRequest(BaseModel):
    room_id: Optional[str] = None  # si non fourni, serveur en crée un
    challenge_id: str
    max_players: int = 10
    duration_seconds: int = 600  # durée par défaut

class RoomInfo(BaseModel):
    room_id: str
    challenge_id: str
    players: List[str]
    is_active: bool
    time_left: Optional[int] = None

class ChatMessage(BaseModel):
    type: str = "chat"
    username: str
    message: str
    ts: Optional[float] = None

class ScoreUpdate(BaseModel):
    type: str = "score"
    username: str
    score: int
    final: bool = False
