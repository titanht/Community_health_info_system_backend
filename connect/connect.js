const mysql = require('mysql')
require('dotenv').config()
const dbPassword = process.env.DB_PASSWORD
const dbName = process.env.DB_NAME
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: dbPassword,
  database: dbName,
})
module.exports = db
