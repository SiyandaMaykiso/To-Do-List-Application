// src/components/AddTaskForm.js
import React, { useState } from 'react';

function AddTaskForm({ onAdd }) {
  const [taskTitle, setTaskTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(taskTitle);
    setTaskTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Add a new task"
        required
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default AddTaskForm;
