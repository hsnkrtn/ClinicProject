import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Sidebarinfo } from "../App";

function CalendarScheduler() {
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

  const [year, setYear] = useState(2023);
  const [month, setMonth] = useState(0); // 0 ocak
  const [day, setDay] = useState(1);

  //   const calendarMatrix = new Array(6).fill().map(() => {
  //     return new Array(7).fill().map(() => {
  //       return new Date(year, month, day);
  //     });
  //   });
  var calendarMatrix = new Array(6);
  for (var i = 0; i < calendarMatrix.length; i++) {
    calendarMatrix[i] = new Array(7);
    for (var j = 0; j < calendarMatrix[i].length; j++) {
      calendarMatrix[i][j] = new Date(year, month, day+i+j);
    }
  }
  useEffect(() => {
    console.log(calendarMatrix);
  });

  return (
    <div
      className="mainboard"
      style={hidesidebar ? mainboardextend : mainboard}
    >
      <div>a</div>{" "}
    </div>
  );
}

export default CalendarScheduler;
