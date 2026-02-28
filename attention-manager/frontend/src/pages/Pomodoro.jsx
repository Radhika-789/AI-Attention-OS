// frontend/src/pages/Pomodoro.jsx
// frontend/src/pages/Pomodoro.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MODES = [
  { label: "Focus",       seconds: 1500, icon: "🎯", color: "#c8b4f8" },
  { label: "Short Break", seconds: 300,  icon: "☕", color: "#6bcb77" },
  { label: "Long Break",  seconds: 900,  icon: "🛋️", color: "#4ca1af" },
];

function Pomodoro() {
  const [modeIdx,     setModeIdx]     = useState(0);
  const [time,        setTime]        = useState(MODES[0].seconds);
  const [running,     setRunning]     = useState(false);
  const [roomInput,   setRoomInput]   = useState("");
  const [createdRoom, setCreatedRoom] = useState(null);
  const navigate = useNavigate();

  const mode = MODES[modeIdx];
  const progress = 1 - time / mode.seconds;
  const circumference = 2 * Math.PI * 90; // radius=90

  // Switch mode
  function switchMode(idx) {
    setRunning(false);
    setModeIdx(idx);
    setTime(MODES[idx].seconds);
  }

  // Countdown
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) { clearInterval(t); setRunning(false); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running]);

  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  const createRoom = () => {
    const id = Math.random().toString(36).substring(2, 8).toUpperCase();
    setCreatedRoom(id);
  };

  const joinRoom = () => {
    if (!roomInput.trim()) return;
    navigate(`/room/${roomInput.toUpperCase()}`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&family=Sora:wght@600;700&display=swap');
        * { box-sizing: border-box; }
        .pom-page {
          min-height: 100vh;
          background: linear-gradient(135deg,#5b4fcf 0%,#7b68ee 30%,#9c6fd6 55%,#4ca1af 100%);
          font-family: 'Nunito', sans-serif;
          padding: 40px;
        }
        .pom-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          max-width: 960px;
          margin: 0 auto;
        }
        .pom-card {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 20px;
          padding: 32px;
          backdrop-filter: blur(12px);
        }
        .pom-card-title {
          font-family: 'Sora', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .mode-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 32px;
          background: rgba(0,0,0,0.15);
          border-radius: 12px;
          padding: 4px;
        }
        .mode-tab {
          flex: 1;
          padding: 8px 12px;
          border: none;
          border-radius: 9px;
          font-family: 'Nunito', sans-serif;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          background: transparent;
          color: rgba(255,255,255,0.5);
        }
        .mode-tab.active {
          background: rgba(255,255,255,0.18);
          color: #fff;
        }
        .timer-ring { display: block; margin: 0 auto 28px; }
        .timer-controls {
          display: flex;
          gap: 10px;
          justify-content: center;
        }
        .ctrl-btn {
          padding: 11px 24px;
          border-radius: 10px;
          font-family: 'Sora', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: 1.5px solid rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.15);
          color: #fff;
          transition: background 0.2s, transform 0.15s;
        }
        .ctrl-btn:hover { background: rgba(255,255,255,0.25); transform: translateY(-1px); }
        .ctrl-btn.primary { background: rgba(255,255,255,0.25); }
        .room-input {
          width: 100%;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 10px;
          padding: 12px 14px;
          font-family: 'Nunito', sans-serif;
          font-size: 14px;
          color: #fff;
          outline: none;
          margin-bottom: 10px;
        }
        .room-input::placeholder { color: rgba(255,255,255,0.4); }
        .room-input:focus { border-color: rgba(255,255,255,0.5); }
        .room-btn {
          width: 100%;
          padding: 12px;
          border: 1.5px solid rgba(255,255,255,0.3);
          border-radius: 10px;
          background: rgba(255,255,255,0.15);
          color: #fff;
          font-family: 'Sora', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          margin-bottom: 8px;
        }
        .room-btn:hover { background: rgba(255,255,255,0.25); transform: translateY(-1px); }
        .room-code-box {
          background: rgba(255,255,255,0.08);
          border: 1px dashed rgba(255,255,255,0.25);
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          margin-top: 16px;
        }
        .divider { height: 1px; background: rgba(255,255,255,0.12); margin: 20px 0; }
        @media (max-width: 640px) {
          .pom-grid { grid-template-columns: 1fr; }
          .pom-page { padding: 20px; }
        }
      `}</style>

      <div className="pom-page">
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <h1 style={{ fontFamily:"'Sora',sans-serif", fontSize:28, fontWeight:700, color:"#fff", marginBottom:6 }}>
            🍅 Pomodoro Timer
          </h1>
          <p style={{ fontSize:14, color:"rgba(255,255,255,0.55)" }}>Stay focused, study smarter</p>
        </div>

        <div className="pom-grid">

          {/* ── Timer Card ── */}
          <div className="pom-card">
            {/* Mode tabs */}
            <div className="mode-tabs">
              {MODES.map((m, i) => (
                <button key={m.label} className={`mode-tab ${modeIdx === i ? "active" : ""}`} onClick={() => switchMode(i)}>
                  {m.icon} {m.label}
                </button>
              ))}
            </div>

            {/* SVG Ring Timer */}
            <svg className="timer-ring" width="220" height="220" viewBox="0 0 220 220">
              {/* Track */}
              <circle cx="110" cy="110" r="90" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
              {/* Progress */}
              <circle
                cx="110" cy="110" r="90" fill="none"
                stroke={mode.color} strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress)}
                transform="rotate(-90 110 110)"
                style={{ transition: "stroke-dashoffset 0.8s ease" }}
              />
              {/* Time text */}
              <text x="110" y="100" textAnchor="middle" fill="#fff" fontSize="42" fontFamily="Sora,sans-serif" fontWeight="700">
                {minutes}:{seconds}
              </text>
              <text x="110" y="130" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="14" fontFamily="Nunito,sans-serif">
                {mode.icon} {mode.label}
              </text>
            </svg>

            {/* Controls */}
            <div className="timer-controls">
              <button className="ctrl-btn primary" onClick={() => setRunning(true)}>▶ Start</button>
              <button className="ctrl-btn" onClick={() => setRunning(false)}>⏸ Pause</button>
              <button className="ctrl-btn" onClick={() => { setRunning(false); setTime(mode.seconds); }}>↺ Reset</button>
            </div>
          </div>

          {/* ── Rooms Card ── */}
          <div className="pom-card">
            {/* Create Room */}
            <div className="pom-card-title">🏠 Create Study Room</div>
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.55)", marginBottom:16, lineHeight:1.6 }}>
              Create a room and share the code with your friends to study together.
            </p>
            <button className="room-btn" onClick={createRoom}>+ Create New Room</button>

            {createdRoom && (
              <div className="room-code-box">
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.5)", marginBottom:8, textTransform:"uppercase", letterSpacing:".08em" }}>Your Room Code</div>
                <div style={{ fontFamily:"'Sora',sans-serif", fontSize:32, fontWeight:700, color:"#fff", letterSpacing:"6px", marginBottom:12 }}>
                  {createdRoom}
                </div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.45)", marginBottom:16 }}>Share this with your friends</div>
                <button className="room-btn" onClick={() => navigate(`/room/${createdRoom}`)}>
                  Enter Room →
                </button>
              </div>
            )}

            <div className="divider" />

            {/* Join Room */}
            <div className="pom-card-title">🔗 Join Existing Room</div>
            <input
              className="room-input"
              type="text"
              placeholder="Enter Room Code (e.g. AB12CD)"
              value={roomInput}
              onChange={e => setRoomInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && joinRoom()}
            />
            <button className="room-btn" onClick={joinRoom}>Join Room →</button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Pomodoro;


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function Pomodoro() {
//   const [time, setTime] = useState(1500);
//   const [running, setRunning] = useState(false);
//   const [roomInput, setRoomInput] = useState("");
//   const [createdRoom, setCreatedRoom] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!running) return;

//     const timer = setInterval(() => {
//       setTime((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           setRunning(false);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [running]);

//   const minutes = Math.floor(time / 60);
//   const seconds = time % 60;

//   const createRoom = () => {
//     const roomId = Math.random().toString(36).substring(2, 8).toUpperCase();
//     setCreatedRoom(roomId);
//   };

//   const goToCreatedRoom = () => {
//     navigate(`/room/${createdRoom}`);
//   };

//   const joinRoom = () => {
//     if (!roomInput.trim()) {
//       alert("Enter a room code");
//       return;
//     }
//     navigate(`/room/${roomInput.toUpperCase()}`);
//   };

//   return (
//     <div className="container">
//       <div className="card">
//         <h1 style={{ textAlign: "center" }}>Pomodoro Timer</h1>

//         <div className="timer">
//           {minutes}:{seconds < 10 ? "0" : ""}
//           {seconds}
//         </div>

//         <div className="button-group">
//           <button onClick={() => setRunning(true)}>Start</button>
//           <button onClick={() => setRunning(false)}>Pause</button>
//           <button onClick={() => {
//             setRunning(false);
//             setTime(1500);
//           }}>
//             Reset
//           </button>
//         </div>

//         <hr style={{ margin: "30px 0" }} />

//         {/* CREATE ROOM SECTION */}
//         <div style={{ textAlign: "center" }}>
//           <h3>Create Pomodoro Room</h3>
//           <button onClick={createRoom}>Create Room</button>

//           {createdRoom && (
//             <div style={{ marginTop: "20px" }}>
//               <p>
//                 🎉 Room Created!
//               </p>
//               <h2 style={{ letterSpacing: "3px" }}>
//                 {createdRoom}
//               </h2>
//               <p>Share this code with your friends</p>
//               <button onClick={goToCreatedRoom}>
//                 Enter Room
//               </button>
//             </div>
//           )}
//         </div>

//         <hr style={{ margin: "30px 0" }} />

//         {/* JOIN ROOM SECTION */}
//         <div style={{ textAlign: "center" }}>
//           <h3>Join Existing Room</h3>

//           <input
//             type="text"
//             placeholder="Enter Room Code"
//             value={roomInput}
//             onChange={(e) => setRoomInput(e.target.value)}
//             style={{
//               padding: "10px",
//               borderRadius: "8px",
//               border: "1px solid #ccc",
//               marginRight: "10px"
//             }}
//           />

//           <button onClick={joinRoom}>Join Room</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Pomodoro;