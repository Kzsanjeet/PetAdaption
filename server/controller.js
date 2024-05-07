const {RegisterCustomer,RegisterShelter, RegisterAdmin, Pet} = require("./registerSchema") //imported schema
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const multer = require('multer');
const nodemailer = require("nodemailer")


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
            res.status(200).json({message:"Approved and created succesfully"})
        }else{
            res.status(400).json({message:"Not registered"})
        }
    }catch(err){
        res.status(500).json({message: err.message})
    }
}


//login function for customer
const loginUser = async (req, res) => {
    try {
      //Extract email an dpasswrod from the requset body
      const { email, password } = req.body;
  
      // Find user in the database
      const user = await RegisterCustomer.findOne({ email });
  
      // If user not found or password is incorrect, return error
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // If user is found and password is correct, generate and return token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.status(200).json({ message: 'logged in successfully', token, userId: user._id });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

  const resetPassword = async (req, res) => {
    try {
        const {email} = req.body;
        
        const checkEmail = await RegisterCustomer.findOne({email});
        if(!checkEmail){
            return res.status(400).json({ success: false, message: 'Email does not exist' });
        }

        const token = jwt.sign({ email }, 'jwt_secret_key', { expiresIn: '1h' });
  
  
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
        html: `<p>You requested a password reset. Click <a href="http://localhost:3000/reset-password/${token}">here</a> to reset your password.</p>`
  
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
        // const { token } = req.params;

        // Verify and decode the JWT token
        let decodedEmail;
        try {
            decodedEmail = jwt.verify(token, 'jwt_secret_key');
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
        const changePassword = await User.findOneAndUpdate({ email: decodedEmail.email }, { password: hashedPassword });

        if (!changePassword) {
            return res.status(400).json({ success: false, message: 'Password reset failed' });
        }

        res.status(200).json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  //login function for Admin
const loginAdmin = async (req, res) => {
  try {
    //Extract email and password from the request body
    const { email, password } = req.body;

    // Find admin in the database
    const user = await RegisterAdmin.findOne({ email });

    // If user not found or password is incorrect, return error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // If user is found and password is correct, generate and return token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({ message: 'logged in successfully', token, userId: user._id });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


//login for shelter
const loginShelter = async (req, res) => {
    try {
      //Extract email and password from the request body
      const { email, password } = req.body;
  
      // Find user in the database
      const user = await RegisterShelter.findOne({ email });
  
      // If user not found or password is incorrect, return error
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // If user is found and password is correct, generate and return token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.status(200).json({ message: 'logged in successfully', token, userId: user._id });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };  


  //add pet

  const addPet = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No image uploaded' });
      }
  
      const { name, breed, description } = req.body;
      const imagePath = req.file.path.replace(/\\/g, "/");
      
  
      const pet = await Pet.create({
        name: name,
        image: imagePath,
        breed: breed,
        description: description,
      });
  
      if (pet) {
        return res.status(200).json({ message: 'Your pet has been added successfully', pet });
      } else {
        return res.status(500).json({ message: 'Failed to add pet' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

  const getPets = async (req, res) => {
    try {
      const pets = await Pet.find();
      res.status(200).json(pets);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  const getPetById = async (req, res) => {
    try {
      const pet = await Pet.findById(req.params.id);
      if (!pet) {
        return res.status(404).json({ message: 'Pet not found' });
      }
      console.log("Pet object before sending:", pet);
      res.status(200).json(pet);
    } catch (err) {
      console.error("Error fetching pet:", err);
      res.status(500).json({ message: err.message });
    }
  };

//edit pet
  const editPet = async (req, res) => {
    const petId = req.params.id;
    const { name, breed, description } = req.body;

    try {
        // Validate input data (e.g., check if name and breed are not empty)
        if (!name || !breed) {
            return res.status(400).json({ message: 'Name and breed are required' });
        }

        const updatedPet = await Pet.findByIdAndUpdate(petId, { name, breed, description }, { new: true });
        
        if (!updatedPet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        // Optionally, handle image updates here

        res.status(200).json({ message: 'Pet updated successfully', pet: updatedPet });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


//delete pet
const deletePet = async (req, res) => {
  const petId = req.params.id;
  try {
    // Logic to delete the pet from the database
    await Pet.findByIdAndDelete(petId);
    res.status(200).json({ message: 'Pet deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports={registerUser,registerShelter,loginUser,loginShelter,registerAdmin,loginAdmin, addPet, getPets, editPet, deletePet, newPassword, resetPassword, getPetById};
