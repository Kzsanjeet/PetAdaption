import React, { useEffect, useState } from "react";

const MyPet = () => {
    const [request, setRequestlist] = useState([]);

    const userId = localStorage.getItem("userId");

    const getMyPet = async () => {
        try {
            const resp = await fetch(`http://localhost:5000/get-my-booked-pet/${userId}`);
            const data = await resp.json();
            console.log(data);
            if (data.success) {
                setRequestlist(data.myPets.filter((pet) => pet.status === "Accepted"));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMyPet();
    }, []);

    return (
        <>
            <h2 className= "text-center text-xl font-bold mt-20">You can visit the respective shelter houses as these pets were approved for you to adopt</h2>
            <div className="flex justify-center mb-20">
                <div className="w-full lg:w-3/4 p-4 mx-auto">
                    {request && request.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
                            {request.map((req, index) => (
                                <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg">
                                    <div style={{height: "300px", overflow: "hidden"}}>
                                        <img className="w-full h-full object-cover object-center" src={`http://localhost:5000/${req.petId.image}`} alt={req.petId.name} />
                                    </div>
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2">{req.petId.name}</div>
                                        <p className="text-gray-700 text-base">{req.petId.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center">No pets available</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default MyPet;
