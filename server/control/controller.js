const {RegisterCustomer,RegisterShelter, RegisterAdmin, Pet} = require("../schema/registerSchema") //imported schema
const Request = require("../schema/requestPet")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const multer = require('multer');
const nodemailer = require("nodemailer")
const { Feedback } = require('../schema/registerSchema')


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

//login function for customer
const loginUser = async (req, res) => {
  try {
    //Extract email and password from request
    const { email, password } = req.body;

    // To find user in the database
    const user = await RegisterCustomer.findOne({ email });

    // If user not found or password is incorrect, return error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // If user is found and password is correct, generate token and return
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({ message: 'logged in successfully', token, userId: user._id });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


const userInfo = async (req, res) => {
  try {
    // console.log("hello")
    const token = req.headers.authorization.split(" ")[1]
    if(!token){
        return res.status(403).json({message:"Token is required"})
    }
    // console.log(token)
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(decode)
    if (!decode) {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }

    const getUser = await RegisterCustomer.findById(decode.id);
    if (getUser) {
      return res.status(200).json({ success: true, message: "Success", user: getUser });
    } else {
      return res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};


 //for reseting the password for Customer(user)
 const resetPassword = async (req, res) => {
  try {
      const {email} = req.body;
      
      const checkEmail = await RegisterCustomer.findOne({email});
      if(!checkEmail){
          return res.status(400).json({ success: false, message: 'Email does not exist' });
      }

      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });


    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sanjeetkazithapa@gmail.com',
        pass: 'zthh seqb uboc cdin'
      },
      connectionTimeout: 60000
    });

    const mailOptions = {
      from: 'sanjeetkazithapa@gmail.com',
      to: email,
      subject: 'Password Reset',
      html: `<p>You requested a password reset. Click <a href="http://localhost:5173/reset-password-user/${token}">here</a> to reset your password.</p>`

    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
};

const newPassword = async (req, res) => {
  try {
      const { password,token } = req.body;
      // console.log(password, token)
      // const { token } = req.params;

      // Verify and decode the JWT token
      let decodedEmail;
      try {
          decodedEmail = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
          return res.status(400).json({ success: false, message: 'Invalid or expired token' });
      }

      // Check if decoded email exists
      if (!decodedEmail || !decodedEmail.email) {
          return res.status(400).json({ success: false, message: 'Invalid or expired token' });
      }

      // Hash the new password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Update the user's password based on the decoded email
      const changePassword = await RegisterCustomer.findOneAndUpdate({ email: decodedEmail.email }, { password: hashedPassword });

      if (!changePassword) {
          return res.status(400).json({ success: false, message: 'Password reset failed' });
      }

      res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

//registration for admin
const registerAdmin = async(req,res)=>{
  try{
      const {firstname,lastname,email,password} = req.body
      const salt = await bcrypt.genSalt(10) //generating salt
      const hashedPassword = await bcrypt.hash(password,salt) 

      const admin = await RegisterAdmin.create({
          firstname: firstname,
          lastname: lastname,
          email: email, 
          password: hashedPassword
      })
      if(admin){
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

  //login function for Admin
  const loginAdmin = async (req, res) => {
    try {
      //Extract email and password from request
      const { email, password } = req.body;
      console.log(email, password)
  
      // Checking through database
      const user = await RegisterAdmin.findOne({ email });
  
      // If user not found or password is incorrect, return error
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // If user is found and password is correct, generate token and return
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.status(200).json({ message: 'logged in successfully', token, userId: user._id });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };
  

// registration for shelter
const registerShelter = async(req,res)=>{
    try{
        const {firstname,lastname,sheltername,email,password, phone, address} = req.body
        const salt = await bcrypt.genSalt(10) //generating salt
        const hashedPassword = await bcrypt.hash(password,salt) 

        const shelter = RegisterShelter.create({
            firstname: firstname,
            lastname: lastname,
            sheltername:sheltername,
            email: email, 
            password: hashedPassword,
            phone: phone,
            address: address
        })
        if(shelter){
            res.status(200).json({success:true, message:"Approved and created succesfully", shelter})
        }else{
            res.status(400).json({message:"Not registered"})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}


//login for shelter
const loginShelter = async (req, res) => {
    try {
      //Extract email and password from the request
      const { email, password } = req.body;
  
      // To find the specific user in database
      const user = await RegisterShelter.findOne({ email });
  
      // If user not found or password is incorrect, return error
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // If user is found and password is correct, generate token and return 
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.status(200).json({ message: 'logged in successfully', token, userId: user._id });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };  


  //getting all shelter
  const getShelter = async(req,res)=>{
    try {
      const shelter = await RegisterShelter.find({})
      // console.log(shelter)
      if(!shelter){
        return res.status(404).json({success:false, message:"cannot find shelter"})
      }
      res.status(200).json({success:true, shelter})

    } catch (error) {
        return res.status(404).json({success:false, message:"error getting shelter :", error})
    }
  }

 //for reseting the password for Customer
 const resetPasswordShelter = async (req, res) => {
  try {
      const {email} = req.body;
      console.log(email)
      const checkEmail = await RegisterShelter.find({email});
      if(!checkEmail){
          return res.status(400).json({ success: false, message: 'Email does not exist' });
      }

      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });


    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sanjeetkazithapa@gmail.com',
        pass: 'zthh seqb uboc cdin'
      },
      connectionTimeout: 60000
    });

    const mailOptions = {
      from: 'sanjeetkazithapa@gmail.com',
      to: email,
      subject: 'Password Reset',
      html: `<p>You requested a password reset for shelter. Click <a href="http://localhost:5173/reset-password-shelter/${token}">here</a> to reset your password.</p>`

    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
};

const newPasswordShelter = async (req, res) => {
  try {
      const { password,token } = req.body;
      // const { token } = req.params;
      console.log(password,token)

      // Verify and decode the JWT token
      let decodedEmail;
      try {
          decodedEmail = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
          return res.status(400).json({ success: false, message: 'Invalid or expired token' });
      }

      // Check if decoded email exists
      if (!decodedEmail || !decodedEmail.email) {
          return res.status(400).json({ success: false, message: 'Invalid or expired token' });
      }

      // Hash the new password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Update the user's password based on the decoded email
      const changePassword = await RegisterCustomer.findOneAndUpdate({ email: decodedEmail.email }, { password: hashedPassword });

      if (!changePassword) {
          return res.status(400).json({ success: false, message: 'Password reset failed' });
      }

      res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
}





const shelterData = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(userId)
    const shelterProfile = await RegisterShelter.findOne({ _id: userId });
    if (!shelterProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    // console.log(userProfile)
    res.status(200).json({success:true, shelterProfile})
  } catch (err) {
    console.error(err.message);
    res.status(500).json({error: err});
  }
};





//add feedback
const addFeedback = async (req, res) => {
  try {
    const { name, email, comment } = req.body;
    const { userId } = req.params;

    const feedback = await Feedback.create({
      userId: userId,
      name: name,
      email: email,
      comment: comment
    });

    if (feedback) {
      res.status(200).json({ message: 'Successfully sent' });
    } else {
      res.status(400).json({ message: 'Not sent' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const showFeedback = async (req, res) => {
  try {
      const feedbackList = await Feedback.find({});
      if (feedbackList.length === 0) {
          return res.status(404).json({ message: 'No feedbacks found' });
      }
      res.status(200).json({ success: true, feedbackList });
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err });
  }
};


const applyFilters = () => {
  let filtered = [...pets]; // Create a new array to avoid mutating the original
  // Apply filters
  if (filters.breed) {
    filtered = filtered.filter(pet => pet.breed === filters.breed);
  }
  if (filters.category) {
    filtered = filtered.filter(pet => pet.category === filters.category);
  }
  // Add more filters as needed

  setFilteredPets(filtered);
};

// get pet by ID
const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    // console.log("Pet object before sending:", pet);
    res.status(200).json(pet);
  } catch (err) {
    console.error("Error fetching pet:", err);
    res.status(500).json({ message: err.message });
  }
};

// get pet by category
const petCategory = async (req, res) => {
const { category } = req.query;
try {
  const pets = await Pet.find({ category });
  res.json(pets);
} catch (err) {
  console.error(err);
  res.status(500).json({ message: 'Server Error' });
}
};



  //add pet

  const addPet = async (req, res) => {
    try {
      if (!req.file.path) {
        return res.status(400).json({ message: 'No image uploaded' });
      }
  
      const { name, breed,category, description} = req.body;
      const{shelterId} = req.params;
      const imagePath = req.file.path.replace(/\\/g, "/");
      
  
      const pet = await Pet.create({
        name: name,
        image: imagePath,
        breed: breed,
        category: category,
        description: description,
        shelter: shelterId   // added shelter Id
      });
  
      if (pet) {
        return res.status(200).json({success:true, message: 'Your pet has been added successfully', pet });
      } else {
        return res.status(500).json({success:false, message: 'Failed to add pet' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

  // fetching data for specific shelter pets
  const specificShelterPets = async(req,res)=>{
    try {
      const shelterId = req.params.id;
      console.log(shelterId)
      const pets = await Pet.find({shelter:shelterId});
      // const pets = await Pet.find({});

      // console.log(pets)
      if(!pets){
        return res.status(404).json({sucess:false,message:"not found"})
      }else{
        return res.status(200).json({sucess:true, pets})
      }
    } catch (error) {
      return res.status(400).json({sucess:true,message:"err",error})
    }
  }

  // for getting the pet details
  const getPets = async (req, res) => {
    try { 
      const pets = await Pet.find({}).populate("shelter");
      res.status(200).json({sucess:true,pets});
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
   
//edit pet
  const editPet = async (req, res) => {
    const petId = req.params.id;
    const { name, breed, description } = req.body;

    try {
        // Check if name and breed are not empty
        if (!name || !breed) {
            return res.status(400).json({ message: 'Name and breed are required' });
        }
        //updated pet
        const updatedPet = await Pet.findByIdAndUpdate(petId, { name, breed, description }, { new: true });
        
        if (!updatedPet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.status(200).json({ message: 'Pet updated successfully', pet: updatedPet });
    } catch (err) { //error message
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//delete pet
const deletePet = async (req, res) => {
  const petId = req.params.id; //by id
  try {
    // Delete the pet from the database by Id
    await Pet.findByIdAndDelete(petId);
    res.status(200).json({ message: 'Pet deleted successfully' });
  } catch (err) { //error
    res.status(500).json({ message: err.message });
  }
};



// for creating request for pet adaption
const createRequest = async(req, res)=>{
  try {
    const {userId, petId, shelterId, data} = req.body
    console.log(userId,petId, data)
    const newRequest = await Request.create({
      userId:userId,
      shelterId,
      petId:petId,
      data
    })
    if(!newRequest){
      return res.status(400).json({success:false, message:"error creating "})
    }
    return res.status(200).json({success:true, newRequest})
  } catch (error) {
    res.status(400).json({success:false, message:error})
  }
}

//for getting the new request for shelter
const showRequest = async (req, res) => {
  try {
    const shelterId = req.params.shelterId;
    const requests = await Request.find({}).populate({
      path: 'petId',
      match: { shelter: shelterId }
    }).exec();
    
    // Filter out any null petId entries (requests without matching pets)
    const filteredRequests = requests.filter(request => request.petId !== null);
    
    res.status(200).json({ success: true, requests: filteredRequests });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}



module.exports={registerUser,registerShelter,loginUser,loginShelter,registerAdmin,loginAdmin, addPet, getPets, editPet, deletePet, newPassword,
    getShelter,
   resetPassword,
   specificShelterPets,
   createRequest,
   showRequest,
   userInfo,
   resetPasswordShelter,
   newPasswordShelter,
   getPetById,
   addFeedback,
   petCategory,
   applyFilters,
   shelterData,
   showFeedback
  };
