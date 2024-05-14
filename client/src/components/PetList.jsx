import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import { useParams } from 'react-router-dom';

function PetList() {
    const [pets, setPets] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null);
    const [editedPet, setEditedPet] = useState({
        name: '',
        breed: '',
        description: ''
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const id = localStorage.getItem("userId")
    // console.log(id)

    useEffect(() => {
      // console.log("Fetching pets for ID:", id);
      axios.get(`http://localhost:5000/specific-shelter-pet/${id}`)
          .then(res => {
              // console.log("Received pets data:", res.data);
              setPets(res.data.pets);
              // console.log(pets)
          })
          .catch(err => console.log(err));
  }, [id]);
    // console.log(pets)
    useEffect(() => {
      console.log("Pets length:", pets.length);
  }, [pets]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/deletePet/${id}`);
            setPets(pets.filter(pet => pet._id !== id)); // Update local state to remove the deleted pet
        } catch (error) {
            console.error('Failed to delete pet:', error);
        }
    };

    const handleEdit = (pet) => {
        setSelectedPet(pet);
        setEditedPet({
            name: pet.name,
            breed: pet.breed,
            description: pet.description
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedPet = {
                name: editedPet.name,
                breed: editedPet.breed,
                description: editedPet.description,
                image: selectedImage, // Assuming this is a file object
            };
    
            await axios.put(`http://localhost:5000/editPet/${selectedPet._id}`, updatedPet);
    
            const updatedPets = pets.map(pet => {
                if (pet._id === selectedPet._id) {
                    return { ...pet, ...editedPet }; // Merge the existing pet with the edited fields
                }
                return pet;
            });
    
            // console.log('Updated pets:', updatedPets);
            // console.log('Edited pet:', editedPet);
    
            setPets(updatedPets);
            setSelectedPet(null); // Close the edit modal
        } catch (error) {
            console.error('Failed to edit pet:', error);
        }
    };
    
    
    
    
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedPet({
            ...editedPet,
            [name]: value
        });
    };

    return (
        <>
          <div className="flex justify-center">
            <div className="w-full lg:w-3/4 p-4 lg:pl-36">
              {pets && pets.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
                  {pets.map((pet, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <img
                        src={`http://localhost:5000/${pet.image}`}
                        alt={pet.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{pet.name}</h3>
                        <p className="text-gray-500">{pet.breed}</p>
                        <p className="mt-2 text-sm">{pet.description}</p>
                        <div className="mt-4 flex justify-end">
                          <IconButton onClick={() => handleEdit(pet)} aria-label="edit">
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(pet._id)} aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center">No pets available</div>
              )}
            </div>
          </div>



            {selectedPet && (
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
                      Edit Your Pet
                    </Typography>
                    {/* {successMessage && <Typography variant="subtitle1" color="success">{successMessage}</Typography>} */}
                    <Box component="form" noValidate onSubmit={handleEditSubmit} sx={{ mt: 3 }} encType="multipart/form-data">
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
                            value={editedPet.name}
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
                            onChange={(e) => setSelectedImage(e.target.files[0])}
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
                            value={editedPet.breed}
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
                            value={editedPet.description}
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
                        Update Pet
                      </Button>
                    </Box>
                  </Box>
                </Container>
              </ThemeProvider>
              
            )}
        </>
    );
}

export default PetList;
