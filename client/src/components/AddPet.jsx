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
import { useNavigate } from 'react-router-dom';
import Test from './Test';

function AddPet() {
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    breed: '',
    description: ''
  });
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
  
    if (name === 'image') {
      const imageFile = event.target.files[0]; // Access the selected file
      if (imageFile) {
        formData.append('image', imageFile); // Append the image to formData
      }
    } else {
      // Handle other input types as usual
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: newValue,
      }));
    }
  };
  
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', formData.name);
    formData.append('breed', formData.breed);
    formData.append('description', formData.description);
  
    // Access the file input element correctly
    const fileInput = event.target.querySelector('input[type="file"]');
    if (fileInput && fileInput.files.length > 0) {
      formData.append('image', fileInput.files[0]);
    }
  
    axios.post('http://localhost:5000/addPet', formData)
      .then(res => {
        navigate('/shelterdashboard');
        console.log("success")
      })
      .catch(err => console.log(err))
    console.log(formData);
    console.log("failed")
  };
  

  return (
    <>
      <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
           Add Your Pet
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                Add Image
                <TextField
                    required
                    fullWidth
                    id="image"
                    type="file"
                    label=""
                    name="image"
                    onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                        required
                        fullWidth
                        id="breed"
                        label="Breed"
                        name="breed"
                        autoComplete="breed"
                        value={formData.breed}
                        onChange={handleChange}
                    />
              </Grid>
              <Grid item xs={12}>
              <TextField
                    required
                    fullWidth
                    name="description"
                    label="Description"
                    id="description"
                    multiline
                    rows={4}
                    value={formData.description}
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
              Add Pet
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    <Test />
    </>
    
  );
}

export default AddPet;