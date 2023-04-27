import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Sidebarinfo } from "../App";

function Agenda() {
  const [agenda, setAgenda] = useState([]);

  useEffect(() => {
    console.log(URL);
    window.scrollTo(0, 0);
    Axios.get(`${URL}/GetFullagenda`).then((reponse) =>
      setAgenda(reponse.data.reverse())
    );
    console.log("ajanda",agenda);
  }, []);

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

  return (
    <div
      className="mainboard"
      style={hidesidebar ? mainboardextend : mainboard}
    >
      <div className="agenda">ajanda </div>
    </div>
  );
}

export default Agenda;
