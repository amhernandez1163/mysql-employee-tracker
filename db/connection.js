const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: "D0nth@ckm3123!",
    database: "etracker",
  },
  console.log("Connected to the etracker database.")
);

module.exports = db;
