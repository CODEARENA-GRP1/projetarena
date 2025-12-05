# app/routes/competition_routes.py
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, HTTPException
from fastapi import BackgroundTasks
from typing import List
import uuid, time, asyncio

from app.models.competition_model import CreateRoomRequest, RoomInfo, ChatMessage, ScoreUpdate
from app.utils.room_manager import room_manager

router = APIRouter()

# Create a room
@router.post("/rooms", response_model=RoomInfo)
def create_room(payload: CreateRoomRequest):
    room_id = payload.room_id or uuid.uuid4().hex[:8]
    try:
        room = room_manager.create_room(room_id, payload.challenge_id, payload.max_players, payload.duration_seconds)
    except ValueError:
        raise HTTPException(400, "Room already exists")
    return RoomInfo(room_id=room_id, challenge_id=payload.challenge_id, players=[], is_active=False, time_left=room.duration_seconds)

# Get room info
@router.get("/rooms/{room_id}", response_model=RoomInfo)
def get_room(room_id: str):
    room = room_manager.get_room(room_id)
    if not room:
        raise HTTPException(404, "Room not found")
    players = list(room.clients.keys())
    return RoomInfo(room_id=room.room_id, challenge_id=room.challenge_id, players=players, is_active=room.is_active(), time_left=room.time_left())

# WebSocket endpoint for room (chat + live events)
@router.websocket("/ws/{room_id}/{username}")
async def websocket_endpoint(websocket: WebSocket, room_id: str, username: str):
    room = room_manager.get_room(room_id)
    if not room:
        await websocket.close(code=1003)
        return

    try:
        await room_manager.connect(room_id, username, websocket)
        # Notify others
        await room_manager.broadcast(room_id, {"type": "system", "message": f"{username} joined"})
        # send initial leaderboard
        await room_manager.send_to_user(room_id, username, {"type": "leaderboard", "leaderboard": room_manager.get_leaderboard(room_id)})
        # start room timer when first user joins
        if not room.started_at:
            room.start()

        while True:
            data = await websocket.receive_json()
            # expect a simple JSON with type
            msg_type = data.get("type")
            if msg_type == "chat":
                chat = {
                    "type": "chat",
                    "username": username,
                    "message": data.get("message"),
                    "ts": time.time()
                }
                room.chat_history.append(chat)
                await room_manager.broadcast(room_id, chat)
            elif msg_type == "ping":
                await websocket.send_json({"type":"pong"})
            else:
                # unknown type - ignore or extend
                pass

    except WebSocketDisconnect:
        await room_manager.disconnect(room_id, username)
        await room_manager.broadcast(room_id, {"type":"system", "message": f"{username} left"})
    except Exception as e:
        await room_manager.disconnect(room_id, username)
        await room_manager.broadcast(room_id, {"type":"system", "message": f"{username} disconnected due to error"})
        try:
            await websocket.close()
        except:
            pass
