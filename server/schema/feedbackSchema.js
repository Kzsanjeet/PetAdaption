const mongoose = require("mongoose")

const feedbackSchema = mongoose.Schema({
    comment: {type:String, required:true},
    "user": {
      type:mongoose.Schema.Types.ObjectId,
      ref:"RegisterCustomer"   
    },
    admin:{
      type:String,
      default:"6625a3dcfce3419e3440f716"
    }
  })

  const Feedback = mongoose.model('Feedback', feedbackSchema)
  module.exports= Feedback