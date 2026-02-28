# auth/google_oauth.py

import pickle

from google_auth_oauthlib.flow import InstalledAppFlow
import os

SCOPES = [
    "https://www.googleapis.com/auth/classroom.courses.readonly",
    "https://www.googleapis.com/auth/classroom.announcements.readonly",
    "https://www.googleapis.com/auth/classroom.student-submissions.me.readonly",
    "https://www.googleapis.com/auth/calendar.readonly"
]   

def get_google_creds():
    creds = None

    if os.path.exists("token.pkl"):
        with open("token.pkl", "rb") as token:
            creds = pickle.load(token)

    if not creds:
        flow = InstalledAppFlow.from_client_secrets_file(
            r"C:\Users\AKSHAYA\Desktop\hack\AI-Attention-OS\attention-manager\backend\app\auth\credentials.json", SCOPES
        )
        creds = flow.run_local_server(port=8080)

        with open("token.pkl", "wb") as token:
            pickle.dump(creds, token)

    return creds