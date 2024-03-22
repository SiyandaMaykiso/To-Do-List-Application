import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/tasks', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(response => response.json())
    .then(data => setTasks(data))
    .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  if (tasks.length === 0) {
    return (
      <div>
        No tasks found.
        <Link to="/dashboard">Back to Dashboard</Link> {/* Add this line */}
      </div>
    );
  }

  return (
    <div>
      <Link to="/dashboard">Back to Dashboard</Link> {/* Add this line */}
      {tasks.map(task => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
