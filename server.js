const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const storeRoutes = require('./routes/storeRoutes')
const activityRoutes = require('./routes/activityRoutes')
const db = require('./mysql/db')
const session = require('express-session')
const MySQLstore = require('express-mysql-session')(session)
const app = express()

require('dotenv').config()

let sessionStore = new MySQLstore({}, db)

app.use(
  session({
    secret: 'secret',
    saveUninitialized: true,
    resave: false,
    store: sessionStore,
  })
)

//use middleware
app.use(bodyParser.json())

//set use api host
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/store', storeRoutes)
app.use('/api/activity', activityRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`)
})
