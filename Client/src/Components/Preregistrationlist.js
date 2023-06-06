import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Sidebarinfo } from "../App";
import CalendarScheduler from "./CalendarScheduler";

function Appointmentlist() {
  const [preregistration, setpreregistration] = useState([]);
  const { URL } = useContext(Sidebarinfo);
  const { date } = useContext(Sidebarinfo); 
  const { tommorrow } = useContext(Sidebarinfo);
  const { hidesidebar, setHidesidebar } = useContext(Sidebarinfo);
  const [preregistrationstatus, setpreregistrationstatus] = useState(0);
  const [registerstarttime, setregisterstarttime] = useState(date);
  const [registerendtime, setregisterendtime] = useState(tommorrow);
  const [calendarview, setCalendarview] = useState(false);

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
      const result = await Axios.get(`${URL}/GetPreregistrationsList`, {
        params: {
          preregistrationstatus,
          registerendtime,
          registerstarttime,
        },
      });

      setpreregistration(result.data);
    };

    fetchData();
    console.log("timee",registerstarttime)
  }, [preregistrationstatus, registerstarttime, registerendtime, calendarview]);

  async function DeletePreregister(patient) {
    try {
      await Axios.post(`${URL}/DeletePreregister`, {
        patient: patient,
      }).then((res) => {
        alert("Ön Kayıt Silindi");
      });
    } catch (error) {}
  }

  return (
    <div
      className="mainboard"
      style={hidesidebar ? mainboardextend : mainboard}
    >
      <div className="Appointmentlist">
        <div className="AppointmentlistTable">
          <div className="PreregistrationButtons">
            <Link to={`/ÖnKayıtEkle`}>
              <button>
                {" "}
                <h4>Ön Kayıt Ekle</h4>{" "}
              </button>
            </Link>

            <button
              onClick={() => {
                setpreregistrationstatus(0);
              }}
            >
              <h4>Onay Bekleyen Ön Kayıtlar</h4>
            </button>
            <button
              onClick={() => {
                setpreregistrationstatus(1);
              }}
            >
              <h>Onaylanmış Ön Kayıtlar</h>
            </button>
            <button
              onClick={() => {
                setpreregistrationstatus(2);
              }}
            >
              <h4>Onaylanmamış Ön Kayıtlar</h4>
            </button>
            <button
              onClick={() => {
                setCalendarview(!calendarview);
              }}
            >
              <h4>Takvim Görüntüsü</h4>
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
              value={registerendtime}
              required
              onChange={(e) => setregisterendtime(e.target.value)}
            ></input>
          </section>
          {preregistration && (
            <>
              {calendarview ? (
                <CalendarScheduler
                  data={{
                    startDate: registerstarttime,
                    eventlist: preregistration,
                  }}
                ></CalendarScheduler>
              ) : (
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
                    {preregistration.map((registration, index) => {
                      return (
                        <ul className="tableBodylist" key={index}>
                          <li id="tableNumber">{registration.on_kayit_id}</li>
                          <li id="tablePaientID">
                            {registration.onkayitlihasta_unique_id}
                          </li>
                          <li id="tablePaientName">{registration.ad_soyad}</li>
                          <li id="tablePhone">{registration.on_kayit_tel}</li>
                          <li id="tableDoctor">
                            {registration.on_kayit_doktor}
                          </li>
                          <li id="tableCommentItem">
                            {registration.on_kayit_hekim_yorum}
                          </li>
                          <li id="tableDate">{registration.randevu_gun}</li>
                          <li id="tableTime">
                            {registration.baslangic_saati} -{" "}
                            {registration.on_kayit_bitis}
                          </li>
                          <li id="tablebodyActions">
                            <button
                              style={{ backgroundColor: "#505050	" }}
                              onClick={() => {
                                DeletePreregister(
                                  registration.onkayitlihasta_unique_id
                                );
                              }}
                            >
                              <span>
                                <i class="fa fa-trash-o" aria-hidden="true"></i>
                              </span>
                            </button>{" "}
                            <Link
                              key={registration.index}
                              to={`/ÖnKayıtlihasta/${registration.onkayitlihasta_unique_id}`}
                              state={registration}
                            >
                              <button style={{ backgroundColor: "#4B0082" }}>
                                <span>
                                  <i
                                    class="fa fa-sign-out"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                              </button>{" "}
                            </Link>
                          </li>
                        </ul>
                      );
                    })}
                  </section>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Appointmentlist;
