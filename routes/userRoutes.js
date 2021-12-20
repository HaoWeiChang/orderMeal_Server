const express = require('express')
const { register, getAlluser } = require('../controller/userController')
const { Login, Logout } = require('../controller/authController')
const { authenticateToken } = require('../controller/authController')
const router = express.Router()

//router.post('/register')

router.route('/account').post(register)
//router.route('/user/:id').get(getUser)
//router.route('/user/info).get(getAlluser).get(getUserInfo).post(writeUserInfo)
module.exports = router
