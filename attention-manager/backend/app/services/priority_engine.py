# services/priority_engine.py

import heapq
from datetime import datetime
from itertools import count


USER_DEFINED_PRIORITIES = {
    "club_meeting": 20,
    "club_work": 15
}


def dynamic_priority_engine(tasks):

    today = datetime.now().date()
    pq = []
    unique_counter = count()

    for task in tasks:

        title = task.get("title", "Untitled")
        task_type = task.get("type", "general")
        course = task.get("course")
        due_str = task.get("due")
        days_left = task.get("days_left")

        # Ignore if no due date
        if not due_str:
            continue

        # Ignore past tasks
        if days_left is not None and days_left < 0:
            continue

        # Convert due date
        try:
            due_date = datetime.strptime(due_str, "%Y-%m-%d").date()
            days_left = (due_date - today).days
        except:
            continue

        # -------------------------
        # SCORING
        # -------------------------

        urgency_score = max(0, 10 - days_left)

        type_score = 0

        if task_type == "exam":
            type_score = 30
        elif task_type == "assignment":
            type_score = 15
        elif task_type == "lab":
            type_score = 10
        elif task_type in USER_DEFINED_PRIORITIES:
            type_score = USER_DEFINED_PRIORITIES[task_type]

        priority_score = urgency_score + type_score
        boost = task.get("priority_boost", 0)
        priority_score += boost

        heapq.heappush(
            pq,
            (
                -priority_score,
                next(unique_counter),
                {
                    "title": title,
                    "type": task_type,
                    "course": course,
                    "days_left": days_left,
                    "score": priority_score
                }
            )
        )

    sorted_tasks = []
    while pq:
        sorted_tasks.append(heapq.heappop(pq)[2])

    # Only next 3 days
    today_tasks = [t for t in sorted_tasks if t["days_left"] <= 3]

    # Estimate hours realistically
    total_hours = 0

    for t in today_tasks:

        if t["type"] == "exam":
            total_hours += 3
        elif t["type"] == "assignment":
            total_hours += 2
        elif t["type"] == "lab":
            total_hours += 1.5
        elif t["type"] == "club_meeting":
            total_hours += 1
        else:
            total_hours += 0.5

    pomodoros = int((total_hours * 60) / 25)

    if total_hours > 8:
        workload = "HIGH"
    elif total_hours > 4:
        workload = "MEDIUM"
    else:
        workload = "LOW"

    return {
        "today_priority_list": today_tasks[:8],
        "workload_level": workload,
        "recommended_pomodoros_today": pomodoros,
        "summary": f"{len(today_tasks)} important tasks in next 3 days."
    }