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



module.exports = {editUserData}

