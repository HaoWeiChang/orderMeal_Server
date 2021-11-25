const express = require('express')
const { login, takeToken, logout } = require('../controllers/authController')
const router = express.Router()

router.post('/login', login)
router.post('/token', takeToken)
router.delete('/logout', logout)

module.exports = router
