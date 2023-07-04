import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const userData = {
      email,
      password,
    };

    axios
      .post('https://kitchen-recipe.onrender.com/api/users/login', userData)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        navigate('/foods');
        toast.success('Login successful');
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 404) {
          toast.error('User does not exist');
        } else {
          toast.error('Login failed');
        }
      });
  };

   const handleForgotPassword = () => {
    navigate('/forgot-password'); // Navigate to the reset password page
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
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
        <button onClick={handleLogin}>Login</button>
        <p className="forgot-password-link" onClick={handleForgotPassword}>
        Forgot Password?
        </p>
        <p className="register-link">
          Not yet registered? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
