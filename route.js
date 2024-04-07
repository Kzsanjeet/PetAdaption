const express = require("express")
const router = express.Router()
const {registerUser,registerShelter,loginUser, loginShelter} = require("./controller")

router.route('/registerCustomer').post(registerUser)
router.route('/loginCustomer').post(loginUser)
router.route("/registerShelter").post(registerShelter)
router.route("/loginShelter").post(loginShelter)

module.exports = router;
