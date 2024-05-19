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



  const fetchPets = async () => {
    console.log("Hello")
    try {
        const response = await fetch('http://localhost:5000/getPets');
        const petsData = await response.json();
        const acceptedPets = petsData.pets.filter(pet => pet.status !== 'booked');
        setPets(acceptedPets);
    } catch (error) {
        console.error('Error fetching pets:', error);
    }
};

  useEffect(() => {
    fetchPets();
  }, []);


  const newestPets = pets.sort((a, b) => {
    const timestampA = parseInt(a._id.toString().substring(0, 8), 16);
    const timestampB = parseInt(b._id.toString().substring(0, 8), 16);
    return timestampB - timestampA;
  }).slice(0, 8);

  return (
    <>
      <div className="mt-36">
        <h2 className="font-bold text-4xl text-center mb-10">These Beautiful Pets Are <br /><span>Waiting For Your Love And Care</span></h2>
        <div className="flex flex-wrap justify-center gap-10">
        {newestPets.length > 0 ? (
          newestPets.map(pet => (
            <div key={pet._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 flex justify-center">
              <Card pet={pet} />
            </div>
          ))
        ) : (
          <div>No pets found.</div>
        )}
         
        </div>
      </div>
    </>
  );
};

export default CardCollection;
