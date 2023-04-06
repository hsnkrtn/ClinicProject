const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const db = mysql.createPool({
  connectionLimit: 100,
  user: "root",
  host: "localhost",
  port: 3306,
  password: "password",
  database: "clinic",
  debug: false,
});
app.listen(3001, () => {
  console.log("working");
});
 
app.get("/GetAppointmentList", (req, res) => {
  db.query("SELECT * FROM  clinic.randevular", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);

    }
  });
});
app.get("/GetFullagenda", (req, res) => {
  db.query("SELECT * FROM  clinic.ajanda", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);

    }
  });
});
