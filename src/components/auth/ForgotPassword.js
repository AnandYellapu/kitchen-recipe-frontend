// src/components/ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8000/api/users/forgot-password', { email });
      alert('Password reset email sent successfully. Check your email.');
      // Optionally, redirect to the login page or handle the response accordingly
    } catch (error) {
      console.error(error);
      alert('Failed to send password reset email. Please try again.');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <label className="forgot-password-label">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="forgot-password-input"
        />
        <button type="submit" className="forgot-password-button">
          Send Password Reset Email
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
