// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db'); // Make sure the path is correct
require('dotenv').config(); // Ensure environment variables are loaded

const registerUser = async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Include the email in the INSERT statement, and exclude the password from the RETURNING clause
    const newUser = await pool.query(
      'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, hashedPassword, email]
    );
    // Return only the non-sensitive data
    res.json(newUser.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (user.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid Credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid Credentials' });
    }

    // Use the JWT_SECRET environment variable for the JWT sign method
    const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Return the token and any non-sensitive user information
    res.json({ token, user: { id: user.rows[0].id, username: user.rows[0].username, email: user.rows[0].email } });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = { registerUser, loginUser };
