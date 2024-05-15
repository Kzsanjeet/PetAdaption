const {RegisterCustomer,RegisterShelter, RegisterAdmin, Pet} = require("../schema/registerSchema") //imported schema
const Request = require("../schema/requestPet")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const multer = require('multer');
const nodemailer = require("nodemailer")
const { Feedback } = require('../schema/registerSchema')

const showPetRequest = async (req, res) => {
    try {
        const shelterId = req.params.id; // Adjust the parameter name if needed
        console.log(shelterId);
        
        // Fetching requests for a specific shelterId
        const showPet = await Request.find({shelterId}).populate("userId").populate("petId").populate("shelterId");

        if(!showPet){
            return res.status(404).json({success:false, message:"Pet not found!!"})
        }
        
        // Sending the filtered requests in the response
        res.status(200).json({ success: true, showPet });
    } catch (error) {
        console.log(error);
        // Sending error response if any error occurs
        res.status(500).json({ error: 'Internal server error' });
    }
}



module.exports = {
    showPetRequest
}