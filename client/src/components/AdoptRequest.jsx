import React, { useEffect } from "react"
import { useParams } from "react-router-dom"

const AdoptRequest = () => {
    const shelterId = localStorage.getItem("shelterId")
    console.log(shelterId)

    const showPetReqs = async () => {
        try {
            const response = await fetch(`http://localhost:5000/show-pet-request/${shelterId}`)
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log(error) // Log the error, not data
        }
    }

    useEffect(() => {
        showPetReqs()
    }, [])

    return (
        <>
            <h1>THis is it..thank you....</h1>
        </>
    )
}
export default AdoptRequest
