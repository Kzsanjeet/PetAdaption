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
           getPetById,
           petCategory,
           applyFilters,
           userInfo,
           resetPasswordShelter,
           newPasswordShelter,
           specificShelterPets,
           getShelter,
           shelterData
          } = require("./control/controller");

const { editUserData, deleteUserData, editShelterData, deleteShelterData, getUser } = require("./control/profile");




    //importing from pet Request
    const {
      showPetRequest,
      acceptPetReq,
      rejectPetReq
    } = require("./control/petRequest")

    //importing form feedback
    const {
      addFeedback,
      getFeedback
    } = require("./control/feedback")


//route for login and registration part
router.route('/registerCustomer').post(registerUser)
router.route('/loginCustomer').post(loginUser)
router.route("/registerShelter").post(registerShelter)
router.route("/loginAdmin").post(loginAdmin)
router.route("/registerAdmin").post(registerAdmin)
router.route("/loginShelter").post(loginShelter)

//for getting the user info for profile
router.route('/get-user-data/:id').get(getUser)

router.route('/shelterData/:id').get(shelterData)
//getting all the shelter
router.route('/get-shelter').get(getShelter)

//route for pet part
router.route('/getPets').get(getPets);
// router.route('/getPets').get(applyFilters);
router.route('/getPetById/:id').get(getPetById);
// router.route('/petCategory').get(petCategory);
router.delete('/deletePet/:id', deletePet);
router.put('/editPet/:id', editPet);
router.get('/specific-shelter-pet/:id',specificShelterPets)


//feedback
router.post('/add-feedback/:id', addFeedback);
router.get('/get-feedback',getFeedback)


//route for the password reset part
router.route('/reset-password-mail').post(resetPassword)
router.route('/reset-password').patch(newPassword)
//route for the passoword reset part for shelter
router.route('/reset-password-mail-shelter').post(resetPasswordShelter)
router.route('/reset-password-shelter').patch(newPasswordShelter)

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
router.post('/create-pet-request', createRequest)
router.route("/show-request").post(showRequest)

//route for profile edit and delete fo customers
router.route("/edit-userProfile/:userId").patch(editUserData)
router.route("/delete-userProfile/:userId").delete(deleteUserData)

//route for edit shelter
router.route("/edit-userProfile/:shelterId").patch(editShelterData)
router.route("/delete-userProfile/:shelterId").delete(deleteShelterData)




// for pet request routes
router.route("/show-pet-request/:id").get(showPetRequest)
router.route("/accept-pet-request/:id").patch(acceptPetReq)
router.route("/reject-pet-request/:id").delete(rejectPetReq)

module.exports = router;
