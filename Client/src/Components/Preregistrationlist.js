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
    const fetchData = async () => {
      const result = await Axios.get(`${URL}/GetPreregistrationsList`);
      setpreregisrtration(result.data);
    };

    fetchData();
  }, []);

  return (
    <div
      className="mainboard"
      style={hidesidebar ? mainboardextend : mainboard}
    >
      <div className="Appointmentlist">
        <div className="AppointmentlistTable">
          {preregisrtration && (
            <div className="AppointmentTable">
              <section className="tableHead">
                <ul className="tableHeadlist">
                  <li id="tableNumber">#</li>
                  <li id="tablePaientID">Ön Kayıt ID</li>
                  <li id="tablePaientName">Hasta Adı</li>
                  <li id="tablePhone">Telefon</li>
                  <li id="tableDoctor">Doktor</li>
                  <li id="tableComment">Açıklama</li>
                  <li id="tableDate">Tarih</li>
                  <li id="tableTime">Saat</li>
                  <li id="tableActions">Ön Kayıt İşlemleri</li>
                </ul>
              </section>
              <section className="tableBody">
                {preregisrtration.map((preregisrtration, index) => {
                  return (
                    <ul className="tableBodylist">
                      <li id="tableNumber">{preregisrtration.on_kayit_id}</li>
                      <li id="tablePaientID">
                        {preregisrtration.onkayitlihasta_unique_id}
                      </li>
                      <li id="tablePaientName">
                        {preregisrtration.on_kayit_adi_soyadi}
                      </li>
                      <li id="tablePhone">{preregisrtration.on_kayit_tel}</li>
                      <li id="tableDoctor">
                        {preregisrtration.on_kayit_doktor}
                      </li>
                      <li id="tableCommentItem">
                        {preregisrtration.on_kayit_hekim_yorum}
                      </li>
                      <li id="tableDate">
                        {preregisrtration.on_kayit_randevugun}
                      </li>
                      <li id="tableTime">
                        {preregisrtration.on_kayit_baslangic} -{" "}
                        {preregisrtration.on_kayit_bitis}
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
