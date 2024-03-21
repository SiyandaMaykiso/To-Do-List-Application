const express = require('express');
const cors = require('cors'); // Make sure cors is installed (`npm install cors`)
const app = express();

// Define CORS options
const corsOptions = {
    origin: 'http://localhost:3000', // This should match the domain of your frontend application
    credentials: true, // Allowing credentials (cookies, authorization headers, etc.)
};

// Adjusted import paths based on the project structure
const authRoutes = require('./routes/authRoutes'); // Adjusted path
const taskRoutes = require('./routes/taskRoutes'); // Adjusted path

// Apply CORS with the specified options
app.use(cors(corsOptions));

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
