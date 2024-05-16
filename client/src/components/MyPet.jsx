import React, { useState } from "react"

const MyPet = ()=>{
    const [request,setRequestlist]=useState([])
    return (
        <>
            <div className="flex justify-center">
                <div className="w-full lg:w-3/4 p-4 lg:pl-36">
                    {request && request.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
                            {request.map((req, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold">{req.name}</h3>
                                        <p className="text-gray-500">{req.breed}</p>
                                        <p className="mt-2 text-sm">{req.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center">No Requests available</div>
                    )}
                </div>
            </div>
        </>
    );

}

export default MyPet