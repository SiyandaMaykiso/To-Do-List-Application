const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Enhanced CORS options to handle both development and production environments
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? 'https://to-do-list-application-sm-79db330bd202.herokuapp.com' : 'http://localhost:3000',
    credentials: true,
};

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use(cors(corsOptions)); // Setup CORS with the specified options
app.use(express.json()); // Middleware to parse JSON

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client', 'build')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

// Start the server on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
