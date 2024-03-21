// src/components/TaskList.js
import React, { useState, useEffect } from 'react';

const TasksList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Replace 'baseURL' with your actual backend URL
    fetch('http://localhost:3001/api/tasks', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
      },
    })
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TasksList;
