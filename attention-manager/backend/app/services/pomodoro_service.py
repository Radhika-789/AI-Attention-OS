import time

class PomodoroService:

    rooms = {}   # in-memory storage (use Redis later)

    @classmethod
    def join_room(cls, room_id: str, user_id: str):

        if room_id not in cls.rooms:
            cls.rooms[room_id] = {
                "mode": "FOCUS",
                "cycle": 1,
                "duration": 1500,  # 25 mins
                "start_time": time.time(),
                "participants": []
            }

        room = cls.rooms[room_id]

        if user_id not in room["participants"]:
            room["participants"].append(user_id)

        return room


    @classmethod
    def get_room_state(cls, room_id: str):

        if room_id not in cls.rooms:
            return {"error": "Room not found"}

        room = cls.rooms[room_id]

        elapsed = time.time() - room["start_time"]

        if elapsed >= room["duration"]:

            if room["mode"] == "FOCUS":
                room["mode"] = "BREAK"
                room["duration"] = 300  # 5 min break
            else:
                room["mode"] = "FOCUS"
                room["duration"] = 1500
                room["cycle"] += 1

            room["start_time"] = time.time()

        return room