import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is installed and imported

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message on new submission
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        username,
        password,
      }, {
        withCredentials: true // Only if your backend setup requires, for handling cookies if using sessions
      });

      // Assuming your backend response includes a token and possibly user details
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Store the token for future requests
        navigate('/dashboard'); // Adjust as needed based on your routing
        console.log('Login successful:', response.data.message);
      } else {
        setErrorMessage('Login failed: No token returned.');
      }
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.message : 'Error logging in');
      console.error('Login error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h2>Login</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} style={{ width: '300px' }}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
