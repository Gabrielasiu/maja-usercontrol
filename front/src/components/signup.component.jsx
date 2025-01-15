
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [user_name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // hook useNavigate para redirigir

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (user_name && email && password) {
      try {
        const response = await fetch('http://localhost:3001/api/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_name, email, password }),
        });
// console.log('Response status:', response.status);
// const data = await response.json();
//       console.log('Response data:', data);
        
        if (response.ok) {
          // Si el registro es exitoso, redirige al panel de usuarios
          navigate('/users');
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
        Already registered? <a href="/sign-in">Sign in</a>
      </p>
    </form>
  );
};

export default SignUp;
