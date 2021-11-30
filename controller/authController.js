const express = require('express')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const bcrypt = require('bcrypt')
require('dotenv').config()

let refreshTokens = []

exports.Login = (req, res) => {
  const username = req.body.username
  const user = {
    name: username,
  }
  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)
  res.json({
    accessToken: accessToken,
    refreshToken: refreshToken,
  })
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
  refreshTokens = refreshTokens.filter((token) => token != req.body.token)
  res.sendStatus(204)
}
