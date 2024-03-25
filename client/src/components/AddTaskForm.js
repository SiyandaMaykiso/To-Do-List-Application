import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AddTaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = { title, description };

    try {
      const response = await fetch('http://localhost:3001/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) throw new Error('Failed to create task.');

      const data = await response.json();
      console.log('Task created successfully:', data);

      setTitle(''); // Clear the form fields
      setDescription('');

      toast.success('Task added successfully!');
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Error adding task.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        
        <button type="submit">Add Task</button>
      </form>
      <div style={{ marginTop: '20px' }}>
        <Link to="/dashboard">Back to Dashboard</Link> {/* Navigation link back to Dashboard */}
      </div>
    </>
  );
};

export default AddTaskForm;
