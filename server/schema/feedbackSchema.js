const mongoose = require("mongoose")

const feedbackSchema = mongoose.Schema({
    userId: {type:String, required:true},
    name: {type:String, required:true},
    email: {type:String, required:true},
    comment: {type:String, required:true}
  })

  const Feedback = mongoose.model('Feedback', feedbackSchema)
  module.exports={Feedback}