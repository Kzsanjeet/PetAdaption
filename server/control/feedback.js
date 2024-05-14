const Feedback = require("../schema/feedbackSchema")

// const addFeedback = async (req, res) => {
//     try {
//         const {userId} = req.params
//       const {name,email,comment} = req.body;
      
//       const feedback = await Feedback.create({
//         name: name,
//         email:email,
//         comment:comment,
//         user:userId
//       });
  
//       if (feedback) {
//         return res.status(200).json({success:true, message: 'Your feedback has been added successfully', feedback });
//       } else {
//         return res.status(500).json({success:false, message: 'Failed to add feedback' });
//       }
//     } catch (err) {
//       return res.status(500).json({ message: err.message });
//     }
//   };

  // for getting the pet details
  const getFeedback = async (req, res) => {
    try {
      const Feedback = await Feedback.find({})
      if(!Feedback){
        return res.status(404).json({success:false,message:"Unable to get feedback"})
      }else{
        return res.status(200).json({sucess:true,Feedback});
      }
      
    } catch (err) {
      res.status(400).json({success:false, message:"error",err});
    }
  };
   



module.exports = {getFeedback}
