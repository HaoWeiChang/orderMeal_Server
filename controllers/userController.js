const express = require('express')
const { User } = require('../models/User')

exports.register = async (req, res, next) => {
  try {
    let { email, pwd, name } = req.body
    let user = new User(email, pwd, name)
    let [checkEmailregister, _] = await User.is_Email_register(email)
    if (checkEmailregister[0] != null) {
      return res.send('Email was register')
    }
    user = await user.register()
    res.status(201).json({ message: 'register success' })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

exports.getAlluser = async (req, res, next) => {
  res.send('you see the Alluser')
}
