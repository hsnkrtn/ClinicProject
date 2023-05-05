import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import App, { Sidebarinfo } from "../App";

function Appointmentlist() {
  const [AppointmentList, setAppointmentList] = useState([]);
  const [pageupdated, setPageupdated] = useState(false);

  const { URL } = useContext(Sidebarinfo);
  const { date } = useContext(Sidebarinfo);
  const { tommorrow } = useContext(Sidebarinfo);
  const { hidesidebar, setHidesidebar } = useContext(Sidebarinfo);
  const [selectedappointmentstartday, setSelectedappointmentstartday] =
    useState(date);
  const [selectedappointmentsendday, setSelectedappointmentendday] =
    useState(tommorrow);
  const [appointmentstatus, setAppointmentstatus] = useState(0);
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
      const result = await Axios.get(`${URL}/GetAppointmentList`, {
        params: {
          selectedappointmentstartday,
          selectedappointmentsendday,
          appointmentstatus,
        },
      });
      setAppointmentList(result.data);
    };

    fetchData();
    console.log(AppointmentList);
  }, [
    appointmentstatus,
    selectedappointmentstartday,
    selectedappointmentsendday,
    pageupdated,
  ]);

  function deleteAppointment(patient, appointmentID) {
    Axios.post(`${URL}/deleteAppointment`, {
      patient: patient,
      appointmentID: appointmentID,
    }).then((res) => {
      alert("Randevu Silindi");
      setPageupdated(!pageupdated);
    });
  }

  // Randevu durumunu günceller 0 yeni randevu, 1 tamamlanmış randevu, 2 Tamamlanmamış randevu

  function updateAppointmentstatus(patient, appointmentID, appointmentStatus) {
    Axios.post(`${URL}/updateAppointmentstatus`, {
      patient: patient,
      appointmentID: appointmentID,
      appointmentStatus: appointmentStatus,
    }).then((res) => {
      alert("Randevu Durumu Güncellendi");
      setPageupdated(!pageupdated);
    });
  }

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
            <button
              onClick={() => {
                setAppointmentstatus(0);
              }}
            >
              {" "}
              <h4> Yeni Randevular </h4>
            </button>
            <button
              onClick={() => {
                setAppointmentstatus(1);
              }}
            >
              <h4>Tamamlanan Randevular</h4>
            </button>
            <button
              onClick={() => {
                setAppointmentstatus(2);
              }}
            >
              <h4>Tamamlanmayan Randevular</h4>
            </button>
          </div>{" "}
          <section className="registrationTimepicker">
            {selectedappointmentsendday && (
              <input
                type="date"
                id="registrationTimePicker"
                min="2018-01-01"
                max="2099-12-31"
                value={selectedappointmentstartday}
                required
                onChange={(e) => setSelectedappointmentstartday(e.target.value)}
              ></input>
            )}
            -{" "}
            <input
              type="date"
              id="registrationTimePicker"
              min="2018-01-01"
              max="2099-12-31"
              value={selectedappointmentsendday}
              required
              onChange={(e) => setSelectedappointmentendday(e.target.value)}
            ></input>
          </section>
          {AppointmentList && (
            <div className="AppointmentTable">
              {" "}
              <section className="tableHead">
                <ul className="tableHeadlist">
                  <li id="tableNumber">#</li>
                  <li id="tablePaientID">Hasta ID</li>
                  <li id="tablePaientName">Hasta Adı</li>
                  <li id="tablePhone">Telefon</li>
                  <li id="tableDoctor">Hekim</li>
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
                      <li id="tableActionsButtons">
                        {" "}
                        {appointmentstatus !== 1 ? (
                          <button
                            onClick={() => {
                              updateAppointmentstatus(
                                Appointment.hasta_unique_id,
                                Appointment.randevu_unique_id,
                                1
                              );
                            }}
                          >
                            <span>
                              <i class="fas fa-user-check"></i>
                            </span>
                          </button>
                        ) : (
                          <></>
                        )}
                        {appointmentstatus !== 2 ? (
                          <button
                            onClick={() => {
                              updateAppointmentstatus(
                                Appointment.hasta_unique_id,
                                Appointment.randevu_unique_id,
                                2
                              );
                            }}
                          >
                            <span>
                              <i class="fas fa-user-times"></i>
                            </span>
                          </button>
                        ) : (
                          <></>
                        )}
                        <button
                          onClick={() => {
                            deleteAppointment(
                              Appointment.hasta_unique_id,
                              Appointment.randevu_unique_id
                            );
                          }}
                        >
                          {" "}
                          <span> 
                            <i class="fa fa-trash-o" aria-hidden="true"></i>
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
