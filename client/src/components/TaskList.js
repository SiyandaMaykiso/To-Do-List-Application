import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Replace 'localhost' URL with the production URL
    fetch('https://to-do-list-application-sm-79db330bd202.herokuapp.com/api/tasks', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      return response.json();
    })
    .then(data => setTasks(data))
    .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  if (tasks.length === 0) {
    return (
      <div>
        No tasks found.
        <Link to="/dashboard">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/dashboard">Back to Dashboard</Link>
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
