const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/', authenticateToken, tasksController.createTask);
router.get('/', authenticateToken, tasksController.getAllTasks);
router.get('/:id', authenticateToken, tasksController.getTaskById);
router.patch('/:id', authenticateToken, tasksController.updateTask);
router.delete('/:id', authenticateToken, tasksController.deleteTask);

module.exports = router;
