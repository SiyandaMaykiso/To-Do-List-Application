const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db'); // Adjust this path as needed
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

  // Insert user into the database
  try {
    const newUser = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
    );
    res.json(newUser.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (user.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid Credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid Credentials' });
    }

    // Generate and return JWT
    const token = jwt.sign({ userId: user.rows[0].id }, 'yourSecretKey', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
