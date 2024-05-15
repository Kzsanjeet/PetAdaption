import React, { useEffect, useState } from 'react';
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
import { Link, useParams } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PetAdopt() {
    const [formData, setFormData] = useState({
        hadPetBefore: 'yes',
        enoughSpace: 'yes',
        petNutrition: 'yes',
        phoneNumber: '',
        address: ''
    });
    const userId = localStorage.getItem("userId");
    const petId = useParams()

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    const [shelterId, setShelterId] = useState("")

    // const handleSubmit = (event) => {
    //     event.preventDefault();

    //     axios.post(`http://localhost:5000/petAdopt/${id}`, formData)
    //         .then(response => {
    //             console.log('Success:', response.data);
    //             // Reset the form after successful submission
    //             setFormData({
    //                 hadPetBefore: 'yes',
    //                 enoughSpace: 'yes',
    //                 petNutrition: 'yes',
    //                 phoneNumber: '',
    //                 address: ''
    //             });
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    // };
    const getPetDetails = async()=>{
        try {
            const resp = await fetch(`http://localhost:5000/getPetById/${petId.id}`)
            const data =await resp.json()
            // console.log(data)
            setShelterId(data.shelter)
        } catch (error) {
            console.log("error", error)
        }
    }


    const handleSubmit = async(e) =>{
        e.preventDefault()
        console.log(userId, formData, petId.id)
        try {
            const response = await fetch(`http://localhost:5000/create-pet-request`,{
                method:"POST",
                headers:{
                    'Content-Type':"application/json"
                },
                body:JSON.stringify({
                    petId:petId.id,
                    shelterId,
                    userId,
                    data:formData
                })
            })
            const data =await response.json()
            console.log(data)
            if(data.success){
                alert("Pet request sent successfully!")
            }
        } catch (error) {
            console.log(error)
        }
    }

    console.log(shelterId)

    useEffect(()=>{
        getPetDetails()
    },[])

    return (
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
                        Pet Adoption Form
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <InputLabel id="had-pet-label">Had a pet before?</InputLabel>
                                <Select
                                    labelId="had-pet-label"
                                    id="had-pet"
                                    name="hadPetBefore"
                                    value={formData.hadPetBefore}
                                    onChange={handleChange}
                                    label="Had a pet before?"
                                    fullWidth
                                >
                                    <MenuItem value="yes">Yes</MenuItem>
                                    <MenuItem value="no">No</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel id="enough-space-label">Enough space at home for a pet?</InputLabel>
                                <Select
                                    labelId="enough-space-label"
                                    id="enough-space"
                                    name="enoughSpace"
                                    value={formData.enoughSpace}
                                    onChange={handleChange}
                                    label="Enough space at home for a pet?"
                                    fullWidth
                                >
                                    <MenuItem value="yes">Yes</MenuItem>
                                    <MenuItem value="no">No</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel id="pet-nutrition-label">Knowledge of pet nutrition?</InputLabel>
                                <Select
                                    labelId="pet-nutrition-label"
                                    id="pet-nutrition"
                                    name="petNutrition"
                                    value={formData.petNutrition}
                                    onChange={handleChange}
                                    label="Knowledge of pet nutrition?"
                                    fullWidth
                                >
                                    <MenuItem value="yes">Yes</MenuItem>
                                    <MenuItem value="no">No</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="phone-number"
                                    name="phoneNumber"
                                    label="Phone Number"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="address"
                                    name="address"
                                    label="Address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, bgcolor: '#3730A3', '&:hover': { bgcolor: '#4608c4' } }}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default PetAdopt;