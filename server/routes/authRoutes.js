const express = require('express');
const router = express.Router();

// Corrected import path to reflect the directory structure
const { registerUser, loginUser } = require('../controllers/authController');

// Routes that utilize the imported controller functions
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
