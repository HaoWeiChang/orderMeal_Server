const express = require('express')
const { user, register } = require('../controllers/userController')
const { authenticateToken } = require('../controllers/authController')
const router = express.Router()

//router.post('/register')

router.get('/userInfo', authenticateToken, user)

module.exports = router
