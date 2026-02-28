# routes/dashboard.py

from fastapi import APIRouter, Body
from typing import List
from datetime import datetime
from services.priority_engine import dynamic_priority_engine
from routes.sync import sync  # reuse your sync logic


router = APIRouter()

# Temporary in-memory store (replace with DB later)
USER_MANUAL_TASKS = []


# ----------------------------------------
# 1️⃣ GET Dashboard (Synced + Manual)
# ----------------------------------------

@router.get("/")
def get_dashboard():

    # Step 1: Get synced academic tasks
    sync_data = sync()
    synced_priorities = sync_data["ai_analysis"]

    # Step 2: Merge manual tasks into same format
    combined_tasks = USER_MANUAL_TASKS.copy()

    # You may also want raw synced tasks instead of processed,
    # but assuming sync() returns processed output,
    # ideally you should refactor sync to return raw tasks.

    return {
        "manual_events": USER_MANUAL_TASKS,
        "academic_priorities": synced_priorities
    }


# ----------------------------------------
# 2️⃣ Add Manual Event (Exam / Club / etc.)
# ----------------------------------------

@router.post("/add-event")
def add_event(
    title: str = Body(...),
    event_type: str = Body(...),
    due_date: str = Body(...),  # format: YYYY-MM-DD
    priority_boost: int = Body(0)
):

    try:
        due_obj = datetime.strptime(due_date, "%Y-%m-%d").date()
        today = datetime.now().date()
        days_left = (due_obj - today).days
    except:
        return {"error": "Invalid date format. Use YYYY-MM-DD"}

    new_task = {
        "title": title,
        "type": event_type,
        "course": "Manual",
        "due": due_date,
        "days_left": days_left,
        "status": "manual",
        "priority_boost": priority_boost
    }

    USER_MANUAL_TASKS.append(new_task)

    return {
        "message": "Event added successfully.",
        "event": new_task
    }


# ----------------------------------------
# 3️⃣ Get Updated Priority (Sync + Manual)
# ----------------------------------------

@router.get("/priorities")
def get_updated_priorities():

    # Get fresh academic tasks
    sync_data = sync()

    raw_academic_tasks = sync_data.get("raw_tasks", [])

    combined_tasks = raw_academic_tasks + USER_MANUAL_TASKS

    ai_response = dynamic_priority_engine(combined_tasks)

    return {
        "dashboard_priorities": ai_response
    }