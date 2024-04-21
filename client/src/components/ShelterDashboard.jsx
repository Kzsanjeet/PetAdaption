import React, { useEffect, useState } from 'react'
import AddPet from './AddPet'
import PetTable from './PetTable';
import axios from 'axios';

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
    <PetTable pets={pets} />
    </>
  )
}

export default ShelterDashboard