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

function AddPet() {
  const [formState, setFormState] = useState({
    name: '',
    image: '',
    breed: '',
    category:'',
    description: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const shelterId = localStorage.getItem("shelterId")

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    if (name === 'image') {
      const imageFile = event.target.files[0]; // Access the selected file
      if (imageFile) {
        setFormState((prevFormData) => ({
          ...prevFormData,
          [name]: imageFile, // Use the file object directly
        }));
      }
    } else {
      // Handle other input types as usual
      setFormState((prevFormData) => ({
        ...prevFormData,
        [name]: newValue,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Append the name, breed, and description fields from formState
    formData.append('name', formState.name);
    formData.append('breed', formState.breed);
    formData.append('category',formState.category)
    formData.append('description', formState.description);
    formData.append('image', formState.image); // Append the image file directly

    // Make the POST request
    axios.post(`http://localhost:5000/addPet/${shelterId}`, formData)
      .then(res => {
        navigate('/shelterdashboard');
        console.log("success");

        // Reset the form after successful submission
        setFormState({
          name: '',
          image: '',
          breed: '',
          category:'',
          description: ''
        });

        // Set the success message
        setSuccessMessage('Your pet has been added successfully. Add Another');
      })
      .catch(err => console.log(err));

    console.log(formData);
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
          {successMessage && <Typography variant="subtitle1" color="success">{successMessage}</Typography>}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} encType="multipart/form-data">
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
                  value={formState.name}
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
                        value={formState.breed}
                        onChange={handleChange}
                    />
              </Grid>
              <Grid item xs={12}>
                <TextField
                        required
                        fullWidth
                        id="category"
                        label="category"
                        name="category"
                        autoComplete="category"
                        value={formState.category}
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
                    value={formState.description}
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
    </>
    
  );
}

export default AddPet;