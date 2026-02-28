import { useEffect, useState } from "react";
import { joinRoom, getRoomState } from "../api/pomodoroApi";

function Room() {
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  const userId = "user1"; // replace with real logged-in user

  useEffect(() => {
    const initRoom = async () => {
      const data = await joinRoom(roomId, userId);
      setRoomData(data);
    };

    initRoom();
  }, [roomId]);

  useEffect(() => {
    if (!roomData) return;

    const interval = setInterval(async () => {
      const updated = await getRoomState(roomId);
      setRoomData(updated);

      const now = Date.now() / 1000;
      const elapsed = now - updated.start_time;
      const remaining = updated.duration - elapsed;

      setTimeLeft(Math.max(Math.floor(remaining), 0));
    }, 1000);

    return () => clearInterval(interval);

  }, [roomData, roomId]);

  return (
    <div>
      <h2>Mode: {roomData?.mode}</h2>
      <h3>Cycle: {roomData?.cycle}</h3>
      <h1>
        {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, "0")}
      </h1>
    </div>
  );
}

export default Room;