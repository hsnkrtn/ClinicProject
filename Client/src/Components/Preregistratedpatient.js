import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { useLocation, Link } from "react-router-dom";
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
  const [treatmentstatus, setTreatmentstatus] = useState(0);
  const [confirmationstatus, setConfirmationstatus] = useState(false);
  const [pageupdated, setPageupdated] = useState(false);

  useEffect(() => {
    getTreatment();
    getTreatmentoperations();
  }, [pageupdated, treatmentstatus]);

  // Hasta tedavi ID si al

  const getTreatment = async () => {
    const result = await Axios.get(`${URL}/getPatientTreatment`, {
      params: {
        patientinformation,
        treatmentstatus,
      },
    });
    setPatienttreatment(result.data);
  };

  // Hasta tedavi islemlerini al. Her tedavi için ayrı ayrı filtrele

  const getTreatmentoperations = async () => {
    const result = await Axios.get(`${URL}/getPatientTreatmentOperations`, {
      params: {
        patientinformation,
      },
    });
    setPatienttreatmentoperations(result.data);
  };
  // Update pregistrationstatus
  function updatepregistrationstatus(status, patient) {
    Axios.post(`${URL}/updatepregistrationstatus`, {
      patient: patient,
      status: status,
    }).then((res) => {
      alert("Ön Kayıt Onaylanmadı");
      setPageupdated(!pageupdated);
    });
  }

  // status 2 onaylanlanmış, 3 onaylanmamış ,1 onay bekliyor , 0 yeni kayıt

  function updatesTreatmentstatus(status, treatment) {
    Axios.post(`${URL}/updatetreatmentstatus`, {
      treatment: treatment,
      status: status,
    }).then((res) => {
      alert("Tedavi Planı Durumu Güncellendi");
      setPageupdated(!pageupdated);
    });
  }
  // Tedavı planı islemini sil
  function deleteTreatmentOperation(treatment, operation) {
    Axios.post(`${URL}/deleteTreatmentoperation`, {
      treatment: treatment,
      operation: operation,
    }).then((res) => {
      alert("Tedavi İşlemi Silindi");
      setPageupdated(!pageupdated);
    });
  }
  function deleteTreatment(treatment) {
    Axios.post(`${URL}/deleteTreatment`, {
      treatment: treatment,
    }).then((res) => {
      alert("Tedavi Silindi");
      setPageupdated(!pageupdated);
    });
  }

  return (
    <div
      className="mainboard"
      style={hidesidebar ? mainboardextend : mainboard}
    >
      {patienttreatment && (
        <div className="tedaviplanlari">
          <Link to={"/HastaEkle"} state={patientinformation}>
            {" "}
            <button className="addPatientbutton" style={{ width: "200px" }}>
              Hasta Olarak Ekle
            </button>{" "}
          </Link>{" "}
          <button
            className="addPatientbutton"
            style={{ width: "200px" }}
            onClick={() => {
              updatepregistrationstatus(2, patientinformation);
            }}
          >
            Ön Kayıt Onaylanmadı
          </button>{" "}
          <div className="PreregistrationButtons">
            <button className="addTreatment">Tedavi Plani ekle</button>

            <button
              onClick={() => {
                setTreatmentstatus(0);
              }}
            >
              <h>Onay Bekleyen Tedaviler</h>
            </button>
            <button
              onClick={() => {
                setTreatmentstatus(1);
              }}
            >
              <h>Onaylanmış Tedaviler</h>
            </button>
            <button
              onClick={() => {
                setTreatmentstatus(2);
              }}
            >
              <h>Onaylanmamış Tedaviler</h>
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
                      {treatmentstatus !== 1 ? (
                        <button
                          style={{ backgroundColor: "green" }}
                          onClick={() => {
                            updatesTreatmentstatus(
                              1,
                              patient.onkayit_tedaviplanlari_tedaviplaniunique_id
                            );
                          }}
                        >
                          <span>
                            <i class="fa fa-check" aria-hidden="true"></i>
                          </span>
                        </button>
                      ) : (
                        <></>
                      )}
                      {treatmentstatus !== 0 ? (
                        <button
                          style={{ backgroundColor: "gray" }}
                          onClick={() => {
                            updatesTreatmentstatus(
                              0,
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
                        </button>
                      ) : (
                        <></>
                      )}
                      {treatmentstatus !== 2 ? (
                        <button
                          style={{ backgroundColor: "red" }}
                          onClick={() => {
                            updatesTreatmentstatus(
                              2,
                              patient.onkayit_tedaviplanlari_tedaviplaniunique_id
                            );
                          }}
                        >
                          <span>
                            <i class="fa fa-times" aria-hidden="true"></i>
                          </span>
                        </button>
                      ) : (
                        <></>
                      )}
                      <button
                        style={{ backgroundColor: "gray" }}
                        onClick={() => {
                          deleteTreatment(
                            patient.onkayit_tedaviplanlari_tedaviplaniunique_id
                          );
                        }}
                      >
                        <span>
                          <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </span>
                      </button>
                      <button
                        style={{ backgroundColor: "green", width: "200" }}
                      >
                        İşlem Ekle
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
                              <h5>
                                {
                                  patienttreatmentoperation.tedaviplanislem_unique_id
                                }{" "}
                              </h5>{" "}
                              <button
                                style={{ backgroundColor: "red" }}
                                onClick={() => {
                                  deleteTreatmentOperation(
                                    patienttreatmentoperation.tedaviplanislem_tedavi_plani,
                                    patienttreatmentoperation.tedaviplanislem_unique_id
                                  );
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
