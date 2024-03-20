const express = require('express');
const app = express();
const authRoutes = require('./authRoutes'); // Ensure this path is correct
const taskRoutes = require('./taskRoutes'); // Import task routes

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
