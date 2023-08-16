const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "call_credit_checker",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

// Example route to fetch all data
app.get("/fetch-data", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    console.log(results);
    res.send(results);
  });
});
// run node server.js

const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
