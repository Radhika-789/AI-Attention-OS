import { useState } from "react";
import { addEvent } from "../api/dashboardService";

function AddEventForm({ refresh }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("club_meeting");
  const [date, setDate] = useState("");

  const handleSubmit = async () => {
    await addEvent({
      title: title,
      event_type: type,
      due_date: date,
      priority_boost: 5
    });

    refresh();
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Add Event</h2>

      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <select onChange={(e) => setType(e.target.value)}>
        <option value="club_meeting">Club Meeting</option>
        <option value="exam">Exam</option>
        <option value="assignment">Assignment</option>
      </select>

      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

export default AddEventForm;