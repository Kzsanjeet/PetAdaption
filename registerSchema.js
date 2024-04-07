const mongoose = require("mongoose")

const register1 = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { 
        type: String,
        required: true,     // Ensures the email field is required
        unique: true,       // Ensures uniqueness of email addresses
        trim: true,         // Removes leading and trailing whitespace
        lowercase: true,    // Converts the email to lowercase before saving
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Validates the format of the email address using a regular expression
    },
    password: {  
        type: String,
        required: true,
        minlength: 8 // Minimum password length requirement
       }
    // accountType:{type:String, enum:['Shelter','Customer']},
    },

 { timestamps: true 
})

const register2 = mongoose.Schema({
    "firstname":{type: String, required: true},
    "lastname":{type: String, required: true},
    "sheltername":{type:String, required:true},
    "email":{ 
        type: String,
        required: true,     // Ensures the email field is required
        unique: true,       // Ensures uniqueness of email addresses
        trim: true,         // Removes leading and trailing whitespace
        lowercase: true,    // Converts the email to lowercase before saving
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Validates the format of the email address using a regular expression
    },
    "password":{
        type: String,
        required: true,
        minlength: 8 // Minimum password length requirement

    }
},
{
    timestamps: true
}
)

const RegisterCustomer= mongoose.model('RegisterCustomer', register1);
const RegisterShelter = mongoose.model("RegisterShelter",register2)

module.exports = {RegisterCustomer,RegisterShelter}