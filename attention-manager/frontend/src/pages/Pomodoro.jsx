import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Pomodoro() {
  const [time, setTime] = useState(1500);
  const [running, setRunning] = useState(false);
  const [roomInput, setRoomInput] = useState("");
  const [createdRoom, setCreatedRoom] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const createRoom = () => {
    const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCreatedRoom(roomId);
  };

  const goToCreatedRoom = () => {
    navigate(`/room/${createdRoom}`);
  };

  const joinRoom = () => {
    if (!roomInput.trim()) {
      alert("Enter a room code");
      return;
    }
    navigate(`/room/${roomInput.toUpperCase()}`);
  };

  return (
    <div className="container">
      <div className="card">
        <h1 style={{ textAlign: "center" }}>Pomodoro Timer</h1>

        <div className="timer">
          {minutes}:{seconds < 10 ? "0" : ""}
          {seconds}
        </div>

        <div className="button-group">
          <button onClick={() => setRunning(true)}>Start</button>
          <button onClick={() => setRunning(false)}>Pause</button>
          <button onClick={() => {
            setRunning(false);
            setTime(1500);
          }}>
            Reset
          </button>
        </div>

        <hr style={{ margin: "30px 0" }} />

        {/* CREATE ROOM SECTION */}
        <div style={{ textAlign: "center" }}>
          <h3>Create Pomodoro Room</h3>
          <button onClick={createRoom}>Create Room</button>

          {createdRoom && (
            <div style={{ marginTop: "20px" }}>
              <p>
                🎉 Room Created!
              </p>
              <h2 style={{ letterSpacing: "3px" }}>
                {createdRoom}
              </h2>
              <p>Share this code with your friends</p>
              <button onClick={goToCreatedRoom}>
                Enter Room
              </button>
            </div>
          )}
        </div>

        <hr style={{ margin: "30px 0" }} />

        {/* JOIN ROOM SECTION */}
        <div style={{ textAlign: "center" }}>
          <h3>Join Existing Room</h3>

          <input
            type="text"
            placeholder="Enter Room Code"
            value={roomInput}
            onChange={(e) => setRoomInput(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginRight: "10px"
            }}
          />

          <button onClick={joinRoom}>Join Room</button>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;