const express = require('express')
const { register, getAlluser } = require('../controllers/userController')
const { authenticateToken } = require('../controllers/authController')
const router = express.Router()

//router.post('/register')

router.route('/account').post(register)
//router.route('/user/:id').get(getUser)
//router.route('/user/info).get(getAlluser).get(getUserInfo).post(writeUserInfo)
module.exports = router
