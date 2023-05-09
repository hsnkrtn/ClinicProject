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
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth); // 0 ocak
  const [day, setDay] = useState(currentDay);
  let firstdayofthemonth = new Date(year, month, 1).getDay(); // Ayin ilk basladigi gunu veriyor 0 pazar

  const weekdays = [
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
    "Pazar",
  ];
  function getDays(takenyear, takenmonth, takenday) {
    const date = new Date(takenyear, takenmonth, takenday);
    const daysYear = date.getFullYear();
    const daysMonth = date.getMonth();
    const daysNumber = date.getDate();
    const weekday = date.getDay();
    let dayobject = {
      daysYear: daysYear,
      daysMonth: daysMonth,
      daysNumber: daysNumber,
      weekday: weekday,
    };

    return dayobject;
  }

  function getPreviousdays(takenyear, takenmonth, takenday) {
    const howmanydaysinpreviousmonth = new Date(
      takenyear,
      takenmonth,
      0
    ).getDate(); // gecen ayın kaç gün olduğunu veriyor

    console.log("oncekiay", howmanydaysinpreviousmonth);
    return howmanydaysinpreviousmonth;
  }
  var calendarMatrix = new Array(6);
  let howmanydaysinmonth = new Date(year, month + 1, 0).getDate(); // Ayın kaç gün olduğunu veriyor
  let firstdate = 0; // burada yanlis var düzeltilmesi lazım. Ayın sayısı kadar dönderiyor
  let howmanydaysinpreviousmonth = getPreviousdays(year, month, day);

  for (var i = 0; i < calendarMatrix.length; i++) {
    calendarMatrix[i] = new Array(7);

    for (var j = 0; j < calendarMatrix[i].length; j++) {
      if (firstdate < howmanydaysinmonth) {
        if (firstdayofthemonth > 0) {
          calendarMatrix[i][j] = getDays(
            year,
            month - 1,
            howmanydaysinpreviousmonth - firstdayofthemonth + 1
          );
          firstdate = -1;
        } else calendarMatrix[i][j] = getDays(year, month, day + firstdate);

        console.log("each", calendarMatrix[i][j]);
      }

      firstdate++;
      firstdayofthemonth--;
    }
  }
  useEffect(() => {
    console.log("matrix", calendarMatrix);
  });

  return (
    <div
      className="mainboard"
      style={hidesidebar ? mainboardextend : mainboard}
    >
      <div className="scheduler-container">
        {" "}
        <ul className="scheduler">
          {weekdays.map((day, index) => {
            return (
              <li key={index}>
                <h5>{day}</h5>
              </li>
            );
          })}
        </ul>
        <ul className="scheduler-weekdays-numbers">
          {calendarMatrix.map((calendarMatrixdays, index) => {
            return calendarMatrixdays.map((matrixday, index) => {
              return (
                <li>
                  {" "}
                  <h5>Gün{matrixday.daysNumber} </h5>
                  <h5> Haftanın günü{matrixday.weekday} </h5>
                  <h5>Ay{matrixday.daysMonth} </h5>
                  <h5>Yıl{matrixday.daysYear}</h5>
                </li>
              );
            });
          })}
        </ul>
      </div>{" "}
    </div>
  );
}

export default CalendarScheduler;
