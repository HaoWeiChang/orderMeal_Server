const mysql2 = require('mysql2');
const mysql = mysql2;

const connectSql = mysql.createConnection({
    host: process.env.sqlhost,
    user: process.env.sqluser,
    database: process.env.sqldatabase,
    port: process.env.sqlport,
    password: process.env.sqlpassword
})