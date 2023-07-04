import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    const userData = {
      email,
      password,
    };

    axios
      .post('http://localhost:8000/api/users/register', userData)
      .then((response) => {
        console.log(response.data);
        navigate('/login');
        toast.success('Registration successful');
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 409) {
          toast.error('Email already exists');
        } else {
          toast.error('Registration failed');
        }
      });
  };

  return (
    <div className='auth-container'>
      <div className='auth-form'>
        <h2>Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={handleRegister}>Register</button>
        <p className="register-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;