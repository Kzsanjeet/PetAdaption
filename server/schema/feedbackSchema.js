const mongoose = require("mongoose")

const feedbackSchema = mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true},
    comment: {type:String, required:true},
    "user": {
      type:mongoose.Schema.Types.ObjectId,
      ref:"RegisterCustomer"   
  }
  })

  const Feedback = mongoose.model('Feedback', feedbackSchema)
  module.exports= Feedback