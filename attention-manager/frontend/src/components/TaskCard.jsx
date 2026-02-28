// frontend/src/components/TaskCard.jsx
function TaskCard({ task }) {
  const priorityConfig = {
    High:   { bg: "rgba(255,100,100,.15)", border: "rgba(255,100,100,.4)", color: "#ff6b6b", icon: "🔴" },
    Medium: { bg: "rgba(255,210,80,.15)",  border: "rgba(255,210,80,.4)",  color: "#ffd93d", icon: "🟡" },
    Low:    { bg: "rgba(100,200,120,.15)", border: "rgba(100,200,120,.4)", color: "#6bcb77", icon: "🟢" },
  };
  const typeIcons = { exam: "📝", assignment: "📚", meeting: "🤝", personal: "⭐" };
  const cfg = priorityConfig[task.priority] || priorityConfig.Low;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&family=Sora:wght@600;700&display=swap');
        .task-card {
          background: rgba(255,255,255,0.1);
          border: 1px solid ${cfg.border};
          border-radius: 14px;
          padding: 18px 20px;
          backdrop-filter: blur(10px);
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: default;
        }
        .task-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        }
      `}</style>
      <div className="task-card">
        {/* Top row */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, flex:1, minWidth:0 }}>
            <span style={{ fontSize:18, flexShrink:0 }}>{typeIcons[task.type] || "📌"}</span>
            <span style={{
              fontFamily:"'Sora',sans-serif", fontSize:14, fontWeight:700, color:"#fff",
              overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"
            }}>
              {task.title}
            </span>
          </div>
          <span style={{
            fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20, flexShrink:0, marginLeft:8,
            background: cfg.bg, border:`1px solid ${cfg.border}`, color: cfg.color, letterSpacing:".05em"
          }}>
            {cfg.icon} {task.priority}
          </span>
        </div>

        {/* Meta row */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:12, fontSize:12, color:"rgba(255,255,255,0.5)" }}>
          {task.course && (
            <span style={{ display:"flex", alignItems:"center", gap:4 }}>
              📁 {task.course}
            </span>
          )}
          {task.days_left !== undefined && (
            <span style={{ display:"flex", alignItems:"center", gap:4 }}>
              ⏰ {task.days_left} day{task.days_left !== 1 ? "s" : ""} left
            </span>
          )}
          {task.score !== undefined && (
            <span style={{ display:"flex", alignItems:"center", gap:4 }}>
              🎯 Score: {task.score}
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default TaskCard;


// function TaskCard({ task }) {
//   return (
//     <div
//       style={{
//         border: "1px solid #ccc",
//         padding: "15px",
//         margin: "10px 0",
//       }}
//     >
//       <h3>{task.title}</h3>
//       <p>Priority: {task.priority}</p>
//     </div>
//   );
// }

// export default TaskCard;