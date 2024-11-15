// backend/db.js
const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "website_kinedb",
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL Database!");
});

module.exports = db;
