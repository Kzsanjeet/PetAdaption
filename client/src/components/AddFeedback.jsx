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
import './style.css'


function AddFeedback() {
  
  const [comment, setComment] = useState(null)
  const userId = localStorage.getItem("userId")

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(comment, userId);
    
    try {
      const addFeedback = await fetch(`http://localhost:5000/add-feedback/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment })
      });
      
      const result = await addFeedback.json();
      if (result.success) {
        alert("Feedback added Successfully !!");
        setComment("")
      } else {
        alert("Failed to add feedback");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred while adding feedback");
    }
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
            Leave Your Feedback
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            
              <Grid item xs={12}>
              <TextField
                    required
                    fullWidth
                    name="comment"
                    label="Your Feedback"
                    id="comment"
                    multiline
                    rows={4}
                    value={comment || ""}
                    onChange={(event)=>setComment(event.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#3730A3', '&:hover': { bgcolor: '#4608c4' } }}
            >
              Send Feedback
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
    
  );
}

export default AddFeedback;
