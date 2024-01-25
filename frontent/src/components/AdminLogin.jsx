// UserLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/user/login', { username, password });

      if (response.data.success) {
        alert('Login successful');
        navigate('/dashboard'); // Redirect to the dashboard or any other page on successful login
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during user login:', error.message);
    }
  };

  return (
    <div>
      <h2>User Login</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AdminLogin;
