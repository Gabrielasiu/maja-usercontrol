

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email && password) {
      try {
        const response = await fetch('http://localhost:3001/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          console.log('Redirigiendo al panel de usuarios...');
          const user = await response.json();
          console.log("response LOGIN: ", user);
          Auth.login(user.token);
          // navigate('/users'); // Redirección funcional
        } else {
          alert('Invalid credentials.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert('Please fill in both fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>
      <div className="mb-3">
        <label>Email Address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Login;
