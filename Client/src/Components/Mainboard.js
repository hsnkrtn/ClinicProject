import React from "react";
import { useContext } from "react";
import { Sidebarinfo } from "../App";

function Mainboard() {
  const mainboardextend = {
    height: "35%",
    backgroundColor: "#CCE2FF",
    marginLeft: 50,
    top: 50,
    flex: 1
  };
  const mainboard = {
    height: "35%",
    backgroundColor: "#CCE2FF",
    marginLeft: 250,
    top: 50,
    flex: 1  };

  const { hidesidebar, setHidesidebar } = useContext(Sidebarinfo);

  return (
    <div
      className="mainboard"
      style={hidesidebar ? mainboardextend : mainboard}
    >
      Mainboard
    </div>
  );
}

export default Mainboard;
