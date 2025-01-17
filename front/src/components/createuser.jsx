import React, { useState } from 'react'; //importacion el hook usestate y usenavigate
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth'


//funcion create user 
const CreateUser = () => {
  const loggedInUser = Auth.getProfile();

  const [user_name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // hook useNavigate para redirigir

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (user_name && email && password) {
      try {
        const response = await fetch('http://localhost:3001/api/users/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_name, email, password, createdBy: loggedInUser.id }),
        });

        if (response.ok) {
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
      <h3>Create User</h3>
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
          Create
        </button>
      </div>
    </form>
  );
};

export default CreateUser;
