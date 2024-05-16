const RegisterCustomer = require("../schema/registerSchema")


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
        const ShelterId = req.params.id
        const {firstname,lastname,sheltername,phone,address,email,password} = req.body
        const editUser = await RegisterShelter.findByIdAndUpdate(ShelterId,{firstname,lastname,sheltername,phone,address,email,password});
        if(!editUser){
            return res.status(404).json({success:false,message:"Unable to edit the profile"})
        }else{
            return res.status(200).json({success:true,message:"Edited successfully"})
        }
    } catch (error) {
        return res.status(400).json({success:false,message:"error",error})
    }
}

const deleteShelterData = async(req,res)=>{
    try {
        const shelterId = req.params.id
        const deleteUser = await RegisterShelter.findByIdandDelete({_id:shelterId});
        if(!deleteUser){
            return res.status(400).json({success:false,message:"Unable to delete the user profile"})
        }else{
            return res.status(200).json({success:true,message:"Deleted successully"})
        }
    } catch (error) {
        return res.status(401).json({sucess:false,message:"error,err"})
    }
}




module.exports = {editUserData,deleteUserData,editShelterData,deleteShelterData}

