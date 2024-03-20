const express = require('express');
const app = express();
const authRoutes = require('./authRoutes'); // Adjust the path as needed

app.use(express.json()); // Middleware for parsing JSON bodies

app.use('/api/auth', authRoutes); // Mount auth routes

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
