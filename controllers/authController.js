const express = require('express')
const jwt = require('jsonwebtoken')
const session = require('express-session')
const bcrypt = require('bcrypt')
require('dotenv').config()

let refreshTokens = []

const register = async (req, res) => {
  const userEmail = req.body.userEmail
  const hashPassword = bcrypt.hashSync(req.body.userPassword, 10)
}

const login = (req, res) => {
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

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

const takeToken = (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json(accessToken)
  })
}

const logout = (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token != req.body.token)
  res.sendStatus(204)
}

module.exports = {
  login,
  generateAccessToken,
  authenticateToken,
  takeToken,
  logout,
}
