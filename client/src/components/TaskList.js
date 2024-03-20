// src/components/TaskList.js
import React, { useState, useEffect } from 'react';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Assume fetchTasks is a function that fetches tasks from your server
    fetchTasks().then(data => setTasks(data));
  }, []); // The empty array ensures this effect runs once after the initial render

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  );
}

export default TaskList;