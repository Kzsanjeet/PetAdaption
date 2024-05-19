import React, { useEffect, useState } from "react";

const MyPet = () => {
    const [request, setRequestlist] = useState([]);

    const userId = localStorage.getItem("userId");
    console.log(userId);

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

    console.log(request);

    return (
        <>
            <div className="flex justify-center">
                <div className="w-full lg:w-3/4 p-4 lg:pl-36">
                    {request && request.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
                            {request.map((req, index) => (
                                <section className="text-gray-700 body-font bg-white" key={index}>
                                    <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                                        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                                            <img
                                                className="object-cover object-center rounded"
                                                alt={req.petId.name}
                                                src={`http://localhost:5000/${req.petId.image}`}
                                            />
                                        </div>
                                        <div className="flex flex-col md:items-start md:text-left items-center text-center">
                                            <h1 className="sm:text-3xl text-2xl mb-4 font-medium text-gray-900">{req.petId.name}</h1>
                                            <p className="mb-8 leading-relaxed">{req.petId.description}</p>
                                            <div className="flex justify-center">
                                                <button className="text-white bg-gray-900 border-0 py-2 px-6 focus:outline-none hover:bg-gray-800 rounded text-lg">Adopt Now</button>
                                            </div>
                                        </div>
                                    </div>
                                </section>
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
