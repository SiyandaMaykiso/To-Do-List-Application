const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Import authRoutes
const authRoutes = require('./authRoutes'); // Adjust the path as necessary

// Use authRoutes with '/api/auth' as base path
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
