import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilterPets = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [filters, setFilters] = useState({
    breed: '',
    category: ''
    // Add more filter options as needed
  });

  useEffect(() => {
    // Fetch pets from backend
    axios.get('http://localhost:5000/getPets')
      .then(response => {
        setPets(response.data);
        setFilteredPets(response.data); // Initialize filteredPets with all pets
      })
      .catch(error => {
        console.error('Error fetching pets:', error);
      });
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let filtered = pets;
    // Apply filters
    if (filters.breed) {
      filtered = filtered.filter(pet => pet.breed === filters.breed);
    }
    if (filters.category) {
      filtered = filtered.filter(pet => pet.category === filters.category);
    }
    // Add more filters as needed

    setFilteredPets(filtered);
  };

  return (
    <div>
      <h1>Filter Pets</h1>
      <form onSubmit={(e) => { e.preventDefault(); applyFilters(); }}>
        <label>
          Breed:
          <input
            type="text"
            name="breed"
            value={filters.breed}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          />
        </label>
        {/* Add more filter inputs here */}
        <button type="submit">Apply Filters</button>
      </form>
      <ul>
        {filteredPets.length>0 ? (filteredPets.map(pet => (
          <li key={pet._id}>
            <h2>{pet.name}</h2>
            <img src={pet.image} alt={pet.name} />
            <p>{pet.breed}</p>
            <p>{pet.category}</p>
            <p>{pet.description}</p>
          </li>
        ))):<div>No pets</div>}
        
        
      </ul>
    </div>
  );
};

export default FilterPets;