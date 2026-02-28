# auth/google_oauth.py

import pickle

from google_auth_oauthlib.flow import InstalledAppFlow
import os
from googleapiclient.discovery import build
from fastapi import APIRouter
from fastapi.responses import RedirectResponse
from google_auth_oauthlib.flow import Flow
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
os.environ["OAUTHLIB_RELAX_TOKEN_SCOPE"] = "1"
router = APIRouter()
SCOPES = [
    "openid",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/classroom.courses.readonly",
    "https://www.googleapis.com/auth/classroom.announcements.readonly",
    "https://www.googleapis.com/auth/classroom.student-submissions.me.readonly",
    "https://www.googleapis.com/auth/calendar.readonly"
]

CLIENT_SECRETS_FILE = r"C:\Users\AKSHAYA\Desktop\hack\AI-Attention-OS\attention-manager\backend\app\auth\credentials1.json"

flow = Flow.from_client_secrets_file(
    CLIENT_SECRETS_FILE,
    scopes=SCOPES,
    redirect_uri="http://localhost:8000/auth/callback"
)

credentials_store = {}  # Hackathon in-memory storage
def get_google_creds():
    if "token" not in credentials_store:
        return None

    creds = Credentials(
        token=credentials_store.get("token"),
        refresh_token=credentials_store.get("refresh_token"),
        token_uri="https://oauth2.googleapis.com/token",
        client_id=flow.client_config["client_id"],
        client_secret=flow.client_config["client_secret"],
        scopes=SCOPES
    )

    return creds
def get_user_email(creds):
    service = build("oauth2", "v2", credentials=creds)
    user_info = service.userinfo().get().execute()
    return user_info["email"]

@router.get("/login")
def login():
    authorization_url, state = flow.authorization_url(
        access_type="offline",
        include_granted_scopes="true"
    )
    return RedirectResponse(authorization_url)


@router.get("/callback")
def callback(code: str):
    flow.fetch_token(code=code)
    credentials = flow.credentials

    credentials_store["token"] = credentials.token
    credentials_store["refresh_token"] = credentials.refresh_token

    # Get user email immediately
    service = build("oauth2", "v2", credentials=credentials)
    user_info = service.userinfo().get().execute()
    user_email = user_info["email"]

    # Save email to file
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    EMAIL_FILE = os.path.join(BASE_DIR, "user_email.txt")

    with open(EMAIL_FILE, "w") as f:
        f.write(user_email)
    return RedirectResponse("http://localhost:5173/?auth=success")