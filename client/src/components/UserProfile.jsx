import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./userprofile.css"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const UserProfile = () => {
    const [shelterData, setShelterData] = useState(null);
    const [selectedShelter, setSelectedShelter] = useState(null);
    const [editedShelter, setEditedShelter] = useState({
        sheltername: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        const fetchShelterData = async () => {
            try {
                const userId = localStorage.getItem("shelterId");
                const response = await fetch(`http://localhost:5000/shelterData/${userId}`);
                const data = await response.json();
                console.log(data.shelterProfile);
                setShelterData(data.shelterProfile[0]);
            } catch (error) {
                console.log(error);
            }
        };

        fetchShelterData();
        
    }, []);

    const handleEdit = () => {
        setSelectedShelter(true);
        setEditedShelter({
            sheltername: "",
            phone: "",
            address:"",
            password: '',
            confirmPassword: ''
        });
    };

    const shelterId = localStorage.getItem("shelterId")
    const handleEditSubmit = async(e) => {
        e.preventDefault();
        
        if(editedShelter.password === editedShelter.confirmPassword){
            // console.log('Form submitted:', editedShelter);
            try {
                const updateShelter = await fetch(`http://localhost:5000/edit-shelter-profile/${shelterId}`,{
                    method:"PATCH",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body:JSON.stringify(editedShelter)
                })

                const data  = await updateShelter.json()

                // console.log(updateShelter)
                if(data.success){
                    alert("Profile updated successfull.")
                    setEditedShelter("")
                }else{
                    alert("Unable to update profile.")
                }
            } catch (error) {
                console.log("error on updating profile shelter: ",error)
            }

        }
        // Handle form submission here
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedShelter(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleClose = () => {
        setSelectedShelter(false);
    };

    if (!shelterData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="bg-gray-100 w-full lg:w-3/4 p-2 lg:ml-80">
                <div className="container mx-auto py-2">
                    <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                        <div className="col-span-4 sm:col-span-3">
                            <div className="bg-white shadow rounded-lg p-6">
                                <hr className="my-6 border-t border-gray-300" />
                                <div className="flex flex-col">
                                    <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Shelter name: </span>
                                    <span className="mb-8">{shelterData.sheltername}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Address: </span>
                                    <span className="mb-8">{shelterData.address}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Phone: </span>
                                    <span className="mb-8">{shelterData.phone}</span>
                                </div>
                                <button className='edit-profile' onClick={handleEdit}>Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {selectedShelter && (
                <ThemeProvider theme={createTheme()} className="absolute m-10">
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
                                {/* You can use an appropriate icon */}
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Edit Shelter
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleEditSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="sheltername"
                                            required
                                            fullWidth
                                            id="sheltername"
                                            label="Shelter Name"
                                            autoFocus
                                            value={editedShelter.sheltername}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="phone"
                                            label="Phone"
                                            name="phone"
                                            autoComplete="phone"
                                            value={editedShelter.phone}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="address"
                                            label="Address"
                                            id="address"
                                            multiline
                                            rows={4}
                                            value={editedShelter.address}
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
                                            value={editedShelter.password}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            type="password"
                                            id="confirmPassword"
                                            value={editedShelter.confirmPassword}
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
                                    Update Shelter
                                </Button>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleClose}
                                    sx={{ mt: 1 }}
                                >
                                    Close
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            )}
        </>
    );
};

export default UserProfile;
