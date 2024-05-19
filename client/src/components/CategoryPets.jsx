import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from './Card';

const CategoryPets = () => {
  const { category } = useParams(); // Use useParams to get the category from the URL
  const [pets, setPets] = useState([]);

  useEffect(() => {
    console.log('Fetching pets for category:', category); // Debugging line

    axios.get(`http://localhost:5000/petCategory?category=${category}`)
      .then(res => {
        console.log('Fetched Pets:', res.data); // Debugging line
        setPets(res.data);
      })
      .catch(err => console.log(err));
  }, [category]);

  const newestPets = pets.sort((a, b) => {
    const timestampA = parseInt(a._id.toString().substring(0, 8), 16);
    const timestampB = parseInt(b._id.toString().substring(0, 8), 16);
    return timestampB - timestampA;
  }).slice(0, 4);

  return (
    <div className="mt-36">
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
  );
};

export default CategoryPets;
