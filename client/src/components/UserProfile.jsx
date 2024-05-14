import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [shelterData, setShelterData] = useState(null);
    const userId = localStorage.getItem("userId");


    const shelterProfile = async()=>{
        try {
            const response = await fetch(`http://localhost:5000/shelterData/${userId}`)
            const data = await response.json()
            console.log(data)
            setShelterData(data.shelterProfile)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() =>{
        
        shelterProfile()
    }, [])

    console.log(shelterData)

    if (!shelterData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-gray-100 w-full lg:w-3/4 p-2 lg:ml-80">
            <div className="container mx-auto py-2">
                <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                    <div className="col-span-4 sm:col-span-3">
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="flex flex-col items-center">
                                <img src={shelterData.profilePicture} className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" alt="Profile Picture" />
                                <h1 className="text-xl font-bold text-center">{shelterData.shelterName}</h1>
                                <p className="text-gray-700">test</p>
                            </div>
                            <hr className="my-6 border-t border-gray-300" />
                            <div className="flex flex-col">
                                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Address: </span>
                                <span className="mb-8">{shelterData.address}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Phone: </span>
                                <span className="mb-8">{shelterData.phone}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Email: </span>
                                <span className="mb-8">{shelterData.email}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 sm:col-span-9">
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4">About Us</h2>
                            <p className="text-gray-700">{shelterData.about}</p>
                            {/* Social Media Links */}
                            <h3 className="font-semibold text-center mt-3 -mb-2">Find us on</h3>
                            <div className="flex justify-center items-center gap-6 my-6">
                                <a className="text-gray-700 hover:text-orange-600" aria-label="Visit LinkedIn" href={shelterData.socialMedia.linkedIn} target="_blank">
                                    LinkedIn
                                </a>
                                <a className="text-gray-700 hover:text-orange-600" aria-label="Visit YouTube" href={shelterData.socialMedia.youtube} target="_blank">
                                    YouTube
                                </a>
                                <a className="text-gray-700 hover:text-orange-600" aria-label="Visit Facebook" href={shelterData.socialMedia.facebook} target="_blank">
                                    Facebook
                                </a>
                                <a className="text-gray-700 hover:text-orange-600" aria-label="Visit Instagram" href={shelterData.socialMedia.instagram} target="_blank">
                                    Instagram
                                </a>
                                <a className="text-gray-700 hover:text-orange-600" aria-label="Visit Twitter" href={shelterData.socialMedia.twitter} target="_blank">
                                    Twitter
                                </a>
                            </div>
                            {/* Achievements */}
                            <h2 className="text-xl font-bold mt-6 mb-4">Achievements</h2>
                            {shelterData.achievements.map((achievement, index) => (
                                <div key={index} className="mb-6">
                                    <div className="flex justify-between flex-wrap gap-2 w-full">
                                        <span className="text-gray-700 font-bold">{achievement.title}</span>
                                    </div>
                                    <p className="mt-2">{achievement.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
