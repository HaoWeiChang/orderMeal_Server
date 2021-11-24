const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')
const jwt = require('jsonwebtoken')
const app = express();

require('dotenv').config()


app.use(bodyParser.json());


app.use('/api/user', userRoutes);



app.get('/', (req, res) => {
    res.send('APP server is working')
});

app.listen(3000);