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
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          {pets.map((pet, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {pet.name}
              </TableCell>
              <TableCell>{pet.breed}</TableCell>
              <TableCell>{pet.description}</TableCell>
              <TableCell>
                <img src={`http://localhost:5000/${pet.image}`} alt={pet.name} style={{ width: 100, height: 100 }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PetTable;
