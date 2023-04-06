import React, { useState } from "react";
import { useContext } from "react";
import { Sidebarinfo } from "../App";

function Appointment() {
  const mainboardextend = {
    height: "35%",
    backgroundColor: "#f1f3f6",
    marginLeft: 50,
    height: "100%",
    top: 50,
  };
  const mainboard = {
    height: "35%",
    backgroundColor: "#f1f3f6",
    marginLeft: 250,
    top: 50,
    height: "100%",
  };
  const themecolor = {
    color: "#0f238c",
  };
  const { hidesidebar, setHidesidebar } = useContext(Sidebarinfo);
  const [registeredpatient, setRegisteredpatient] = useState(false);
  const [name, setName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [phone, setPhone] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [comment, setComment] = useState("");
  const [reference, setReference] = useState("");
  const [sendSMS, setSendSMS] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(doctor);
    console.log(phone);
    console.log(dateTime);
    console.log(comment);
    console.log(sendSMS);
  };
  return (
    <div
      className="mainboard"
      style={hidesidebar ? mainboardextend : mainboard}
    >
      <div className="Appointment">
        <div className="Appointment-header" style={themecolor}>
          {" "}
          {registeredpatient ? (
            <>
              {" "}
              <span>
                <i class="fa fa-calendar-plus-o" aria-hidden="true"></i>
              </span>
              <h1>Randevu Ekle</h1>{" "}
            </>
          ) : (
            <>
              <span>
                <i class="fa fa-calendar-plus-o" aria-hidden="true"></i>
              </span>
              <h1>Ön Kayıt Ekle</h1>
            </>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          {" "}
          <section>
            <label>
              <h4>Kayıtlı Hasta</h4>
            </label>
            <div class="toggleWrapper">
              <input
                type="checkbox"
                id="patientswitch"
                onChange={(e) => setRegisteredpatient(!registeredpatient)}
              />
              <label id="switchlabel" for="patientswitch"></label>
            </div>
          </section>
          {registeredpatient ? (
            <section>
              {" "}
              <label for="fname">
                <h4>Hasta Bul</h4>
              </label>
              <input
                type="text"
                id="appointmenttext"
                name="fname"
                placeholder="Hasta Bul"
                required
              ></input>{" "}
            </section>
          ) : (
            <></>
          )}
          <section>
            {" "}
            <label for="fname">
              <h4>İsim Soyisim *</h4>
            </label>
            <input
              type="text"
              id="appointmenttext"
              name="fname"
              placeholder="İsim Soyisim"
              required
              onChange={(e) => setName(e.target.value)}
            ></input>{" "}
          </section>
          <section>
            {" "}
            <label for="fname">
              <h4>Doktor *</h4>
            </label>
            <select id="doctors" onChange={(e) => setDoctor(e.target.value)}>
              <option value="Kadir">Kadir</option>
              <option value="Hasan">Hasan</option>
              <option value="Enes">Enes</option>
              <option value="Muhammed">Muhammed</option>
            </select>
          </section>
          <section>
            <label for="phone">
              <h4> Telefon Numarası</h4>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="0555-555-5555"
              required
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          </section>
          <section>
            <label>
              <h4>Tarih ve Saat *</h4>
            </label>

            <input
              type="datetime-local"
              id="meeting-date"
              min="2018-01-01"
              max="2099-12-31"
              required
              onChange={(e) => setDateTime(e.target.value)}
            ></input>
          </section>
          <section>
            {" "}
            <label for="fname">
              {registeredpatient ? (
                <h4> Yapılacak İşlem </h4>
              ) : (
                <h4>Açıklama</h4>
              )}
            </label>
            <textarea
              type="textarea"
              id="appointmentproblemtext"
              name="fname"
              placeholder="Açıklama"
              onChange={(e) => setComment(e.target.value)}
            ></textarea>{" "}
          </section>
          {!registeredpatient ? (
            <section>
              {" "}
              <label for="fname">
                <h4>Referans</h4>
              </label>
              <input
                type="text"
                id="appointmenttext"
                name="fname"
                placeholder="Referans"
                onChange={(e) => setReference(e.target.value)}
              ></input>{" "}
            </section>
          ) : (
            <></>
          )}
          <section>
            <label>
              <h4>SMS Gönder</h4>
            </label>
            <div class="toggleWrapper">
              <input
                type="checkbox"
                id="switch"
                onChange={(e) => setSendSMS(!sendSMS)}
              />
              <label id="switchlabel" for="switch"></label>
            </div>
          </section>
          <section className="SaveOrCancel">
            {" "}
            <label>
              <h4> Randevuyu Kaydet</h4>
            </label>
            <div className="SaveOrCancelButtons">
              {" "}
              <button id="cancelbutton">Vazgeç</button>
              <button id="savebutton" type="submit">
                Kaydet
              </button>
            </div>
          </section>
        </form>

        <></>
      </div>
    </div>
  );
}

export default Appointment;
