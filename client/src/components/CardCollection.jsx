import React from 'react'
import Card from './Card'
import labrador from '../assets/images/labrador.webp'
import spitz from '../assets/images/JapaneseSpitz.png'
import britishShorthair from '../assets/images/britishShorthair.jpg'
import ragdoll from '../assets/images/ragdoll.jpeg'
import { useState, useEffect } from 'react'
import axios from 'axios'

const CardCollection = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/getPets')
      .then(res =>{setPets(res.data.pets)}
   )
      
      .catch(err => console.log(err));
  }, []);

  const newestPets = pets.sort((a, b) => {
    const timestampA = parseInt(a._id.toString().substring(0, 8), 16);
    const timestampB = parseInt(b._id.toString().substring(0, 8), 16);
    return timestampB - timestampA;
  }).slice(0, 4);

  return (
    <>
      <div className="mt-36">
        <h2 className="font-bold text-4xl text-center mb-10">These Beautiful Pets Are <br /><span>Waiting For Your Love And Care</span></h2>
        <div className="flex flex-wrap justify-center gap-10">
         {newestPets.length>0? <div>{newestPets.map(pet => (
            <div key={pet._id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 flex justify-center">
              <Card pet={pet} />
            </div>
          ))}</div>:<div>No pets found.</div>} 
         
        </div>
      </div>
    </>
  );
};

export default CardCollection;
