const express = require('express')
const { account } = require('../service/User')

exports.register = async (req, res, next) => {
  try {
    let body = {
      email: req.body.email,
      pwd: req.body.pwd,
      name: req.body.name,
      studentID: req.body.studentID,
    }
    let user = new account(body)
    let checkEmailregister = await account.is_Email_register(body.email)
    if (checkEmailregister != null) {
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
