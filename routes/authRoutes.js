const express = require('express')
const { Login, takeToken, Logout } = require('../controller/authController')
const router = express.Router()

router.post('/login', Login)
router.post('/token', takeToken)
router.delete('/logout', Logout)

module.exports = router
