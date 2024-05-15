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
    shelterId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RegisterShelter"
    },
    
    status:{
        type:String,
        default:"Pending"
    },
    data:{
        type:Object,
        require:true
    }
})


const Request = mongoose.model("Requests", requestSchema)

module.exports = Request