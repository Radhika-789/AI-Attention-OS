function PriorityCard({ task }) {
  return (
    <div
      style={{
        background: "#f3f3f3",
        padding: "15px",
        marginTop: "10px",
        borderRadius: "8px"
      }}
    >
      <h3>{task.title}</h3>
      <p>Type: {task.type}</p>
      <p>Days Left: {task.days_left}</p>
      <p>Score: {task.score}</p>
    </div>
  );
}

export default PriorityCard;