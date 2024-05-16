import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';

const ProductDetail = ({ petId }) => {
  const [pet, setPet] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getPetById/${id}`);
        if (response.status !== 200) {
          throw new Error(`Failed to fetch pet. Status: ${response.status}`);
        }
        const petData = await response.data;
        setPet(petData);
        // console.log(petData);
      } catch (error) {
        console.error('Error fetching pet:', error);
      }
    };
    
    fetchPet();
}, [id]);
  useEffect(() => {
    // console.log(pet);
  }, [pet]);
  

  if (!pet) {
    return <div>Loading...</div>;
  }

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img alt={pet.name} className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={`http://localhost:5000/${pet.image}`} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h1>Pet details</h1>
            <h2 className="text-sm title-font text-gray-500 tracking-widest">{pet.breed}</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{pet.name}</h1>

            <p className="leading-relaxed py-4">{pet.description}</p>

            <div className='border m-2'>
            <h1 >Shelter Details</h1>
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{pet.shelter.firstname} {pet.shelter.lastname}</h2>
              <h2 className="text-gray-900 text-xl title-font font-medium mb-1">{pet.shelter.sheltername}</h2>
              <h2 className="text-gray-900 text-xl title-font font-medium mb-1">Contact: {pet.shelter.phone}</h2>
              <p className="leading-relaxed py-4">{pet.shelter.email}</p>
            </div>

            
            <div className="flex py-10">
              <Link to={`/petadopt/${pet._id}`}>
              <button className="flex text-white text-xl bg-indigo-800 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Enquire About {pet.name}</button>
              </Link>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 17.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;