const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const app = express()

require('dotenv').config()

app.use(bodyParser.json())

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('APP server is working')
})

app.listen(3000)
