from pydantic import BaseModel
from typing import List, Dict

class RoomHistory(BaseModel):
    room_id: str
    challenge_id: str
    players: List[str]
    scores: Dict[str, int]
    winner: str | None
    start_time: float
    end_time: float
