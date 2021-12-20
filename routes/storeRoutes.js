const express = require('express')
const router = express.Router()
const { CreateStore } = require('../controller/storeController')

router.route('/').post(CreateStore).get().delete()

router.route('/meal')

module.exports = router
