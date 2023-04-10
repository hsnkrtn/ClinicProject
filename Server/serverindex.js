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

// Randevulari Al
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
// Ajandayi Al
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

// Randevu Ekle
app.post("/addNewAppointment", (req, res) => {
  const name = req.body.name;
  const patientID = req.body.patientID;
  const phone = req.body.phone;
  const doctor = req.body.doctor;
  const email = req.body.email;
  const comment = req.body.comment;
  const date = req.body.date;
  const starttime = req.body.starttime;
  const endtime = req.body.endtime;
  db.query(
    `INSERT INTO clinic.randevular (hasta_unique_id,randevu_adi_soyadi,randevu_hasta_tel,randevu_hasta_mail,randevu_doktor,randevu_yapilacak_islem,randevu_gun,randevu_baslangic_saat,randevu_bitis_saat) VALUES ("${patientID}","${name}","${phone}","${email}","${doctor}","${comment}","${date}","${starttime}","${endtime}")`,
    (err, response) => {
      if (err) {
        console.log(err);
      } else res.send("Randevu veritabanına kaydedildi");
    }
  );
});
