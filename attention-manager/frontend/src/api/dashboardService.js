const BASE_URL = "http://127.0.0.1:8000/api";

export const getPriorities = async () => {
  const response = await fetch(`${BASE_URL}/dashboard/priorities`);
  return response.json();
};

export const addEvent = async (eventData) => {
  const response = await fetch(`${BASE_URL}/dashboard/add-event`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  return response.json();
};