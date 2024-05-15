import React, { useEffect } from 'react'

const ViewShelter = () => {

    const getShelter = async() =>{
        try {
            const resp = await fetch("http://localhost:5000/get-shelter")
            const shelter = await resp.json() 
            console.log(shelter)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getShelter()
    },[])

  return (
    <div>
      <h1>view all shelter</h1>
    </div>
  )
}

export default ViewShelter
