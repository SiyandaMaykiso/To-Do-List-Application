// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  // Function to fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/tasks', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (!response.ok) throw new Error('Failed to fetch tasks.');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Error fetching tasks.');
    }
  };

  // Function to update task status
  const toggleTaskCompletion = async (taskId, isComplete) => {
    try {
      const response = await fetch(`http://localhost:3001/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ iscomplete: isComplete }), // Adjusted to match the backend expectation
      });
      if (!response.ok) throw new Error('Failed to update task status.');

      fetchTasks(); // Refetch tasks to reflect the update
      toast.success('Task status updated successfully!');
    } catch (error) {
      console.error('Error updating task status:', error);
      toast.error('Failed to update task status.');
    }
  };

  const visibleTasks = tasks.filter(task => {
    if (filter === 'completed') return task.iscomplete; // Make sure this matches the data structure returned by your backend
    if (filter === 'pending') return !task.iscomplete; // Adjusted to use iscomplete in lowercase
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
          <li key={task.id} style={{ textDecoration: task.iscomplete ? 'line-through' : 'none' }}>
            {task.title} - {task.iscomplete ? 'Completed' : 'Pending'}
            <button onClick={() => toggleTaskCompletion(task.id, !task.iscomplete)}>
              Mark as {task.iscomplete ? 'Pending' : 'Completed'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
