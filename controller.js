const {RegisterCustomer,RegisterShelter} = require("./registerSchema") //imported schema
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//registration for customer
const registerUser = async(req,res)=>{
    try{
        const {firstname,lastname,email,password} = req.body
        const salt = await bcrypt.genSalt(10) //generating salt
        const hashedPassword = await bcrypt.hash(password,salt) 

        const user = await RegisterCustomer.create({
            firstname: firstname,
            lastname: lastname,
            email: email, 
            password: hashedPassword
        })
        if(user){
            res.status(200).json({message:'Successfully registered'})
        }else{
            res.status(400).json({message:"Not registered"})
        }
        // res.status(200).json({message:{firstname,lastname},sucess:true})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

// registration for shelter
const registerShelter = async(req,res)=>{
    try{
        const {firstname,lastname,sheltername,email,password} = req.body
        const salt = await bcrypt.genSalt(10) //generating salt
        const hashedPassword = await bcrypt.hash(password,salt) 

        const shelter = RegisterShelter.create({
            firstname: firstname,
            lastname: lastname,
            sheltername:sheltername,
            email: email, 
            password: hashedPassword
        })
        if(shelter){
            res.status(200).json({message:"Approved and created succesfully"})
        }else{
            res.status(400).json({message:"Not registered"})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}


//login function for customer
const loginUser = async(req,res)=>{
    try{
        const{email,password}= req.body;


        const login = await RegisterCustomer.findOne({email: email})  // left one is key and right one is value
        if(!login){
           res.status(400).json({message:"Please put the correct email address"})
        }else{
            const checkPassword = await  bcrypt.compare(password, login.password)
            if(checkPassword){
                token = jwt.sign({id:login._id},process.env.JWT_SECRET)
                console.log(token,"hello")
                res.status(200).json({message:"logged in suc",token:token})

            }else{
                res.status(400).json({message:"Password incorrect, Please try again"})
            }
            
        }
    }catch(err){
        res.status(500).json({message:err})
    }

}



//login for shelter
const loginShelter = async(req,res)=>{
    try{
        const{email,password}=req.body
        const login = await RegisterShelter.findOne({email:email}) //right one is the value that came from request body
        if(!login){
            res.status(200).json({message:"Please put the correct email address"})
        }else{
            const checkPassword = await bcrypt.compare(password,login.password)
            if(checkPassword){
                const token = jwt.sign({id:login._id},process.env.JWT_SECRET)
                // res.cookie('token',token,{http:true, secure:process.env.NODE_ENV='production'})
                res.status(200).json({message:"Logged in sucessfully",token:token})
            }else{
                res.status(400).json({message:"Unable to login, please put the correct password"})
            }
        }

    }catch(err){
        res.status(500).json({message:err})
    }
}

module.exports={registerUser,registerShelter,loginUser,loginShelter};