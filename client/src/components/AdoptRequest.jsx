import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./adoptreq.css";

const AdoptRequest = () => {
    const [reqlist, setReqlist] = useState([]);
    const shelterId = localStorage.getItem("shelterId");

    const showPetReqs = async () => {
        try {
            const response = await fetch(`http://localhost:5000/show-pet-request/${shelterId}`);
            const data = await response.json();
            console.log(data.showPet);
            setReqlist(data.showPet);
        } catch (error) {
            console.error(error); // Log the error, not data
        }
    };

    //accepting request 
    const handleAccept = async (requestId, petId) => {
        console.log(requestId, petId);
        try {
            const acceptReq = await fetch(`http://localhost:5000/accept-pet-request/${requestId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({ petId })
            });

            if (acceptReq.ok) {
                const data = await acceptReq.json();
                if (data.success) {
                    // Update the status of the pet in the reqlist
                    setReqlist(prevReqlist => prevReqlist.map(item => 
                        item._id === requestId ? { ...item, status: 'Approved' } : item
                    ));
                }
                console.log(data);
            } else {
                // Handle non-successful response
                console.error('Failed to accept pet request:', acceptReq.status);
            }
        } catch (error) {
            console.error('Error while accept pet request:', error);
        }
    };

    //rejecting request
    const handleReject = async (requestId) => {
        // console.log(requestId);
        try {
            const rejectReq = await fetch(`http://localhost:5000/reject-pet-request/${requestId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json" 
                }
            });

            if (rejectReq.ok) {
                const data = await rejectReq.json();
                if (data.success) {
                    // Update the reqlist to remove the rejected pet
                    setReqlist(prevReqlist => prevReqlist.filter(item => item._id !== requestId));
                }
                console.log(data);
            } else {
                // Handle non-successful response
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
            <div className="w-full lg:w-3/4 p-4 lg:pl-36">
                {reqlist.length > 0 ? (
                    <div className="flex flex-column justify-center">
                        {reqlist.map((pet, index) => (
                            <div key={index} className="adopt-card bg-white rounded-lg shadow-lg flex gap-1">
                                <div>
                                    <img
                                        src={`http://localhost:5000/${pet.petId?.image}`}
                                        alt={pet.petId?.name}
                                        className="reqimg object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold">{pet.petId.name}</h3>
                                        <p className="text-gray-500">{pet.petId.breed}</p>
                                        <p className="mt-2 text-sm">{pet.petId.description}</p>
                                    </div>
                                </div>
                                <div className="sender-details">
                                    <h1>Sender details:</h1>
                                    <h2>Full name:</h2>
                                    <span>{pet.userId?.firstname} {pet.userId?.lastname}</span>
                                    <h2>Email:</h2>
                                    <span>{pet.userId?.email}</span>
                                </div>
                                <div className="sender-details2">
                                    <h2>Address: <span>{pet.data?.address}</span></h2>
                                    <h2>Enough Space ? <span>{pet.data?.enoughSpace}</span></h2>
                                    <h2>Had Pet Before ? <span>{pet.data?.hadPetBefore}</span></h2>
                                    <h2>Pet Nutrition ? <span>{pet.data?.petNutrition}</span></h2>
                                    {pet.status === 'Pending' ? (
                                        <>
                                            <button className="approve" onClick={() => handleAccept(pet._id, pet.petId._id)}>
                                                Approve
                                            </button>
                                            <button className="remove" onClick={() => handleReject(pet._id)}>
                                                Deny
                                            </button>
                                        </>
                                    ): (
                                        <button className="approve" disabled>
                                            {pet.status}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center">No pets available</div>
                )}
            </div>
        </div>
    );
};

export default AdoptRequest;
