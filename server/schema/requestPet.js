// schema for checking the status of request of the pets

const mongoose = require("mongoose")

const requestSchema =  new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RegisterCustomer"
    },
    petId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Pet"
    },
    status:{
        type:String,
        default:"Pending"
    },
})


const Request = mongoose.model("Requests", requestSchema)

module.exports = Request