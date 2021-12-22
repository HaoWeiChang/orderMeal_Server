const express = require('express')
const router = express.Router()
const {
  CreateActivity,
  CreateOrders,
} = require('../controller/activityController')

router.route('/').post(CreateActivity)

router.route('/order').post(CreateOrders).delete()

module.exports = router
