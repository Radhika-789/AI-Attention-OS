import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import OverloadAlert from "../components/OverloadAlert";
import { getPriorities } from "../api/dashboardService";

function Dashboard() {
  const [backendTasks, setBackendTasks] = useState([]);
  const [manualTasks, setManualTasks] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
const [contract, setContract] = useState("");
const [mission, setMission] = useState("");
const [streakData, setStreakData] = useState({});
  const [newTask, setNewTask] = useState({
    title: "",
    type: "assignment",
    days_left: "",
  });

  // Fetch backend data
  useEffect(() => {
    getPriorities()
      .then((data) => {
        setAnalysis(data.dashboard_priorities);
        setBackendTasks(
          data.dashboard_priorities?.today_priority_list || []
        );
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
  const savedContract = localStorage.getItem("contract");
  const savedMission = localStorage.getItem("mission");
  const savedStreak = localStorage.getItem("streakData");

  if (savedContract) setContract(savedContract);
  if (savedMission) setMission(savedMission);
  if (savedStreak) setStreakData(JSON.parse(savedStreak));
}, []);

useEffect(() => {
  localStorage.setItem("contract", contract);
}, [contract]);

useEffect(() => {
  localStorage.setItem("mission", mission);
}, [mission]);

useEffect(() => {
  localStorage.setItem("streakData", JSON.stringify(streakData));
}, [streakData]);

const toggleToday = () => {
  const today = new Date().toISOString().split("T")[0];

  setStreakData((prev) => ({
    ...prev,
    [today]: !prev[today]
  }));
};

const getCurrentMonthDays = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = new Date(year, month, i + 1);
    return day.toISOString().split("T")[0];
  });
};

  // Convert score → label
  const getPriorityLabel = (score) => {
    if (score >= 25) return "High";
    if (score >= 15) return "Medium";
    return "Low";
  };

  // Manual scoring
  const calculatePriority = (task) => {
    let score = 0;

    if (task.type === "exam") score += 20;
    if (task.type === "assignment") score += 15;
    if (task.type === "meeting") score += 10;
    if (task.type === "personal") score += 5;

    score += Math.max(0, 10 - task.days_left) * 2;

    return score;
  };

  const handleAddTask = () => {
    if (!newTask.title || newTask.days_left === "") return;

    const score = calculatePriority(newTask);

    const formattedTask = {
      ...newTask,
      id: Date.now(),
      course: "Personal",
      score,
    };

    setManualTasks([...manualTasks, formattedTask]);

    setNewTask({
      title: "",
      type: "assignment",
      days_left: "",
    });

    setShowForm(false);
  };

  const allTasks = [...backendTasks, ...manualTasks].sort(
    (a, b) => (b.score || 0) - (a.score || 0)
  );

  if (loading)
    return (
      <div style={{ padding: "40px", color: "white" }}>
        Loading...
      </div>
    );

return (
  <div
    style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a, #1e293b)",
      padding: "40px",
      color: "white",
      fontFamily: "Inter, sans-serif",
    }}
  >
    <h1 style={{ fontSize: "42px", fontWeight: "700" }}>
      📊 Attention Dashboard
    </h1>

    {analysis && (
      <OverloadAlert workloadLevel={analysis.workload_level} />
    )}

    <button
      onClick={() => setShowForm(true)}
      style={{
        marginTop: "20px",
        marginBottom: "30px",
        padding: "12px 24px",
        borderRadius: "10px",
        background: "#3b82f6",
        border: "none",
        color: "white",
        fontWeight: "600",
        cursor: "pointer",
      }}
    >
      + Add Personal Task
    </button>

    {showForm && (
      <div
        style={{
          background: "#1e293b",
          padding: "25px",
          marginBottom: "30px",
          borderRadius: "16px",
          boxShadow: "0px 10px 25px rgba(0,0,0,0.3)",
        }}
      >
        <input
          type="text"
          placeholder="Task title"
          value={newTask.title}
          onChange={(e) =>
            setNewTask({ ...newTask, title: e.target.value })
          }
          style={{
            padding: "10px",
            marginRight: "10px",
            borderRadius: "8px",
            border: "none",
          }}
        />

        <select
          value={newTask.type}
          onChange={(e) =>
            setNewTask({ ...newTask, type: e.target.value })
          }
          style={{
            padding: "10px",
            marginRight: "10px",
            borderRadius: "8px",
            border: "none",
          }}
        >
          <option value="assignment">Assignment</option>
          <option value="exam">Exam</option>
          <option value="meeting">Meeting</option>
          <option value="personal">Personal</option>
        </select>

        <input
          type="number"
          placeholder="Days Left"
          value={newTask.days_left}
          onChange={(e) =>
            setNewTask({
              ...newTask,
              days_left: Number(e.target.value),
            })
          }
          style={{
            padding: "10px",
            marginRight: "10px",
            borderRadius: "8px",
            border: "none",
            width: "120px",
          }}
        />

        <button
          onClick={handleAddTask}
          style={{
            padding: "10px 18px",
            marginRight: "10px",
            borderRadius: "8px",
            border: "none",
            background: "#10b981",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Save
        </button>

        <button
          onClick={() => setShowForm(false)}
          style={{
            padding: "10px 18px",
            borderRadius: "8px",
            border: "none",
            background: "#ef4444",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    )}

    {/* TASK GRID */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "20px",
      }}
    >
      {allTasks.map((task) => (
        <div
          key={task.id}
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "16px",
            boxShadow: "0px 8px 20px rgba(0,0,0,0.4)",
          }}
        >
          <TaskCard
            task={{
              ...task,
              priority: getPriorityLabel(task.score),
            }}
          />
        </div>
      ))}
    </div>

    {/* ================= CONTRACT + MISSION + STREAK ================= */}

    <div style={{ marginTop: "70px" }}>
      <h2 style={{ fontSize: "30px", marginBottom: "20px" }}>
        📝 Focus Contract
      </h2>

      <textarea
        value={contract}
        onChange={(e) => setContract(e.target.value)}
        placeholder="I commit to studying 3 focused hours daily..."
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "12px",
          border: "none",
          marginBottom: "30px",
          background: "#1e293b",
          color: "white",
          minHeight: "100px",
        }}
      />

      <h2 style={{ fontSize: "30px", marginBottom: "20px" }}>
        🎯 My Mission
      </h2>

      <textarea
        value={mission}
        onChange={(e) => setMission(e.target.value)}
        placeholder="Why are you building focus? Who are you becoming?"
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "12px",
          border: "none",
          marginBottom: "30px",
          background: "#1e293b",
          color: "white",
          minHeight: "100px",
        }}
      />

      <h2 style={{ fontSize: "30px", marginBottom: "20px" }}>
        🔥 Monthly Streak
      </h2>

      <button
        onClick={toggleToday}
        style={{
          marginBottom: "20px",
          padding: "10px 18px",
          borderRadius: "8px",
          border: "none",
          background: "#3b82f6",
          color: "white",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Mark Today Done
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "8px",
        }}
      >
        {getCurrentMonthDays().map((date) => (
          <div
            key={date}
            style={{
              height: "40px",
              borderRadius: "6px",
              background: streakData[date] ? "#10b981" : "#ef4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            {new Date(date).getDate()}
          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default Dashboard;
