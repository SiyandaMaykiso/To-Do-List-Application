// src/components/AddTaskForm.js
import React, { useState } from 'react';

const AddTaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Task data to be sent
    const taskData = {
      title,
      description,
    };

    try {
      // Send a POST request to the backend
      const response = await fetch('http://localhost:3001/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Assuming the JWT token is stored in localStorage; adjust as necessary for your auth setup
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Task created successfully:', data);
      
      // Optionally: Clear the form fields
      setTitle('');
      setDescription('');

      // Optionally: Refresh the list of tasks or provide feedback to the user
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
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
  );
};

export default AddTaskForm;