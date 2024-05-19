import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

const Card = ({ pet }) => {
  const { name, breed, image, _id } = pet;

  return (
    <>
      <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full">
        <div
          className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40"
        >
          <img src={`http://localhost:5000/${image}`} alt="card-image" className='h-full w-full object-cover'/>
        </div>
        <div className="p-6">
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {name}
          </h5>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            {breed}
          </p>
        </div>
        <div className="p-6 pt-0">
          <Link to={`/detail/${_id}`}>
          <button
            className="bg-indigo-800 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
          >
            Read More
          </button>
        </Link>
        </div>
      </div>
    </>
  );
};
export default Card