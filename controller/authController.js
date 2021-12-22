const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../mysql/db')
require('dotenv').config()

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body
    let sql = `select * from account where email='${email}'`
    const verify = await db.execute(sql).then((result) => {
      return result[0]
    })
    if (!bcrypt.compareSync(password, verify[0].password))
      res.status(401).json({ message: '密碼錯誤' })
    req.session.id = verify[0].id
    res.status(201).json({ message: '登入成功' })
  } catch (error) {
    console.log(error)
  }
}
const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' })
}

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

exports.takeToken = (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json(accessToken)
  })
}

exports.Logout = (req, res) => {
  try {
    req.session.destroy((err) => {
      throw new Error('登出失敗')
    })
    res.status(203).json({ message: '登出成功' })
  } catch (error) {
    console.log(error)
  }
}
