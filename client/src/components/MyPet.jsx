import React, { useEffect, useState } from "react"

const MyPet = ()=>{
    const [request,setRequestlist]=useState([])

    const userId = localStorage.getItem("userId")
    console.log(userId)

    const getMyPet = async()=>{
        try {
            const resp = await fetch(`http://localhost:5000/get-my-booked-pet/${userId}`)
            const data = await resp.json()
            console.log(data)
            if(data.success){
                setRequestlist(data.myPets.filter((pet)=>pet.status=="Accepted"))
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getMyPet()
    },[])

    console.log(request)

    return (
        <>
            <div className="flex justify-center">
                <div className="w-full lg:w-3/4 p-4 lg:pl-36">
                    {request && request.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
                            {request.map((req, index) => (
                               
                               <section className="text-gray-700 body-font bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-full mx-auto flex flex-wrap">
          <img alt={req.petId.name} className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={`http://localhost:5000/${req.petId.image}`} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1>Pet details</h1>
            <h2 className="text-sm title-font text-gray-500 tracking-widest">{req.petId.breed}</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{req.petId.name}</h1>
            <p className="leading-relaxed py-4">{req.petId.description}</p>

            {/* <div className='border m-2'>
              <h1 >Shelter Details</h1>
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{pet.shelter.firstname} {pet.shelter.lastname}</h2>
              <h2 className="text-gray-900 text-xl title-font font-medium mb-1">{pet.shelter.sheltername}</h2>
              <h2 className="text-gray-900 text-xl title-font font-medium mb-1">Contact: {pet.shelter.phone}</h2>
              <p className="leading-relaxed py-4">{pet.shelter.email}</p>
            </div> */}
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

}

export default MyPet