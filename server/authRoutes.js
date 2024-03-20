const express = require('express');

const router = express.Router();

// Import the controller functions
const { registerUser, loginUser } = require('./controllers/authController'); // Make sure the path is correct

// Use the controller functions for the routes
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
