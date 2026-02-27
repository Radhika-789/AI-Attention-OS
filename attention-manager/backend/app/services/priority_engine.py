# services/priority_engine.py

import requests
import os
import json

def gemini_priority_engine(tasks):

    api_key = os.getenv("AIzaSyDqtqNWUuQW6SsXGXrAbWNhCjqjPeNlhN0")

    prompt = f"""
You are an AI academic planner.

Here is student data in JSON format:

{json.dumps(tasks, indent=2)}

Instructions:

1. Identify urgent tasks.
2. Detect quiz/exam mentions in announcements.
3. Assign priority level to each task (HIGH, MEDIUM, LOW).
4. Determine overall workload level: LOW, MEDIUM, HIGH.
5. Suggest Pomodoro distribution.

Return ONLY valid JSON in this format:

{{
  "workload_level": "",
  "prioritized_tasks": [
    {{
      "title": "",
      "priority": "",
      "reason": ""
    }}
  ],
  "pomodoro_plan": "",
  "summary": ""
}}
"""

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={api_key}"

    body = {
        "contents": [{
            "parts": [{"text": prompt}]
        }]
    }

    response = requests.post(url, json=body)
    result = response.json()

    text_output = result["candidates"][0]["content"]["parts"][0]["text"]

    # Try parsing JSON
    try:
        return json.loads(text_output)
    except:
        return {"error": "Gemini did not return valid JSON", "raw": text_output}