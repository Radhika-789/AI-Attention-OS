const BASE_URL = "http://127.0.0.1:8000/pomodoro";
export const joinRoom = async (roomId, userId) => {
  const res = await fetch(`/api/rooms/${roomId}/join?user_id=${userId}`, {
    method: "POST"
  });
  return res.json();
};

export const getRoomState = async (roomId) => {
  const res = await fetch(`/api/rooms/${roomId}`);
  return res.json();
};