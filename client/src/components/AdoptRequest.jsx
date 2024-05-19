import React, { useEffect, useState } from 'react';
import './adoptreq.css';

const AdoptRequest = () => {
  const [reqlist, setReqlist] = useState([]);
  const shelterId = localStorage.getItem('shelterId');

  const showPetReqs = async () => {
    try {
      const response = await fetch(`http://localhost:5000/show-pet-request/${shelterId}`);
      const data = await response.json();
      setReqlist(data.showPet);
      console.log(data.showPet)
    } catch (error) {
      console.log("Error fetching pet requests:", error);
    }
  };

  const handleAccept = async (requestId, petId) => {
    try {
      const acceptReq = await fetch(`http://localhost:5000/accept-pet-request/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ petId })
      });

      if (acceptReq.ok) {
        const data = await acceptReq.json();
        if (data.success) {
          window.location.reload()
          setReqlist(prevReqlist =>
            prevReqlist.map(pet =>
              pet._id === requestId ? { ...pet, data: { ...pet.data, status: 'Accepted' } } : pet
            )
          );
          
        }
      } else {
        console.error('Failed to accept pet request:', acceptReq.status);
      }
    } catch (error) {
      console.error('Error while accepting pet request:', error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      const rejectReq = await fetch(`http://localhost:5000/reject-pet-request/${requestId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (rejectReq.ok) {
        const data = await rejectReq.json();
        if (data.success) {
          setReqlist(prevReqlist => prevReqlist.filter(pet => pet._id !== requestId));
        }
      } else {
        console.error('Failed to reject pet request:', rejectReq.status);
      }
    } catch (error) {
      console.error('Error while rejecting pet request:', error);
    }
  };

  useEffect(() => {
    showPetReqs();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="w-full lg:w-2/3 p-4 lg:pl-36">
        {reqlist.length > 0 ? (
          <div className="flex flex-col gap-4">
            {reqlist.map((pet, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-1/2 p-4">
                  <img
                    src={`http://localhost:5000/${pet.petId.image}`}
                    alt={pet.petId.name}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">{pet.petId.name}</h3>
                    <p className="text-gray-500">{pet.petId.breed}</p>
                    <p className="mt-2 text-sm">{pet.petId.description}</p>
                  </div>
                  {pet.status === 'Pending' ? (
                    
                    <div>
                    <button className="approve" onClick={() => handleAccept(pet._id, pet.petId._id)}>Approve</button>
                    <button className="remove" onClick={() => handleReject(pet._id)}>Deny</button>
                  </div>
                  ) : (
                    <div><button className="approve">{pet.status}</button></div>
                  )}
                </div>
                <div className="w-full lg:w-1/2 p-4 bg-gray-100 rounded-lg shadow-inner">
                  <h1 className="font-bold text-lg mb-2">Sender details:</h1>
                  <p><strong>Full name:</strong> {pet.userId?.firstname} {pet.userId?.lastname}</p>
                  <p><strong>Email:</strong> {pet.userId?.email}</p>
                  <p><strong>Address:</strong> {pet.data.address}</p>
                  <p><strong>Enough Space?</strong> {pet.data.enoughSpace}</p>
                  <p><strong>Had Pet Before?</strong> {pet.data.hadPetBefore}</p>
                  <p><strong>Pet Nutrition:</strong> {pet.data.petNutrition}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">No pet requests available</div>
        )}
      </div>
    </div>
  );
};

export default AdoptRequest;
