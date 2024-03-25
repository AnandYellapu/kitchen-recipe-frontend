import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, IconButton, InputAdornment, Link } from '@mui/material';
import { AccountCircle, Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    showPassword: false
  });

  const handleChange = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://kitchen-recipe.onrender.com/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      console.log(response.data);
      navigate('/login')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Username"
              variant="outlined"
              value={formData.username}
              onChange={handleChange('username')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Email"
              variant="outlined"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Password"
              variant="outlined"
              type={formData.showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange('password')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {formData.showPassword ? <VisibilityOff /> : <Visibility />}
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
          Register
        </Button>
      </form>
      <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
        Already registered? <Link href="/login">Login</Link>
      </Typography>
    </Container>
  );
};

export default Register;
