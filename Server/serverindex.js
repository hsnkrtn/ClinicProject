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

// Randevu Ekle ve random ID olusturma
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
  const appointmentdefaultstatus = 0;
  let AP_ID = generateRandomID();

  function generateRandomID() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let ID = "RN";
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      ID += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    function checkID() {
      db.query("SELECT * FROM  clinic.randevular", (err, result) => {
        result.map((appointment, index) => {
          if (appointment.randevu_unique_id != ID) {
            return true;
          } else
            console.log(
              "Gerçekten tebrikler 2.176.782.336 tane ID arasından nasıl olduysa eşleşen ID buldunuz(Randevu Ekle)"
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

  db.query(
    `INSERT INTO clinic.randevular (hasta_unique_id,randevu_unique_id,ad_soyad,randevu_hasta_tel,randevu_hasta_mail,randevu_doktor,randevu_yapilacak_islem,etkinlik_tarih,etkinlik_baslangic_saat,etkinlik_bitis_saat,randevu_durum) VALUES ("${patientID}","${AP_ID}","${name}","${phone}","${email}","${doctor}","${comment}","${date}","${starttime}","${endtime}","${appointmentdefaultstatus}")`,
    (err, response) => {
      if (err) {
        console.log(err);
      } else res.send("Randevu veritabanına kaydedildi");
      console.log("Randevu veritabanına kaydedildi");
    }
  );
});

// Randevulari Al
app.get("/GetAppointmentList", (req, res) => {
  const selectedappointmentstartday = req.query.selectedappointmentstartday;
  const selectedappointmentsendday = req.query.selectedappointmentsendday;
  const appointmentstatus = req.query.appointmentstatus;

  db.query(
    `SELECT *, DATE_FORMAT(etkinlik_tarih, '%d-%m-%Y') AS randevu_gun, DATE_FORMAT(etkinlik_baslangic_saat, '%h:%i') AS baslangic_saati, DATE_FORMAT(etkinlik_bitis_saat, '%h:%i') AS bitis_saati FROM  clinic.randevular  WHERE etkinlik_tarih BETWEEN "${selectedappointmentstartday}" AND "${selectedappointmentsendday}" AND randevu_durum ="${appointmentstatus}"`,
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
// Randevu durumu güncelle
app.post("/updateAppointmentstatus", (req, res) => {
  const appointmentID = req.body.appointmentID;
  const patient = req.body.patient;
  const appointmentStatus = req.body.appointmentStatus;

  db.query(
    `UPDATE clinic.randevular SET randevu_durum = "${appointmentStatus}" WHERE hasta_unique_id = "${patient}" AND randevu_unique_id = "${appointmentID}"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else res.send(result);
    }
  );
});
//Randevu sil
app.post("/deleteAppointment", (req, res) => {
  const appointmentID = req.body.appointmentID;
  const patient = req.body.patient;
  db.query(
    `DELETE FROM clinic.randevular WHERE  hasta_unique_id  = "${patient}" AND randevu_unique_id= "${appointmentID}" `,
    (err, result) => {
      if (err) {
        console.log(err);
      } else res.send(result);

      console.log("Randevu silindi", appointmentID, patient);
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
              "Gerçekten tebrikler 2.176.782.336 tane ID arasından nasıl olduysa eşleşen ID buldunuz(Onkayitlihasta)"
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
    `INSERT INTO clinic.onkayitlar (ad_soyad,onkayitlihasta_unique_id,on_kayit_tel,on_kayit_email,on_kayit_doktor,on_kayit_hekim_yorum,etkinlik_baslangic_saati,etkinlik_bitis_saati,etkinlik_tarih,on_kayit_referans,on_kayit_durum) VALUES ("${name}","${OKH_ID}","${phone}","${email}","${doctor}","${comment}","${starttime}","${endtime}","${date}","${reference}","${status}")`,
    (err, response) => {
      if (err) {
        console.log(err);
      } else res.send("Randevu veritabanına kaydedildi");
    }
  );
});

// On kayitlari Al
app.get("/GetPreregistrationsList", (req, res) => {
  const preregistrationstatus = req.query.preregistrationstatus;
  const registerendtime = req.query.registerendtime;
  const registerstarttime = req.query.registerstarttime;

  db.query(
    `SELECT *, DATE_FORMAT(etkinlik_tarih, '%d-%m-%Y') AS randevu_gun, DATE_FORMAT(etkinlik_baslangic_saati, '%h:%i') AS baslangic_saati, DATE_FORMAT(etkinlik_bitis_saati, '%h:%i') AS on_kayit_bitis FROM clinic.onkayitlar WHERE etkinlik_tarih BETWEEN "${registerstarttime}" AND "${registerendtime}" AND on_kayit_durum ="${preregistrationstatus}"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        // console.log(result)
      }
    }
  );
});

// Ön kayıtlı hastanın tedavilerini al
app.get("/getPatientTreatment", (req, res) => {
  const patient = req.query.patientinformation;
  const treatmentstatus = req.query.treatmentstatus;
  // console.log(patient);
  db.query(
    `SELECT * FROM  clinic.onkayittedaviplanlari WHERE onkayit_tedaviplanlari_hastaunique_id ="${patient}" AND onkayit_tedaviplanlari_tedavi_onay ="${treatmentstatus}"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        // console.log(result);
      }
    }
  );
});

// Tedavi durumunu güncelle

app.post("/updatetreatmentstatus", (req, res) => {
  const treatmentstatus = req.body.status;
  const treatment = req.body.treatment;
  console.log(treatmentstatus, treatment);
  db.query(
    `UPDATE clinic.onkayittedaviplanlari SET onkayit_tedaviplanlari_tedavi_onay = "${treatmentstatus}" WHERE onkayit_tedaviplanlari_tedaviplaniunique_id = "${treatment}"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else res.send(result);
    }
  );
});
// Ön kayıtlı hasta durumunu güncelle

app.post("/updatepregistrationstatus", (req, res) => {
  const patient = req.body.patient;
  const status = req.body.status;
  db.query(
    `UPDATE clinic.onkayitlar SET on_kayit_durum = "${status}" WHERE onkayitlihasta_unique_id = "${patient}"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else res.send(result);
      console.log("Ön kayıt Durumu Onaylanmış olarak güncellendi");
    }
  );
});
//  On kayıtlı hasta  Tedavi  sil
app.post("/deleteTreatment", (req, res) => {
  const treatment = req.body.treatment;
  db.query(
    `DELETE FROM clinic.onkayittedaviplanlari WHERE onkayit_tedaviplanlari_tedaviplaniunique_id = "${treatment}"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else res.send(result);
    }
  );
});
// Ön kayıtlı hastaların tedavi işlemleri

app.get("/getPatientTreatmentOperations", (req, res) => {
  const patient = req.query.patientinformation;
  console.log(patient);
  db.query(
    `SELECT * FROM clinic.tedaviplanislemler WHERE tedaviplanislem_hasta_unique_id = "${patient}"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log("getPatientTreatmentOperations", result);
      }
    }
  );
});

// Tadavi islemini sil
app.post("/deleteTreatmentoperation", (req, res) => {
  const treatment = req.body.treatment;
  const operation = req.body.operation;
  db.query(
    `DELETE FROM clinic.tedaviplanislemler WHERE tedaviplanislem_tedavi_plani = "${treatment}" AND tedaviplanislem_unique_id= "${operation}" `,
    (err, result) => {
      if (err) {
        console.log(err);
      } else res.send(result);

      console.log("Tedavi Plani islemi silindi", treatment, operation);
    }
  );
});

// Yeni hasta ekle

app.post("/addNewPatient", (req, res) => {
  const name = req.body.name;
  const tcID = req.body.tcID;
  const phone = req.body.phone;
  const email = req.body.email;
  const gender = req.body.gender;
  const birthdate = req.body.birthdate;
  const adress = req.body.adress;
  const nationality = req.body.nationality;
  const emergencycontact = req.body.emergencycontact;
  const patientnote = req.body.patientnote;
  const reference = req.body.reference;
  const preregisteredpatientID = req.body.preregisteredpatientID;

  console.log("pid", preregisteredpatientID);

  let KH_ID = generateRandomID();
  function generateRandomID() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let ID = "KH";
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      ID += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    function checkID() {
      db.query("SELECT * FROM  clinic.hastalar", (err, result) => {
        result.map((hasta, index) => {
          if (hasta.hasta_unique_id != ID) {
            return true;
          } else
            console.log(
              "Gerçekten tebrikler 2.176.782.336 tane ID arasından nasıl olduysa eşleşen ID buldunuz(hasta)"
            );
          return false;
        });
      });
    }

    function changePreregisteredIdtoPatientId() {
      // On kayit durumunu onayla
      db.query(
        `UPDATE clinic.onkayitlar SET on_kayit_durum = "1" WHERE onkayitlihasta_unique_id = "${preregisteredpatientID}"`,
        (err, result) => {
          if (err) {
            console.log(err);
          } else console.log("Ön kayıt Durumu Onaylanmış olarak güncellendi");
        }
      );
      //On kayitli olan hastanin tedaviplanislem_hasta_unique_id sini Kayitli hasta Id si olarak guncelle
      db.query(
        `UPDATE clinic.tedaviplanislemler SET tedaviplanislem_hasta_unique_id = REPLACE(tedaviplanislem_hasta_unique_id, "${preregisteredpatientID}", "${ID}")`,
        (err, result) => {
          if (err) {
            console.log(
              "On kayitli hastanin IDsini Kayitli hastaya cevirirken hata  oluştu",
              err
            );
          } else console.log("tedaviplanislemler ID degistirildi");
        }
      );

      //On kayitli olan hastanin onkayit_tedaviplanlari_hastaunique_id sini Kayitli hasta Id si olarak guncelle

      db.query(
        `UPDATE clinic.onkayittedaviplanlari SET onkayit_tedaviplanlari_hastaunique_id = REPLACE(onkayit_tedaviplanlari_hastaunique_id, "${preregisteredpatientID}", "${ID}")`,
        (err, result) => {
          if (err) {
            console.log(
              "On kayitli hastanin IDsini Kayitli hastaya cevirirken hata  olustu",
              err
            );
          } else console.log("onkayittedaviplanlari ID degistirildi");
        }
      );
    }
    checkID();
    if (checkID) {
      changePreregisteredIdtoPatientId();
      return ID;
    } else generateRandomID();
  }
  console.log(KH_ID);
  db.query(
    `INSERT INTO clinic.hastalar (hasta_unique_id,hasta_ad_soyad,hasta_kimlik_no,hasta_telefon,hasta_dogum_tarihi,hasta_cinsiyet,hasta_email,hasta_adres,hasta_uyruk,hasta_acil_durum,hasta_not,hasta_referans) VALUES ("${KH_ID}","${name}","${tcID}","${phone}","${birthdate}","${gender}","${email}","${adress}","${nationality}","${emergencycontact}","${patientnote}","${reference}")`,
    (err, response) => {
      if (err) {
        console.log("Yenı Hasta kaydederken hata olustu", err);
      } else res.send("Hasta veritabanına kaydedildi");
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
