import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://kitchen-recipe.onrender.com/api/auth/forgot-password', { email });
      setMessage(response.data.message);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
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
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<MailOutlineIcon />}
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

export default ForgotPassword;
