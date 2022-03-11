const express = require('express')
const router = express.Router()
const {loginAdmin, getInfoAboutMe} = require("../controllers/adminController")
const {protect} = require("../middleware/authMiddleware")
// If you want to add new admin, uncomment line below:
// const {registerAdmin} = require("../controllers/adminController")


router.post('/login', loginAdmin)
//If you want to add new admin, uncomment line below:
// router.post('/register', registerAdmin)
router.get('/me',protect , getInfoAboutMe)


module.exports = router