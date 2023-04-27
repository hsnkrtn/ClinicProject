import React, { useEffect } from "react";
import { useContext } from "react";
import { Sidebarinfo } from "../App";
import { useState } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";

function Addpatient() {
  const mainboardextend = {
    backgroundColor: "#CCE2FF",
    marginLeft: 75,
    flex: 1,
  };
  const mainboard = {
    backgroundColor: "#CCE2FF",
    marginLeft: 250,
    flex: 1,
  };

  const themecolor = {
    color: "#0f238c",
  };
  const localation = useLocation();

  const { hidesidebar, setHidesidebar } = useContext(Sidebarinfo);
  const { URL } = useContext(Sidebarinfo);
  const [name, setName] = useState("");
  const [tcID, setTcID] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [adress, setAdress] = useState("");
  const [nationality, setNationality] = useState("");
  const [emergencycontact, setEmergencycontact] = useState("");
  const [patientnote, setPatientnote] = useState("");
  const [reference, setReference] = useState("");
  const [preregisteredpatientID, setPreregisteredpatientID] = useState("");

  useEffect(() => {
    setPreregisteredpatientID(localation.state ? localation.state : "");
    console.log("OKH", localation.state);
  }, []);

  async function postData() {
    try {
      await Axios.post(`${URL}/addNewPatient`, {
        name: name,
        tcID: tcID,
        phone: phone,
        email: email,
        birthdate: birthdate,
        gender: gender,
        adress: adress,
        nationality: nationality,
        emergencycontact: emergencycontact,
        patientnote: patientnote,
        reference: reference,
        preregisteredpatientID: preregisteredpatientID,
      }).then((res) => {
        alert("Hasta eklendi");
        console.log(res);
        document.getElementById("addAppointmentForm").reset();
      });
    } catch (error) {}
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
  };
  return (
    <div
      className="mainboard"
      style={hidesidebar ? mainboardextend : mainboard}
    >
      <div className="Appointment">
        {" "}
        <div className="Appointment-header" style={themecolor}>
          {" "}
          <span>
            <i class="fa fa-calendar-plus-o" aria-hidden="true"></i>
          </span>
          <h1>Hasta Ekle</h1>{" "}
        </div>{" "}
        <div className="AppointmentForm">
          <form id="addAppointmentForm" onSubmit={handleSubmit}>
            <section>
              {" "}
              <label for="fname">
                <h4>İsim Soyisim * :</h4>
              </label>
              <input
                type="text"
                id="appointmenttext"
                name="fname"
                placeholder="İsim Soyisim"
                onChange={(e) => setName(e.target.value)}
                required
              ></input>{" "}
            </section>
            <section>
              {" "}
              <label for="fname">
                <h4>TC Kimlik No * :</h4>
              </label>
              <input
                type="text"
                id="appointmenttext"
                name="fname"
                placeholder="TC Kimlik No"
                required
                onChange={(e) => setTcID(e.target.value)}
              ></input>{" "}
            </section>
            <section>
              <label for="phone">
                <h4> Telefon Numarası * :</h4>
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
              {" "}
              <label for="fname">
                <h4>E-mail Adresi * :</h4>
              </label>
              <input
                type="email"
                id="appointmenttext"
                name="fname"
                placeholder="Email Adresi"
                required
                onChange={(e) => setEmail(e.target.value)}
              ></input>{" "}
            </section>
            <section>
              <label>
                <h4>Doğum Tarihi * :</h4>
              </label>

              <input
                type="date"
                id="meeting-date"
                min="1900-01-01"
                max="2099-12-31"
                required
                onChange={(e) => setBirthdate(e.target.value)}
              ></input>
            </section>
            <section>
              {" "}
              <label for="fname">
                <h4>Adres * :</h4>
              </label>
              <input
                type="text"
                id="appointmenttext"
                name="fname"
                placeholder="Adres"
                onChange={(e) => setAdress(e.target.value)}
              ></input>{" "}
            </section>
            <section>
              {" "}
              <label for="fname">
                <h4>Cinsiyet : </h4>
              </label>
              <select id="doctors" onChange={(e) => setGender(e.target.value)}>
                <option value="-"> - </option>
                <option value="Erkek">Erkek</option>
                <option value="Kadın">Kadın</option>
              </select>
            </section>
            <section>
              {" "}
              <label for="fname">
                <h4>Uyruk : </h4>
              </label>
              <input
                type="text"
                id="appointmenttext"
                name="fname"
                placeholder="Uyruk"
                onChange={(e) => setNationality(e.target.value)}
              ></input>{" "}
            </section>
            <section>
              <label for="phone">
                <h4> Acil Durum * :</h4>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="0555-555-5555"
                required
                onChange={(e) => setEmergencycontact(e.target.value)}
              ></input>
            </section>
            <section>
              {" "}
              <label for="fname">
                <h4>Hasta Notu</h4>
              </label>
              <input
                type="text"
                id="appointmenttext"
                name="fname"
                placeholder="Hasta Notu"
                onChange={(e) => setPatientnote(e.target.value)}
              ></input>{" "}
            </section>
            <section>
              {" "}
              <label for="fname">
                <h4>Referans :</h4>
              </label>
              <input
                type="text"
                id="appointmenttext"
                name="fname"
                placeholder="Referans"
                onChange={(e) => setReference(e.target.value)}
              ></input>{" "}
            </section>{" "}
            <section className="SaveOrCancel">
              {" "}
              <label>
                <h4> Kaydet / Vazgeç</h4>
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
                <button id="savebutton" type="submit">
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

export default Addpatient;
