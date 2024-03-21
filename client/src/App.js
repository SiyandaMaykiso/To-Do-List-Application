// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import Home from './pages/Home'; // Import Home instead of LoginPage and RegistrationPage
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Use Home component for the root route */}
        <Route path="/" element={<Home />} />
        {/* Other routes */}
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/add-task" element={<AddTaskForm />} />
      </Routes>
    </Router>
  );
}

export default App;
