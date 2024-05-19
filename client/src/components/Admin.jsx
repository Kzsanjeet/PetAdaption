import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { GlobalStyles } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="/">
        Pet Rescue
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Admin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(''); // Add error state
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(''); // Clear any previous errors

    axios.post('http://localhost:5000/loginAdmin', formData)
      .then(res => {
        console.log(res.data);
        if (res.data.token) {
          localStorage.setItem('token', res.data.token); // Store the token
          localStorage.setItem('userId', res.data.userId);
          const usersid = localStorage.getItem('userId');

          console.log(usersid);
          navigate('/dashboard');
        } else {
          console.log('Login failed:', res.data.message);
          setError(res.data.message || 'Invalid email or password. Please try again.');
        }
      })
      .catch(err => {
        console.error('Error:', err);
        if (err.response) {
          // Server responded with a status other than 200 range
          setError(err.response.data.message || 'Invalid email or password. Please try again.');
        } else if (err.request) {
          // Request was made but no response received
          setError('No response from server. Please try again later.');
        } else {
          // Something else happened while setting up the request
          setError('An error occurred. Please try again.');
        }
      });
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <GlobalStyles styles={{ body: { backgroundColor: 'white' } }} />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#ff6961' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Admin Sign in
            </Typography>
            {error && (
              <Typography variant="body2" color="error" align="center">
                {error}
              </Typography>
            )}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: '#3730A3', '&:hover': { bgcolor: '#5619d1' } }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
