// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS

import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import Home from './pages/Home'; // Assuming Home includes your login and registration forms
import Dashboard from './components/Dashboard'; // Import the Dashboard component here
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Home component for the root route */}
        <Route path="/" element={<Home />} />
        {/* Add a route for the Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Keep the existing routes for tasks and adding tasks */}
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/add-task" element={<AddTaskForm />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Router>
  );
}

export default App;
