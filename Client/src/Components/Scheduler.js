import React, { useState } from "react";
import { useContext } from "react";
import { Sidebarinfo } from "../App";

function Scheduler() {
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

  const currentYear = new Date().getFullYear();
  const currentmonth = new Date().getMonth();

  const { hidesidebar, setHidesidebar } = useContext(Sidebarinfo);
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(0); // 0 ocak
  const [day, setDay] = useState(1);
  const [daysinmonth, setDaysinmonth] = useState([]);
  const [pageupdated, setPageupdated] = useState(false);

  const selecteddate = `${year}${month}${day}`;
  let firstdayofmonth = new Date(year, month, 1).getDay(); // Ayın hangi gün ile başladığını veriyor 0-6 arası. 0 Pazar günü.
  let lastdateofmonth = new Date(year, month + 1, 0).getDate(); // Ayın kaç gün olduğunu veriyor

  function getFebdays() {
    return year % 4 === 0 ? 29 : 28;
  }

  const NofDays = [31, getFebdays(), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const weekdays = [
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
    "Pazar",
  ];
  const months = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  function getNofdays() {
    if (year !== "") {
      let firstdayofthemonth = new Date(year, month, 1).getDay();
      console.log("ayinilkgunu", firstdayofthemonth);

      for (
        let i = firstdayofthemonth !== 0 ? firstdayofthemonth : 7;
        i > 1;
        i--
      ) {
        daysinmonth.push(NofDays[month] - i + 1);
      }
    }
    for (let i = 1; i <= NofDays[month]; i++) {
      daysinmonth.push(i);
    }

    return daysinmonth;
  }

  const hours = [
    "09.00",
    "10.00",
    "11.00",
    "12.00",
    "13.00",
    "14.00",
    "15.00",
    "16.00",
    "17.00",
    "18.00",
    "19.00",
    "20.00",
    "21.00",
    "22.00",
  ];

  useState(() => {
    getNofdays();
    console.log("ilkgun", firstdayofmonth);
    console.log("songun", lastdateofmonth);
  }, [year, pageupdated]);

  return (
    <div
      className="mainboard"
      style={hidesidebar ? mainboardextend : mainboard}
    >
      {" "}
      <div className="clinic-scheduler">
        {" "}
        {year}
        {months[month]}
        <ul className="scheduler">
          {weekdays.map((day, index) => {
            return (
              <li>
                <h5>{day}</h5>
              </li>
            );
          })}
        </ul>
        <ul className="scheduler-weekdays-numbers">
          {daysinmonth.map((daynumber, index) => {
            return <li>{daynumber}</li>;
          })}
        </ul>
      </div>{" "}
    </div>
  );
}

export default Scheduler;
{
  /* <ul className="scheduler-cells">
                    {hours.map((hour, index) => {
                      return <li></li>;
                    })}
                  </ul> */
}
{
  /* <ul className="scheduler-hours">
          {hours.map((hour, index) => {
            return <li>{hour}</li>;
          })}
        </ul> */
}
