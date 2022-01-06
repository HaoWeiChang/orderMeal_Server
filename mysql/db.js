require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.sqlhost,
  user: process.env.sqluser,
  database: process.env.sqldatabase,
  port: process.env.sqlport,
  password: process.env.sqlpassword,
  timezone: "+08:00",
});

module.exports = pool.promise();
