# routes/sync.py

from fastapi import APIRouter
from auth.google_oauth import get_google_creds
from services.classroom_service import get_classroom_tasks
from services.calendar_service import get_calendar_events
from services.priority_engine import add_days_left, detect_overload, get_ai_prioritization
from services.notification_service import send_email

router = APIRouter()

@router.get("/sync")
def sync():

    creds = get_google_creds()

    classroom_tasks = get_classroom_tasks(creds)
    calendar_events = get_calendar_events(creds)

    all_tasks = classroom_tasks + calendar_events

    all_tasks = add_days_left(all_tasks)

    overload = detect_overload(all_tasks)

    ai_response = get_ai_prioritization(all_tasks)

    if overload:
        send_email(
            "High Academic Load 🚨",
            ai_response
        )

    return {
        "tasks": all_tasks,
        "overload": overload,
        "ai_analysis": ai_response
    }