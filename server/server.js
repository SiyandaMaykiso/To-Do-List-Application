const express = require('express');
const cors = require('cors'); // Import cors package
const app = express();

// Adjusted import paths based on the project structure
const authRoutes = require('./routes/authRoutes'); // Adjusted path
const taskRoutes = require('./routes/taskRoutes'); // Adjusted path

app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Middleware for parsing JSON bodies

// Mount auth routes
app.use('/api/auth', authRoutes);

// Mount task routes
app.use('/api/tasks', taskRoutes); // Use '/api/tasks' as the base route for task operations

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
