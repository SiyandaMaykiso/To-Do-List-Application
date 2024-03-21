const express = require('express');
const tasksController = require('../controllers/tasksController'); // Ensure this path is correct
const router = express.Router();

// Adjust the paths to remove '/tasks' since it will be added when the routes are mounted in the main server file

// Create a new task
router.post('/', tasksController.createTask);

// Get all tasks
router.get('/', tasksController.getAllTasks);

// Get a single task by ID
router.get('/:id', tasksController.getTaskById);

// Update a task
router.patch('/:id', tasksController.updateTask);

// Delete a task
router.delete('/:id', tasksController.deleteTask);

module.exports = router;
