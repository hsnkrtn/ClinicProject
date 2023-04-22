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

  const [preregisteredpatient, setPreregisteredpatient] = useState([]);

  useEffect(() => {
    console.log(patientinformation);
    const fetchData = async () => {
      const result = await Axios.get(`${URL}/getPatientTreatment`, {
        params: {
          patientinformation,
        },
      });
      setPreregisteredpatient(result.data);
    };
    fetchData();
  }, []);

  return (
    <div
      className="mainboard"
      style={hidesidebar ? mainboardextend : mainboard}
    >
      <div> Ön kayıtlı hasta {localation.state.onkayitlihasta_unique_id}</div>
    </div>
  );
}

export default Preregistratedpatient;
