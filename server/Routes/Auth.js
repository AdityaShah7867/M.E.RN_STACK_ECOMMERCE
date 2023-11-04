const express = require("express")
const router = express.Router()
const {verifyToken} = require("../Middleware/VerifyUser")
const {register,login,getLoggedinUser} = require("../Controller/Auth")

router.post('/register',register)
router.post('/login',login)
router.get('/getLoggedinUser',verifyToken,getLoggedinUser)



module.exports = router