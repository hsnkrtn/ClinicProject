import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { Sidebarinfo } from "../App";

function Preregistratedpatient() {
  const mainboardextend = {
    backgroundColor: "#CCE2FF",
    marginLeft: 75,
    top: 50,
  };
  const mainboard = {
    backgroundColor: "#CCE2FF",
    marginLeft: 250,
    top: 50,
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
  const [treatmentstatus, setTreatmentstatus] = useState(0);
  const [confirmationstatus, setConfirmationstatus] = useState(false);

  useEffect(() => {
    console.log("L", localation.state);

    getTreatment();
    getTreatmentoperations();
    console.log("tedaviplani2", patienttreatment);

    console.log("tedaviplaniislem2", patienttreatmentoperations);
  }, [registrationlaststatus, treatmentstatus]);

  // Hasta tedavi ID si al

  const getTreatment = async () => {
    const result = await Axios.get(`${URL}/getPatientTreatment`, {
      params: {
        patientinformation,
        treatmentstatus,
      },
    });
    setPatienttreatment(result.data);
    console.log("tedaviplani", patienttreatment);
  };

  // Hasta tedavi islemlerini al. Her tedavi için ayrı ayrı filtrele

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

  function updatesTreatmenttatus(status, treatment) {
    console.log(status, treatment);

    Axios.post(`${URL}/updatetreatmentstatus`, {
      treatment: treatment,
      status: status,
    }).then((res) => {
      alert("Tedavi Planı Durumu Güncellendi");
    });
  }
  // Tedavi planını sil
  function deleteTreatment(status, treatment) {
    console.log(status, treatment);

    Axios.post(`${URL}/deleteTreatment`, {
      treatment: treatment,
      status: status,
    }).then((res) => {
      alert("Tedavi Planı Durumu Güncellendi");
    });
  }

  return (
    <div
      className="mainboard"
      style={hidesidebar ? mainboardextend : mainboard}
    >
      {patienttreatment && (
        <div className="tedaviplanlari">
          <div className="PreregistrationButtons">
            <button className="addTreatment">Tedavi Plani ekle</button>

            <button
              onClick={() => {
                setTreatmentstatus(1);
              }}
            >
              <h4>Onay Bekleyen Tedaviler</h4>
            </button>
            <button
              onClick={() => {
                setTreatmentstatus(2);
              }}
            >
              <h>Onaylanmış Tedaviler</h>
            </button>
            <button
              onClick={() => {
                setTreatmentstatus(3);
              }}
            >
              <h4>Onaylanmamış Tedaviler</h4>
            </button>
          </div>
          <ul className="tedaviplani">
            {patienttreatment.map((patient, index) => {
              return (
                <li>
                  <div className="treatmentitems">
                    <section>
                      {" "}
                      <h5>
                        Tedavi ID:
                        {patient.onkayit_tedaviplanlari_tedaviplaniunique_id}
                      </h5>{" "}
                      <h5>
                        Ön kayıtlı hasta ID:
                        {patient.onkayit_tedaviplanlari_hastaunique_id}
                      </h5>
                      <h5>
                        Tedavi plani aciklama:
                        {patient.on_kayit_tedaviplanlari_tedaviplani_aciklama}
                      </h5>{" "}
                    </section>
                    <section>
                      {" "}
                      <button
                        style={{ backgroundColor: "green" }}
                        onClick={() => {
                          updatesTreatmenttatus(
                            2,
                            patient.onkayit_tedaviplanlari_tedaviplaniunique_id
                          );
                        }}
                      >
                        <span>
                          <i class="fa fa-check" aria-hidden="true"></i>
                        </span>
                      </button>
                      <button
                        style={{ backgroundColor: "gray" }}
                        onClick={() => {
                          updatesTreatmenttatus(
                            1,
                            patient.onkayit_tedaviplanlari_tedaviplaniunique_id
                          );
                        }}
                      >
                        <span>
                          <i
                            class="fa fa-hourglass-half"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </button>{" "}
                      <button
                        style={{ backgroundColor: "red" }}
                        onClick={() => {
                          updatesTreatmenttatus(
                            3,
                            patient.onkayit_tedaviplanlari_tedaviplaniunique_id
                          );
                        }}
                      >
                        <span>
                          <i class="fa fa-times" aria-hidden="true"></i>
                        </span>
                      </button>
                    </section>
                  </div>

                  {patienttreatmentoperations && (
                    <ul className="operationslist">
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
                              </h5>{" "}
                              <button
                                style={{ backgroundColor: "red" }}
                                onClick={() => {
                                  updatesTreatmenttatus(3, patientinformation);
                                }}
                              >
                                <span>
                                  <i class="fa fa-times" aria-hidden="true"></i>
                                </span>
                              </button>
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
