const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
