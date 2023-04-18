import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Sidebarinfo } from "../App";

function Appointmentlist() {
  const [preregisrtration, setpreregisrtration] = useState([]);
  const { URL } = useContext(Sidebarinfo);
  const { date } = useContext(Sidebarinfo);
  const { hidesidebar, setHidesidebar } = useContext(Sidebarinfo);
  const [preregisrtrationstatus, setpreregisrtrationstatus] = useState(0);
  const [registerstarttime, setregisterstarttime] = useState(date);
  const [registerendtime, setregisterendtime] = useState("2100-04-03");

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
    console.log("bugunun tarihi", registerstarttime);
    const fetchData = async () => {
      const result = await Axios.get(`${URL}/GetPreregistrationsList`, {
        params: {
          preregisrtrationstatus,
          registerendtime,
          registerstarttime,
        },
      });
      setpreregisrtration(result.data);
    };

    fetchData();
  }, [preregisrtrationstatus, registerendtime]);

  async function updatestatus(status, patient) {
    try {
      await Axios.post(`${URL}/updateregisterstatus`, {
        patient: patient,
        status: status,
      }).then((res) => {
        alert("Ön Kayıt Güncellendi");
      });
    } catch (error) {
      console.error(error);
    }
  }
  async function DeletePreregister(patient) {
    try {
      await Axios.post(`${URL}/DeletePreregister`, {
        patient: patient,
      }).then((res) => {
        alert("Ön Kayıt Silindi");
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
      <div className="Appointmentlist">
        <div className="AppointmentlistTable">
          <div className="PreregistrationButtons">
            <button
              onClick={() => {
                setpreregisrtrationstatus(0);
              }}
            >
              <h4>Yeni Ön Kayıtlar</h4>
            </button>
            <button
              onClick={() => {
                setpreregisrtrationstatus(1);
              }}
            >
              <h4>Onay Bekleyen Ön Kayıtlar</h4>
            </button>
            <button
              onClick={() => {
                setpreregisrtrationstatus(2);
              }}
            >
              <h>Onaylanmış Ön Kayıtlar</h>
            </button>
            <button
              onClick={() => {
                setpreregisrtrationstatus(3);
              }}
            >
              <h4>Onaylanmamış Ön Kayıtlar</h4>
            </button>
          </div>
          <section className="registrationTimepicker">
            {registerstarttime && (
              <input
                type="date"
                id="registrationTimePicker"
                min="2018-01-01"
                max="2099-12-31"
                value={registerstarttime}
                required
                onChange={(e) => setregisterstarttime(e.target.value)}
              ></input>
            )}
            -{" "}
            <input
              type="date"
              id="registrationTimePicker"
              min="2018-01-01"
              max="2099-12-31"
              required
              onChange={(e) => setregisterendtime(e.target.value)}
            ></input>
          </section>
          {preregisrtration && (
            <div className="AppointmentTable">
              <section className="tableHead">
                <ul className="tableHeadlist">
                  <li id="tableNumber">#</li>
                  <li id="tablePaientID">Ön Kayıt ID</li>
                  <li id="tablePaientName">Hasta Adı</li>
                  <li id="tablePhone">Telefon</li>
                  <li id="tableDoctor">Hekim</li>
                  <li id="tableComment">Hekim Yorumu</li>
                  <li id="tableDate">Tarih</li>
                  <li id="tableTime">Saat</li>
                  <li id="tableActions">İşlemler</li>
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
                      <li id="tablebodyActions">
                        {" "}
                        <button
                          style={{ backgroundColor: "green" }}
                          onClick={() => {
                            updatestatus(
                              2,
                              preregisrtration.onkayitlihasta_unique_id
                            );
                          }}
                        >
                          <span>
                            <i class="fa-solid fa-check"></i>
                          </span>
                        </button>
                        <button
                          style={{ backgroundColor: "red" }}
                          onClick={() => {
                            updatestatus(
                              3,
                              preregisrtration.onkayitlihasta_unique_id
                            );
                          }}
                        >
                          {" "}
                          <span>
                            {" "}
                            <i class="fa-solid fa-xmark"></i>
                          </span>
                        </button>{" "}
                        <button
                          style={{ backgroundColor: "gray" }}
                          onClick={() => {
                            updatestatus(
                              1,
                              preregisrtration.onkayitlihasta_unique_id
                            );
                          }}
                        >
                          <span>
                            <i class="fa-regular fa-hourglass-half"></i>
                          </span>
                        </button>
                        <button
                          style={{ backgroundColor: "#505050	" }}
                          onClick={() => {
                            DeletePreregister(
                              preregisrtration.onkayitlihasta_unique_id
                            );
                          }}
                        >
                          <span>
                            <i class="fa-regular fa-trash-can"></i>
                          </span>
                        </button>{" "}
                        <button style={{ backgroundColor: "#4B0082	" }}>
                          <span>
                            <i class="fa-solid fa-right-to-bracket"></i>{" "}
                          </span>
                        </button>
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
