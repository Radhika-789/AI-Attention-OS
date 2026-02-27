# auth/google_oauth.py

from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = [
    "https://www.googleapis.com/auth/classroom.courses.readonly",
    "https://www.googleapis.com/auth/classroom.announcements.readonly",
    "https://www.googleapis.com/auth/calendar.readonly"
]

def get_google_creds():
    flow = InstalledAppFlow.from_client_secrets_file(
        "credentials.json", SCOPES
    )

    creds = flow.run_local_server(port=8080)
    return creds