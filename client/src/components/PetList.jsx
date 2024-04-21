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

function PetList() {
    const [pets, setPets] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null);
    const [editedPet, setEditedPet] = useState({
        name: '',
        breed: '',
        description: ''
    });
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/getPets')
            .then(res => setPets(res.data))
            .catch(err => console.log(err));
    }, []);

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
    
            console.log('Updated pets:', updatedPets);
            console.log('Edited pet:', editedPet);
    
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
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                                <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">#</th>
                                        <th scope="col" className="px-6 py-4">Name</th>
                                        <th scope="col" className="px-6 py-4">Breed</th>
                                        <th scope="col" className="px-6 py-4">Description</th>
                                        <th scope="col" className="px-6 py-4">Image</th>
                                        <th scope="col" className="px-6 py-4">Actions</th> {/* Added Actions column */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {pets.map((pet, index) => (
                                        <tr key={index} className="border-b border-neutral-200 dark:border-white/10">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{pet.name}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{pet.breed}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{pet.description}</td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <img src={`http://localhost:5000/${pet.image}`} alt={pet.name} style={{ width: 100, height: 100 }} />
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <IconButton onClick={() => handleEdit(pet)} aria-label="edit">
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleDelete(pet._id)} aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Your edit modal */}
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
