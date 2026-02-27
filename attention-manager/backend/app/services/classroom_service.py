# services/classroom_service.py

from googleapiclient.discovery import build
from datetime import datetime

def get_classroom_tasks(creds):
    service = build("classroom", "v1", credentials=creds)

    tasks = []

    courses = service.courses().list().execute().get("courses", [])

    for course in courses:
        if course.get("courseState") != "ACTIVE":
            continue

        course_id = course["id"]
        course_name = course["name"]

        # Assignments
        coursework = service.courses().courseWork().list(
            courseId=course_id
        ).execute().get("courseWork", [])

        for work in coursework:

            if "dueDate" not in work:
                continue

            due = work["dueDate"]
            due_date = datetime(
                due["year"], due["month"], due["day"]
            )

            submissions = service.courses().courseWork().studentSubmissions().list(
                courseId=course_id,
                courseWorkId=work["id"]
            ).execute().get("studentSubmissions", [])

            status = submissions[0]["state"] if submissions else "UNKNOWN"

            if status != "TURNED_IN":
                tasks.append({
                    "type": "assignment",
                    "course": course_name,
                    "title": work["title"],
                    "due": due_date.strftime("%Y-%m-%d"),
                    "status": status
                })

        # Announcements
        announcements = service.courses().announcements().list(
            courseId=course_id
        ).execute().get("announcements", [])

        for ann in announcements:
            tasks.append({
                "type": "announcement",
                "course": course_name,
                "content": ann.get("text", "")
            })

    return tasks