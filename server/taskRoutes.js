const express = require('express');
const tasksController = require('./controllers/tasksController'); // Make sure this path matches your structure
const router = express.Router();

// POST /tasks - Create a new task
router.post('/tasks', tasksController.createTask);

// GET /tasks - Get all tasks
router.get('/tasks', tasksController.getAllTasks);

// GET /tasks/:id - Get a single task by ID
router.get('/tasks/:id', tasksController.getTaskById);

// PATCH /tasks/:id - Update a task
router.patch('/tasks/:id', tasksController.updateTask);

// DELETE /tasks/:id - Delete a task
router.delete('/tasks/:id', tasksController.deleteTask);

module.exports = router;
