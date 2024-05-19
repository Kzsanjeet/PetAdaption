import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FilterPets.css'; // Import your CSS file for styling
import Card from './Card'; // Import the Card component

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
    <div className="mb-16">
      <form className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4 bg-gray-100 rounded-md shadow-md" onSubmit={(e) => { e.preventDefault(); applyFilters(); }}>
        <div className="flex items-center gap-4">
          <label className="block text-gray-700">
            Category:
          </label>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="block p-2 border rounded-md shadow-sm"
          >
            <option value="">Select Category</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 transition"
        >
          Apply Filters
        </button>
      </form>
      <div className="flex flex-wrap justify-center gap-10 mt-10">
        {filteredPets.length > 0 ? (
          filteredPets.map(pet => (
            <div key={pet._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 flex justify-center">
              <Card pet={pet} />
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