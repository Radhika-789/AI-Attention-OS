# services/calendar_service.py

from googleapiclient.discovery import build

def get_calendar_events(creds):
    service = build("calendar", "v3", credentials=creds)

    events = service.events().list(
        calendarId="primary",
        maxResults=10,
        singleEvents=True,
        orderBy="startTime"
    ).execute().get("items", [])

    event_list = []

    for event in events:
        if "dateTime" in event["start"]:
            event_list.append({
                "type": "calendar_event",
                "title": event.get("summary", "No Title"),
                "date": event["start"]["dateTime"][:10]
            })

    return event_list