import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FilterPets.css'; // Import your CSS file for styling

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
        setPets(response.data.pets);
        setFilteredPets(response.data.pets); // Initialize filteredPets with all pets
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
    <div className="filter-pets-container">
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
        <div className='Categories'>
        <label className='categoryHead' >
          Category:
          </label>
          <select  name="category" value={filters.category} onChange={handleFilterChange}>
            <option value="">Select Category</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            {/* Add more options as needed */}
          </select>
       
        {/* Add more filter inputs here */}
        <button type="submit">Apply Filters</button>
        </div>
       
      </form>
      <div className="pets-grid">
        {filteredPets.length > 0 ? (
          filteredPets.map(pet => (
            <div key={pet._id} className="pet-card">
              <h2>{pet.name}</h2>
              <img src={`http://localhost:5000/${pet.image}`} alt={pet.name} />
              <p>{pet.breed}</p>
              <p>{pet.category}</p>
              <p>{pet.description}</p>
            </div>
          ))
        ) : (
          <div>No pets</div>
        )}
      </div>
    </div>
  );
};

export default FilterPets;
