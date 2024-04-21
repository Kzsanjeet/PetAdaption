import React, { useEffect, useState } from 'react'
import AddPet from './AddPet'
import PetTable from './PetTable';
import axios from 'axios';
import PetList from './PetList';

const ShelterDashboard = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/getPets')
      .then(res => setPets(res.data))
      .catch(err => console.log(err));
  }, []);
  return (
    <>
    <AddPet />
    </>
  )
}

export default ShelterDashboard