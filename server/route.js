const express = require("express");
const multer = require("multer");
const router = express.Router();
const {registerUser,
    registerShelter,
    loginUser,
    loginShelter,
      loginAdmin,
      registerAdmin,
        addPet,
        editPet,
          getPets,
          deletePet,
            resetPassword,
           newPassword,
           createRequest,
           showRequest,
          //  getPetById,
          //  petCategory,
          //  applyFilters,
           userInfo,
           resetPasswordShelter,
           newPasswordShelter,
          } = require("./control/controller");

const { editUserData, deleteUserData, editShelterData, deleteShelterData } = require("./control/profile");
const {
  //  addFeedback,
    // deleteFeedback, 
    getFeedback } = require("./control/feedback");


//route for login and registration part
router.route('/registerCustomer').post(registerUser)
router.route('/loginCustomer').post(loginUser)
router.route("/registerShelter").post(registerShelter)
router.route("/loginAdmin").post(loginAdmin)
router.route("/registerAdmin").post(registerAdmin)
router.route("/loginShelter").post(loginShelter)

//for getting the user info for profile
router.route("/userProfile").get(userInfo)

//route for pet part
router.route('/getPets').get(getPets);
// router.route('/getPets').get(applyFilters);
// router.route('/getPetById/:id').get(getPetById);
// router.route('/petCategory').get(petCategory);
router.delete('/deletePet/:id', deletePet);
router.put('/editPet/:id', editPet);

//route for the password reset part
router.route('/reset-password-mail').post(resetPassword)
router.route('/reset-password').post(newPassword)
//route for the passoword reset part for shelter
router.route('/reset-password-mail').post(resetPasswordShelter)
router.route('/reset-password').post(newPasswordShelter)


// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Init upload
const upload = multer({ storage });

// Route to add a pet       
router.post('/addPet/:shelterId', upload.single('image'), addPet); 

//for creating new request 
router.post('/pet-request', createRequest)
router.route("/show-request").post(showRequest)

//route for profile edit and delete fo customers
router.route("/edit-userProfile/:userId").patch(editUserData)
router.route("/delete-userProfile/:userId").delete(deleteUserData)

//route for edit shelter
router.route("/edit-userProfile/:shelterId").patch(editShelterData)
router.route("/delete-userProfile/:shelterId").delete(deleteShelterData)

//Route for feedback
// router.route('/addFeedback/:userId').post(addFeedback)
// router.route("/deleteFeedback/:userId").delete(deleteFeedback)
router.route("/getFeedback").get(getFeedback)

module.exports = router;
