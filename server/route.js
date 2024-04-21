const express = require("express");
const multer = require("multer");
const router = express.Router();
const {registerUser,registerShelter,loginUser, loginShelter, addPet, editPet, getPets} = require("./controller")

router.route('/registerCustomer').post(registerUser)
router.route('/loginCustomer').post(loginUser)
router.route("/registerShelter").post(registerShelter)
router.route("/loginShelter").post(loginShelter)
router.route('/getPets').get(getPets);
router.route("/editPet").post(editPet)

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
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
