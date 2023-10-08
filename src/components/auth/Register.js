// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to register a new user
      await axios.post('http://localhost:8000/api/users/register', { username, email, password });

      toast.success('Successfully registered!');
      navigate('/login');
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 400) {
        // 409 Conflict status code indicates that the username or email already exists
        toast.error('Username or email already exists. Please choose a different one.');
      } else {
        toast.error('Registration failed. Please try again.');
      }
    }
  };

      return (
    <div className="register-container5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form5">
        <label className="register-label5">Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="register-input5" />

        <label className="register-label5">Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="register-input5" />

        <label className="register-label5">Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="register-input5" />

        <button type="submit" className="register-button5">Register</button>
      </form>

      <p className="login-link5">
        Already registered? <Link to="/login" className="login-link5">Login</Link>
      </p>
    </div>
  );
};

export default Register;

  

  