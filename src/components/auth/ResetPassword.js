// src/components/ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to reset the password
      const response = await axios.post(`http://localhost:8000/api/users/reset-password/${resetToken}`, { newPassword });

      // Display success notification
      toast.success(response.data.message);

      // Redirect to the login page or handle the response accordingly
      navigate('/login');
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
  
      toast.error('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit} className="reset-password-form">
        <label className="reset-password-label">New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="reset-password-input"
        />
        <button type="submit" className="reset-password-button">
          Reset Password
        </button>
      </form>
      <p>
        <Link to="/login" className="reset-password-link">
          Back to Login
        </Link>
      </p>
    </div>
  );
};

export default ResetPassword;
