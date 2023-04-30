import React from "react";
import { useContext } from "react";
import { Sidebarinfo } from "../App";

function Mainboard() {
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

  const { hidesidebar, setHidesidebar } = useContext(Sidebarinfo);

  return (
    <div
      className="mainboard"
      style={hidesidebar ? mainboardextend : mainboard}
    >
      <div className="Addpatient"></div>
    </div>
  );
}

export default Mainboard;
