# routes/sync.py

from fastapi import APIRouter
from auth.google_oauth import get_google_creds
from services.classroom_service import get_classroom_tasks
from services.calendar_service import get_calendar_events
from services.priority_engine import dynamic_priority_engine

router = APIRouter()


@router.get("/sync")
def sync():

    # Step 1: Google OAuth
    creds = get_google_creds()

    # Step 2: Fetch Classroom + Calendar
    classroom_tasks = get_classroom_tasks(creds)
    calendar_events = get_calendar_events(creds)

    # Step 3: Merge All Tasks
    all_tasks = classroom_tasks + calendar_events

    # Step 4: Run Priority Engine
    ai_response = dynamic_priority_engine(all_tasks)

    return {
        "raw_tasks": all_tasks,     # 🔥 IMPORTANT ADDITION
        "ai_analysis": ai_response
    }