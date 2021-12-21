const express = require('express')
const router = express.Router()
const { CreateStore, CreateMeal } = require('../controller/storeController')

router.route('/').post(CreateStore).get().delete()

router.route('/meal').post(CreateMeal)

module.exports = router
