import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { Sidebarinfo } from "../App";

function Preregistratedpatient() {
  const mainboardextend = {
    height: "35%",
    backgroundColor: "#CCE2FF",
    marginLeft: 50,
    top: 50,
    flex: 1,
  };
  const mainboard = {
    height: "35%",
    backgroundColor: "#CCE2FF",
    marginLeft: 250,
    top: 50,
    flex: 1,
  };

  const { hidesidebar, setHidesidebar } = useContext(Sidebarinfo);
  const localation = useLocation();
  const patientinformation = localation.state.onkayitlihasta_unique_id;
  const { URL } = useContext(Sidebarinfo);

  const [patienttreatment, setPatienttreatment] = useState([]);
  const [patienttreatmentoperations, setPatienttreatmentoperations] = useState(
    []
  );
  const [showConfirmationbox, setShowConfirmationbox] = useState(false);
  const [registrationlaststatus, setRegistrationlaststatus] = useState("");
  const [confirmationstatus, setConfirmationstatus] = useState(false);

  useEffect(() => {
    console.log(patientinformation);

    getTreatment();
    getTreatmentoperations();
    console.log("tedaviplani2", patienttreatment);

    console.log("tedaviplaniislem2", patienttreatmentoperations);
  }, [registrationlaststatus]);

  // Hasta tedavi ID si al

  const getTreatment = async () => {
    const result = await Axios.get(`${URL}/getPatientTreatment`, {
      params: {
        patientinformation,
      },
    });
    setPatienttreatment(result.data);
    console.log("tedaviplani", patienttreatment);
  };

  // Hasta tedavi islemlerini al

  const getTreatmentoperations = async () => {
    console.log("pi", patientinformation);
    const result = await Axios.get(`${URL}/getPatientTreatmentOperations`, {
      params: {
        patientinformation,
      },
    });
    setPatienttreatmentoperations(result.data);
  };
  // status 2 onaylanlanmış, 3 onaylanmamış ,1 onay bekliyor , 0 yeni kayıt

  function updatestatus(status, patient) {
    console.log(status, patient);

    Axios.post(`${URL}/updateregisterstatus`, {
      patient: patient,
      status: status,
    }).then((res) => {
      alert("Ön Kayıt Durumu Güncellendi");
    });
  }

  return (
    <div
      className="mainboard"
      style={hidesidebar ? mainboardextend : mainboard}
    >
      {patienttreatment && (
        <div className="tedaviplanlari">
          <button>Tedavi Plani ekle</button>
          <ul className="tedaviplani">
            {patienttreatment.map((patient, index) => {
              return (
                <li>
                  <section>
                    {" "}
                    <h5>
                      Ön kayıtlı hasta ID:
                      {patient.onkayit_tedaviplanlari_hastaunique_id}
                    </h5>
                    <h5>
                      Tedavi ID:
                      {patient.onkayit_tedaviplanlari_tedaviplaniunique_id}
                    </h5>{" "}
                    <button
                      style={{ backgroundColor: "green" }}
                      onClick={() => {
                        updatestatus(2, patientinformation);
                      }}
                    >
                      <span>
                        <i class="fa fa-check" aria-hidden="true"></i>
                      </span>
                    </button>
                    <button
                      style={{ backgroundColor: "red" }}
                      onClick={() => {
                        updatestatus(3, patientinformation);
                      }}
                    >
                      <span>
                        <i class="fa fa-times" aria-hidden="true"></i>
                      </span>
                    </button>
                    <button
                      style={{ backgroundColor: "gray" }}
                      onClick={() => {
                        updatestatus(1, localation.onkayitlihasta_unique_id);
                      }}
                    >
                      <span>
                        <i class="fa fa-hourglass-half" aria-hidden="true"></i>
                      </span>
                    </button>
                  </section>

                  {patienttreatmentoperations && (
                    <ul>
                      {patienttreatmentoperations
                        .filter(
                          (operation) =>
                            operation.tedaviplanislem_tedavi_plani ===
                            patient.onkayit_tedaviplanlari_tedaviplaniunique_id
                        )
                        .map((patienttreatmentoperation, operationindex) => {
                          return (
                            <li key={operationindex}>
                              <h5>
                                {" "}
                                hasan
                                {
                                  patienttreatmentoperation.tedaviplanislem_hasta_unique_id
                                }{" "}
                              </h5>
                              <h5>
                                {
                                  patienttreatmentoperation.tedaviplanislem_islem_adi
                                }{" "}
                              </h5>
                              <h5>
                                {
                                  patienttreatmentoperation.tedaviplanislem_tedavi_plani
                                }{" "}
                              </h5>
                              <h5>
                                {
                                  patienttreatmentoperation.tedaviplanislem_fiyat
                                }{" "}
                              </h5>
                            </li>
                          );
                        })}
                    </ul>
                  )}
                </li>
              );
            })}{" "}
          </ul>
          {/* 
      {showConfirmationbox && (
        <div className="confirmationbox">
          <button
            onClick={() => {
              setConfirmationstatus(true);
              setShowConfirmationbox(false);
            }}
          >
            Onayla
          </button>
          <button
            onClick={() => {
              setConfirmationstatus(false);
              setShowConfirmationbox(false);
            }}
          >
            Vazgeç
          </button>
        </div>
      )} */}
        </div>
      )}
    </div>
  );
}

export default Preregistratedpatient;
