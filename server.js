import express from "express";
import mysql2 from "mysql2";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const mysql = mysql2;

const connectSql = mysql.createConnection({
    host: process.env.sqlhost,
    user: process.env.sqluser,
    database: process.env.sqldatabase,
    port: process.env.sqlport,
    password: process.env.sqlpassword
})


app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(3000)