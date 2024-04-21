import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function PetTable({ pets }) {
  return (
    <>



    <div className="flex justify-center">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
          <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
            <tr>
              <th scope="col" className="px-6 py-4">#</th>
              <th scope="col" className="px-6 py-4">Name</th>
              <th scope="col" className="px-6 py-4">Breed</th>
              <th scope="col" className="px-6 py-4">Description</th>
              <th scope="col" className="px-6 py-4">Image</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet, index) => (
              <tr key={index} className="border-b border-neutral-200 dark:border-white/10">
                <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                <td className="whitespace-nowrap px-6 py-4">{pet.name}</td>
                <td className="whitespace-nowrap px-6 py-4">{pet.breed}</td>
                <td className="whitespace-nowrap px-6 py-4">{pet.description}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <img src={`http://localhost:5000/${pet.image}`} alt={pet.name} style={{ width: 100, height: 100 }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>


    </>
  );
}

export default PetTable;
