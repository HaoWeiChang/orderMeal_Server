const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const posts = [
  {
    username: 'howard',
    title: 'test',
  },
]

const register = (req, res) => {}

const user = (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name))
}

module.exports = {
  register,
  user,
}
