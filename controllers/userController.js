const express = require('express')
require('dotenv').config()

const posts = [
  {
    username: 'howard',
    title: 'test',
  },
]

const user = (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name))
}

module.exports = {
  user,
}
