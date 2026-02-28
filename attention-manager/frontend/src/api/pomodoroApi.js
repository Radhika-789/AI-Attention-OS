const BASE_URL = "http://127.0.0.1:8000/api/pomodoro";

export const joinRoom = async (roomId, userId) => {
  const response = await fetch(
    `${BASE_URL}/rooms/${roomId}/join?user_id=${userId}`,
    { method: "POST" }
  );
  return response.json();
};

export const getRoomState = async (roomId) => {
  const response = await fetch(
    `${BASE_URL}/rooms/${roomId}/state`
  );
  return response.json();
};