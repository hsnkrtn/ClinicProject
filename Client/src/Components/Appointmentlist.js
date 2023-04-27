import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Sidebarinfo } from "../App";

function Appointmentlist() {
  const [AppointmentList, setAppointmentList] = useState([]);
  const { URL } = useContext(Sidebarinfo);
  const { hidesidebar, setHidesidebar } = useContext(Sidebarinfo);

  const mainboardextend = {
    marginLeft: 75,
    top: 50,
    flex: 1,
  };
  const mainboard = {
    marginLeft: 250,
    top: 50,
    flex: 1,
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get(`${URL}/GetAppointmentList`);
      setAppointmentList(result.data);
    };

    fetchData();
    console.log(AppointmentList);
  }, []);

  return (
    <div
      className="mainboard"
      style={hidesidebar ? mainboardextend : mainboard}
    >
      <div className="Appointmentlist">
        <div className="AppointmentlistTable">
          <div className="PreregistrationButtons">
            <Link to={`/RandevuEkle`}>
              {" "}
              <button>
                <h4>Randevu Ekle</h4>
              </button>
            </Link>
          </div>
          {AppointmentList && (
            <div className="AppointmentTable">
              <section className="tableHead">
                <ul className="tableHeadlist">
                  <li id="tableNumber">#</li>
                  <li id="tablePaientID">Hasta ID</li>
                  <li id="tablePaientName">Hasta Adı</li>
                  <li id="tablePhone">Telefon</li>
                  <li id="tableDoctor">Doktor</li>
                  <li id="tableComment">Yapılacak İşlem</li>
                  <li id="tableDate">Tarih</li>
                  <li id="tableTime">Saat</li>
                  <li id="tableActions">Randevu İşlemleri</li>
                </ul>
              </section>
              <section className="tableBody">
                {AppointmentList.map((Appointment, index) => {
                  return (
                    <ul className="tableBodylist">
                      <li id="tableNumber">{Appointment.randevu_id}</li>
                      <li id="tablePaientID">{Appointment.hasta_unique_id}</li>
                      <li id="tablePaientName">
                        {Appointment.randevu_adi_soyadi}
                      </li>
                      <li id="tablePhone">{Appointment.randevu_hasta_tel}</li>
                      <li id="tableDoctor">{Appointment.randevu_doktor}</li>
                      <li id="tableCommentItem">
                        {Appointment.randevu_yapilacak_islem}
                      </li>
                      <li id="tableDate">{Appointment.randevu_gun}</li>
                      <li id="tableTime">
                        {Appointment.randevu_baslangic} -{" "}
                        {Appointment.randevu_bitis}
                      </li>
                      <li id="tableActions">
                        {" "}
                        <button>h</button>
                        <button>h</button>
                        <button>h</button>{" "}
                      </li>
                    </ul>
                  );
                })}
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Appointmentlist;
