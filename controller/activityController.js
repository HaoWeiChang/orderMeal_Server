const express = require('express')
const { Activity, OrderMeal } = require('../service/Activity')

exports.CreateActivity = async (req, res, next) => {
  try {
    let activity = new Activity(req.body)
    activity = await activity.Create()
    res.status(201).json({ message: `Create ${req.body.subject}` })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

exports.CreateOrders = async (req, res, next) => {
  try {
    let order = new OrderMeal(req.body)
    order = await order.Create()
    res.status(201).json({ message: `添加成功` })
  } catch (error) {
    console.log(error)
    next(error)
  }
}
exports.DeleteOrders = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error)
    next(error)
  }
}
