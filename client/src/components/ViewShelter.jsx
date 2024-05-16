import React, { useEffect, useState } from 'react'

const ViewShelter = () => {
  const [shelterlist,setShelterlist]=useState([])

    const getShelter = async() =>{
        try {
            const resp = await fetch("http://localhost:5000/get-shelter")
            const shelterdata = await resp.json() 
            setShelterlist(shelterdata.shelter)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getShelter()
    },[])

  return (
    <div className="flex justify-center">
            <div className="w-full lg:w-3/4 p-4 lg:pl-36">
              {shelterlist && shelterlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
                  {shelterlist.map((shelter, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{shelter.sheltername}</h3>
                        <p className="text-gray-500">{shelter.address}</p>
                        <p className="mt-2 text-sm">{shelter.email}</p>
                        <button className='delete-button-shelter'>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center">No shelters available</div>
              )}
            </div>
          </div>
  )
}

export default ViewShelter
