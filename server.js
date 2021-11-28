const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const session = require('express-session')
const app = express()

require('dotenv').config()

//use middleware
app.use(bodyParser.json())
app.use(
  session({
    secret: 'secret',
    saveUninitialized: false,
    resave: true,
    cookie: { maxAge: 1000 * 60 * 3 },
  })
)

//set use api host
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('APP server is working')
})

app.listen(3000)
