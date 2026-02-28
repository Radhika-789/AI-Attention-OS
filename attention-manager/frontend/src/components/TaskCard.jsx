function TaskCard({ task }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        margin: "10px 0",
      }}
    >
      <h3>{task.title}</h3>
      <p>Priority: {task.priority}</p>
    </div>
  );
}

export default TaskCard;