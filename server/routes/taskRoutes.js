const express = require('express');
const tasksController = require('../controllers/tasksController');
const router = express.Router();

router.post('/', tasksController.createTask);

router.get('/', tasksController.getAllTasks);

router.get('/:id', tasksController.getTaskById);

router.patch('/:id', tasksController.updateTask);

router.delete('/:id', tasksController.deleteTask);

module.exports = router;
