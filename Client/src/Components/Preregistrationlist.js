import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Sidebarinfo } from "../App";

function Appointmentlist() {
  const [preregisrtration, setpreregisrtration] = useState([]);
  const { URL } = useContext(Sidebarinfo);
  const { hidesidebar, setHidesidebar } = useContext(Sidebarinfo);

  const mainboardextend = {
    backgroundColor: "#CCE2FF",
    marginLeft: 75,
    top: 50,
    flex: 1,
  };
  const mainboard = {
    backgroundColor: "#CCE2FF",
    marginLeft: 250,
    top: 50,
    flex: 1,
  };

  useEffect(() => {
    console.log(URL);
    window.scrollTo(0, 0);
    Axios.get(`${URL}/GetPreregistrationsList`).then((reponse) =>
      setpreregisrtration(reponse.data)
    );
    console.log(preregisrtration);
  }, []);

  return (
    <div
      className="mainboard"
      style={hidesidebar ? mainboardextend : mainboard}
    >
      <div className="Appointmentlist">
        <div className="AppointmentTable">
          <section className="tableHead">
            <ul className="tableHeadlist">
              <li id="tableNumber">#</li>
              <li id="tablePaientName">Hasta Adı</li>
              <li id="tablePhone">Telefon</li>
              <li id="tableDoctor">Doktor</li>
              <li id="tableComment">Hekim Yorumu</li>
              <li id="tableDate">Tarih</li>
              <li id="tableTime">Saat</li>
              <li id="tableActions">Randevu İşlemleri</li>
            </ul>
          </section>
          <section className="tableBody">
            <ul className="tableBodylist">
              <li id="tableNumber">#</li>
              <li id="tablePaientName">Enes Yagiz Dogan</li>
              <li id="tablePhone">+901231231212</li>
              <li id="tableDoctor">Abdulkadir Yasar</li>
              <li id="tableCommentItem">
                Yapilacak islemeler burada bu sekilde olacak Yapilacak islemeler
                burada bu sekilde olacak Yapilacak islemeler burada bu sekilde
                olacak Yapilacak islemeler burada bu sekilde olacak
              </li>
              <li id="tableDate">2023-12-12</li>
              <li id="tableTime">12:30 - 13:30</li>
              <li id="tableActions">
                {" "}
                <button>h</button>
                <button>h</button>
                <button>h</button>{" "}
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Appointmentlist;
