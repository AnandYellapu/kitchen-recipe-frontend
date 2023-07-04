import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleTokenChange = (event) => {
    setToken(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/users/reset-password/:token', {
        token,
        password,
      });
      setMessage(response.data.message);
      toast.success(response.data.message); // Display success toast
      navigate('/login');
    } catch (error) {
      setMessage(error.response.data.error);
      toast.error(error.response.data.error); // Display error toast
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-form'>
        <h2>Reset Password</h2>
        <input
          type="text"
          value={token}
          onChange={handleTokenChange}
          placeholder="Enter reset token"
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter new password"
        />
        <button onClick={handleResetPassword}>Submit</button>
        {message && <p>{message}</p>}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;