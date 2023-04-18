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

// Randevulari Al
app.get("/GetAppointmentList", (req, res) => {
  db.query(
    "SELECT *, DATE_FORMAT(randevu_guntarih, '%d-%m-%Y') AS randevu_gun, DATE_FORMAT(randevu_baslangic_saat, '%h:%i') AS randevu_baslangic, DATE_FORMAT(randevu_bitis_saat, '%h:%i') AS randevu_bitis FROM  clinic.randevular",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    }
  );
});
// On Kayit Ekle
app.post("/addNewregistration", (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const doctor = req.body.doctor;
  const email = req.body.email;
  const comment = req.body.comment;
  const date = req.body.date;
  const starttime = req.body.starttime;
  const endtime = req.body.endtime;
  const reference = req.body.reference;
  const status = 0;
  function generateRandomID() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let ID = "OK";
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      ID += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    function checkID() {
      db.query("SELECT * FROM  clinic.onkayitlar", (err, result) => {
        result.map((onkayit, index) => {
          if (onkayit.onkayitlihasta_unique_id != ID) {
            return true;
          } else
            console.log(
              "Gerçekten tebrikler 2.176.782.336 tane ID arasından nasıl olduysa eşleşen ID buldunuz"
            );
          return false;
        });
      });
    }
    checkID();
    if (checkID) {
      return ID;
    } else generateRandomID();
  }
  let OKH_ID = generateRandomID();
  console.log(OKH_ID);
  db.query(
    `INSERT INTO clinic.onkayitlar (on_kayit_adi_soyadi,onkayitlihasta_unique_id,on_kayit_tel,on_kayit_email,on_kayit_doktor,on_kayit_hekim_yorum,on_kayit_baslangic_saati,on_kayit_bitis_saati,on_kayit_gun,on_kayit_referans,on_kayit_durum) VALUES ("${name}","${OKH_ID}","${phone}","${email}","${doctor}","${comment}","${starttime}","${endtime}","${date}","${reference}","${status}")`,
    (err, response) => {
      if (err) {
        console.log(err);
      } else res.send("Randevu veritabanına kaydedildi");
    }
  );
});

// On kayitlari Al
app.get("/GetPreregistrationsList", (req, res) => {
  const preregisrtrationstatus = req.query.preregisrtrationstatus;
  const registerendtime = req.query.registerendtime;
  const registerstarttime = req.query.registerstarttime;

  db.query(
    `SELECT *, DATE_FORMAT(on_kayit_gun, '%d-%m-%Y') AS on_kayit_randevugun, DATE_FORMAT(on_kayit_baslangic_saati, '%h:%i') AS on_kayit_baslangic, DATE_FORMAT(on_kayit_bitis_saati, '%h:%i') AS on_kayit_bitis FROM clinic.onkayitlar WHERE on_kayit_gun BETWEEN "${registerstarttime}" AND "${registerendtime}" AND on_kayit_durum ="${preregisrtrationstatus}"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Ön kayıt durumunu güncelle

app.post("/updateregisterstatus", (req, res) => {
  const status = req.body.status;
  const patient = req.body.patient;
  console.log(status, patient);
  db.query(
    `UPDATE clinic.onkayitlar SET on_kayit_durum = "${status}" WHERE onkayitlihasta_unique_id = "${patient}"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else res.send(result);
    }
  );
});
//Ön Kayıt sil
app.post("/DeletePreregister", (req, res) => {
  const patient = req.body.patient;
  db.query(
    `DELETE FROM clinic.onkayitlar WHERE onkayitlihasta_unique_id = "${patient}"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else res.send(result);
    }
  );
});

// Ajandayi Al
app.get("/GetFullagenda", (req, res) => {
  db.query("SELECT * FROM  clinic.ajanda", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
