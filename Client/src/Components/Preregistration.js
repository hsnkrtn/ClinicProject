import React, { useState } from "react";
import { useContext } from "react";
import { Sidebarinfo } from "../App";
import { URL } from "../App";
import Axios from "axios";

function Preregistration() {
  const mainboardextend = {
    backgroundColor: "#f1f3f6",
    marginLeft: 75,
  };
  const mainboard = {
    backgroundColor: "#f1f3f6",
    marginLeft: 250,
  };
  const themecolor = {
    color: "#0f238c",
  };

  const { hidesidebar, setHidesidebar } = useContext(Sidebarinfo);
  const { URL } = useContext(Sidebarinfo);
  const [name, setName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [starttime, setStarttime] = useState("");
  const [endtime, setEndtime] = useState("");
  const [comment, setComment] = useState("");
  const [reference, setReference] = useState("");
  const [sendSMS, setSendSMS] = useState(false);
  const [sendemail, setSendemail] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(doctor);
    console.log(phone);
    console.log(email);
    console.log(date);
    console.log(starttime);
    console.log(endtime);
    console.log(comment);
    console.log("sms", sendSMS);
    console.log("mail", sendemail);
    postData();
  };
  async function postData() {
    try {
      await Axios.post(`${URL}/addNewregistration`, {
        name: name,
        phone: phone,
        email: email,
        doctor: doctor,
        comment: comment,
        reference: reference,
        date: date,
        starttime: starttime,
        endtime: endtime,
      }).then((res) => {
        alert("Ön Kayıt Oluşturuldu");
        console.log(res);
        document.getElementById("addAppointmentForm").reset();
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className="mainboard"
      style={hidesidebar ? mainboardextend : mainboard}
    >
      <div className="Appointment">
        <div className="Appointment-header" style={themecolor}>
          {" "}
          <span>
            <i class="fa fa-calendar-plus-o" aria-hidden="true"></i>
          </span>
          <h1>Ön Kayıt Ekle</h1>{" "}
        </div>
        <div className="AppointmentForm">
          <form id="addAppointmentForm">
            {" "}
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
              <label>
                <h4>Tarih ve Saat *</h4>
              </label>

              <input
                type="date"
                id="meeting-date"
                min="2018-01-01"
                max="2099-12-31"
                required
                onChange={(e) => setDate(e.target.value)}
              ></input>

              <input
                type="time"
                id="meeting-time"
                required
                onChange={(e) => setStarttime(e.target.value)}
              ></input>

              <input
                type="time"
                id="meeting-time"
                required
                onChange={(e) => setEndtime(e.target.value)}
              ></input>
            </section>
            <section>
              {" "}
              <label for="fname">
                <h4>Açıklama</h4>
              </label>
              <textarea
                type="textarea"
                id="appointmentproblemtext"
                name="fname"
                placeholder="Açıklama"
                onChange={(e) => setComment(e.target.value)}
              ></textarea>{" "}
            </section>
            <section>
              {" "}
              <label for="fname">
                <h4>Referans </h4>
              </label>
              <input
                type="text"
                id="appointmenttext"
                name="fname"
                placeholder="Referans"
                required
                onChange={(e) => setReference(e.target.value)}
              ></input>{" "}
            </section>
            <section>
              <label>
                <h4>SMS Gönder</h4>
              </label>
              <div class="toggleWrapper">
                <input
                  type="checkbox"
                  id="smsswitch"
                  onChange={(e) => setSendSMS(!sendSMS)}
                />
                <label id="switchlabel" for="smsswitch"></label>
              </div>
            </section>
            {sendSMS ? (
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                ></input>
              </section>
            ) : (
              <></>
            )}
            <section>
              <label>
                <h4>Email Gönder</h4>
              </label>
              <div class="toggleWrapper">
                <input
                  type="checkbox"
                  id="mailswitch"
                  onChange={(e) => setSendemail(!sendemail)}
                />
                <label id="switchlabel" for="mailswitch"></label>
              </div>
            </section>
            {sendemail ? (
              <section>
                {" "}
                <label for="fname">
                  <h4>E-mail Adresi</h4>
                </label>
                <input
                  type="email"
                  value={email}
                  id="appointmenttext"
                  name="fname"
                  placeholder="Email Adresi"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                ></input>{" "}
              </section>
            ) : (
              <></>
            )}
            <section className="SaveOrCancel">
              {" "}
              <label>
                <h4> Kaydet</h4>
              </label>
              <div className="SaveOrCancelButtons">
                {" "}
                <button
                  id="cancelbutton"
                  onClick={() => {
                    document.getElementById("addAppointmentForm").reset();
                  }}
                >
                  Vazgeç
                </button>
                <button id="savebutton" onClick={handleSubmit}>
                  Kaydet
                </button>
              </div>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Preregistration;
