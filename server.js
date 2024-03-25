const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use(cors(corsOptions));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
