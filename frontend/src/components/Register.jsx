// UserRegister.js
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/user/register', { username, password });

      if (response.data.success) {
        alert('User registered successfully');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error during user registration:', error.message);
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
