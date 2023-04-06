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

  useEffect(() => {
    console.log(URL);
    window.scrollTo(0, 0);
    Axios.get(`${URL}/GetAppointmentList`).then((reponse) =>
      setAppointmentList(reponse.data.reverse())
    );
    console.log(AppointmentList);
  }, []);

  return (
    <div
      className="mainboard"
      style={hidesidebar ? mainboardextend : mainboard}
    >
      <div>Appointmentlist</div>;
    </div>
  );
}

export default Appointmentlist;
