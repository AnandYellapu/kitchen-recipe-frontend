import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, IconButton, InputAdornment } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff, MailOutline } from '@mui/icons-material';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`https://kitchen-recipe.onrender.com/api/auth/reset-password/${resetToken}`, {
        newPassword: newPassword,
        resetToken: resetToken
      });
      setMessage(response.data.message);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      maxWidth="xs"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Reset Password
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="New Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <MailOutline />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '16px' }}
        >
          Reset Password
        </Button>
      </form>
      <Typography variant="body1" align="center" style={{ marginTop: '16px' }}>
        {message}
      </Typography>
    </Container>
  );
};

export default ResetPassword;
