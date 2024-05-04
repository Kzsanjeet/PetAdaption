const express = require("express");
const multer = require("multer");
const router = express.Router();
const {registerUser,registerShelter,loginUser, loginShelter, loginAdmin, registerAdmin, addPet, editPet, getPets, deletePet, resetPassword, newPassword} = require("./controller")

router.route('/registerCustomer').post(registerUser)
router.route('/loginCustomer').post(loginUser)
router.route("/registerShelter").post(registerShelter)
router.route("/loginAdmin").post(loginAdmin)
router.route("/registerAdmin").post(registerAdmin)
router.route("/loginShelter").post(loginShelter)
router.route('/getPets').get(getPets);
// router.route("/editPet").post(editPet)
router.delete('/deletePet/:id', deletePet)
router.put('/editPet/:id', editPet);

router.route('/reset-password-mail').post(resetPassword)
router.route('/reset-password').post(newPassword)

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
router.post('/addPet', upload.single('image'), addPet); 

module.exports = router;
