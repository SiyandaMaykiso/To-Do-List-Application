// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'pending'

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/tasks');
        const data = await response.json();
        setTasks(data); // Directly use the array returned from the backend
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const visibleTasks = tasks.filter(task => {
    if (filter === 'completed') return task.isComplete;
    if (filter === 'pending') return !task.isComplete;
    return true; // For 'all' filter or default case
  });

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </div>
      <ul>
        {visibleTasks.map(task => (
          <li key={task.id} style={{ textDecoration: task.isComplete ? 'line-through' : 'none' }}>
            {task.title} - {task.isComplete ? 'Completed' : 'Pending'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
