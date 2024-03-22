// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'pending'

  useEffect(() => {
    // Placeholder for fetching tasks from your backend
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://your-backend-api/tasks');
        const data = await response.json();
        setTasks(data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const visibleTasks = tasks.filter(task => {
    if (filter === 'completed') return task.isComplete;
    if (filter === 'pending') return !task.isComplete;
    return true;
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
