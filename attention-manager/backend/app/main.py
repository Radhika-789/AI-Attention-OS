from fastapi import FastAPI
from routes.sync import router as sync_router
from routes.dashboard import router as dashboard_router
from routes.pomodoro import router as pomodoro_router
from fastapi.middleware.cors import CORSMiddleware
from auth.google_oauth import router as auth_router

from apscheduler.schedulers.background import BackgroundScheduler
from services.notification_service import send_email
from routes.sync import sync
from auth.google_oauth import get_google_creds
from services.classroom_service import get_classroom_tasks
from googleapiclient.discovery import build
import datetime
from dotenv import load_dotenv
load_dotenv()
scheduler = BackgroundScheduler()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
        allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
    ],  # adjust if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
EMAIL_FILE = os.path.join(BASE_DIR, "auth", "user_email.txt")
def morning_job():
    import os

    if not os.path.exists(EMAIL_FILE):
        print("No logged in user.")
        return

    with open(EMAIL_FILE, "r") as f:
        user_email = f.read().strip()

    body = "Hello! This is your priority reminder."

    send_email(
        user_email,
        "📌 Evening Priority Reminder",
        body
    )

    print("Email sent to:", user_email)

scheduler.add_job(
    morning_job,
    "cron",
    hour="20,21,23",
    minute=0
)

scheduler.start()
app.include_router(sync_router, prefix="/api")
app.include_router(dashboard_router, prefix="/api/dashboard")
app.include_router(pomodoro_router, prefix="/api/pomodoro")
app.include_router(auth_router, prefix="/auth")