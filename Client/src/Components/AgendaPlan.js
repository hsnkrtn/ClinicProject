import React from "react";
import { useContext } from "react";
import { Sidebarinfo } from "../App";

function AgendaPlan() {
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
      <div className="AgendaPlan"> 
      Plan ekleme   </div>
    </div>
  );
}

export default AgendaPlan;
