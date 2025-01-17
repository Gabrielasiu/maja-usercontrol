
import React, { useState } from 'react';
import Auth from '../utils/auth'
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [user_name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (user_name && email && password) {
      try {
        const response = await fetch('http://localhost:3001/api/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_name, email, password }),
        });

        if (response.ok) {
          console.log('Redirigiendo al panel de usuarios...');
          const resp = await response.json();
          console.log("response SIGN UP: ", resp);
          Auth.login(resp.token);
        } else {
          alert('Failed to sign up. Please try again.');
        }
      } catch (error) {
        console.error('Error during sign up:', error);
      }
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <div className="mb-3">
        <label>User Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter username"
          value={user_name}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>

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
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered? <Link to="/sign-in">Sign in</Link>
      </p>
    </form>
  );
};

export default SignUp;
