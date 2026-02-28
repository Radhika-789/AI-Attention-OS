from fastapi import APIRouter
from services.pomodoro_service import PomodoroService

router = APIRouter(prefix="/pomodoro", tags=["Pomodoro"])

@router.post("/rooms/{room_id}/join")
def join_room(room_id: str, user_id: str):
    return PomodoroService.join_room(room_id, user_id)


@router.get("/rooms/{room_id}/state")
def get_room_state(room_id: str):
    return PomodoroService.get_room_state(room_id)