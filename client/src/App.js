import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import Home from './pages/Home';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<Home />} />
      
        <Route path="/dashboard" element={<Dashboard />} />
      
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/add-task" element={<AddTaskForm />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Router>
  );
}

export default App;
