const {RegisterCustomer,RegisterShelter, RegisterAdmin, Pet} = require("../schema/registerSchema") //imported schema
const Request = require("../schema/requestPet")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


const getUser = async(req,res)=>{
    try {
        const userId = req.params.id;
        const userData = await RegisterCustomer.findById(userId)
        if(!userData){
            return res.status(404).json({success:false,message:"unable to get the user data"})
        }else{
            return res.status(200).json({success:true,userData})
        }
    } catch (error) {
        return res.status(400).json({success:false,message:"error",error})
    }
}

// for editing the user profile for cutomers
const editUserData = async(req,res)=>{
    try {
        const userId = req.params.id
        const {firstname,lastname,email,password} = req.body
        const editUser = await RegisterCustomer.findByIdAndUpdate(userId,{firstname,lastname,email,password});
        if(!editUser){
            return res.status(404).json({success:false,message:"Unable to edit the profile"})
        }else{
            return res.status(200).json({success:true,message:"Edited successfully"})
        }
    } catch (error) {
        return res.status(400).json({success:false,message:"error",error})
    }
}

const deleteUserData = async(req,res)=>{
    try {
        const userId = req.params.id
        const deleteUser = await RegisterCustomer.findByIdandDelete(userId);
        if(!deleteUser){
            return res.status.json({success:false,message:"Unable to delete the user profile"})
        }else{
            return res.status.json({success:true,message:"Deleted successully"})
        }
    } catch (error) {
        return res.status.json({sucess:false,message:"error,err"})
    }
}

//for shelter profile
const editShelterData = async(req,res)=>{
    try {
        const shelterId = req.params.id
        const {
            sheltername,phone,address,password
        } = req.body
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password,salt)
        // console.log(shelterId,sheltername,phone,address,password)
        const editUser = await RegisterShelter.findByIdAndUpdate({_id:shelterId},{sheltername,phone,address,password:hashPassword});
        if(!editUser){
            return res.status(404).json({success:false,message:"Unable to edit the profile"})
        }else{
            return res.status(200).json({success:true,message:"Edited successfully", editUser})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({success:false,message:"error",error})
    }
}

const deleteShelterData = async(req,res)=>{

    try {
        const shelterId = req.params.id
        // console.log(shelterId)
        const deleteUser = await RegisterShelter.findByIdAndDelete({_id:shelterId})
        if(!deleteUser){
            return res.status(400).json({success:false,message:"Unable to delete the user profile"})
        }else{
            return res.status(200).json({success:true,message:"Deleted successully"})
        }
    } catch (error) {
        // console.log(error)
        return res.status(401).json({sucess:false,message:"error,err"})

    }
}

// const getUser = async (req, res) => {
//     try {
//         const userId = req.params.id;

//         const userProfile = await RegisterCustomer.find({ _id: userId });

//         if (!userProfile || userProfile.length === 0) {
//             return res.status(404).json({ success: false, message: "Unable to get the user data" });
//         } else {
//             return res.status(200).json({ success: true, userProfile });
//         }
//     } catch (error) {
//         console.error("Error:", error); // Log the error for debugging
//         return res.status(400).json({ success: false, message: "Error occurred", error });
//     }
// };


//showing the booked list of pets for user
const getMyBookedPet = async(req,res) =>{
    try {
        // console.log("Hello")
        const userId = req.params.id;
        // console.log(userId)
        const myPets = await Request.find({userId:userId}).populate("petId")

        
        if(!myPets){
            res.status(404).json({success:false,message:""})
        }
        res.status(200).json({success:true, myPets})
    } catch (error) {
        console.log(error)
        res.status(401).json({message:error})
    }
}




module.exports = {editUserData,deleteUserData,editShelterData,deleteShelterData,getUser}
module.exports = {
    editUserData,
    deleteUserData,
    editShelterData,
    deleteShelterData,
    getUser,
    getMyBookedPet
}

