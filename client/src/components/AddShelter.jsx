import React, { useState } from 'react';
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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';


function AddShelter() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    shelterName: '',
    phone: '',
    address: ''
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    console.log('New phone number:', newValue);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/loginShelter', formData)
  .then(res => {
    console.log(res.data)
    if (res.data.token) {
      localStorage.setItem('token', res.data.token); // Store the token
      localStorage.setItem('userId', res.data.userId);
      const usersid = localStorage.getItem('userId')

      console.log(usersid);
      navigate('/dashboard');
    } else {
      console.log('Login failed:', res.data.message);
      navigate('/');
    }
  })
  .catch(err => console.error('Error:', err));
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   axios.post('http://localhost:5000/registerShelter', formData)
  //   .then(res => {
  //     setSuccessMessage('Shelter was added successfully');
  //     setTimeout(() => setSuccessMessage(''), 5000); // Clear message after 5 seconds
  //     setFormData({
  //       firstName: '',
  //       lastName: '',
  //       email: '',
  //       password: '',
  //       shelterName: '',
  //       phone: '',
  //       address: ''
  //     });
  //   })
  //   .catch(err => console.log(err))
  //   console.log(formData);
  //   // Add code to submit the form data to the server
  // };

  return (
    <>
      <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#ff6961' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add A Shelter Home
          </Typography>
          {successMessage && <Typography color="success">{successMessage}</Typography>}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="sheltername"
                  required
                  fullWidth
                  id="sheltername"
                  label="Name of Shelter Home"
                  value={formData.sheltername}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                name="phone"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                type= {"number"}
              />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="address"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  value={formData.mixedInput}
                  onChange={handleChange}
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#3730A3', '&:hover': { bgcolor: '#4608c4' } }}
            >
              Add Shelter
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
    
  );
}

export default AddShelter;
