const express = require('express')
const { user, register, login, authenticateToken } = require('../controllers/userController')
const router = express.Router()

//router.post('/register')
router.post('/login', login)
router.get('/userInfo', authenticateToken, user)

module.exports = router