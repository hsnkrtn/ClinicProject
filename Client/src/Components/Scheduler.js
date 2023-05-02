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
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const selecteddate = `${year}${month}${day}`;

  let firstdayofmonth = new Date(year, month, 1).getDay();// Ayın hangi gün ile başladığını veriyor 0-6 arası. 0 Pazar günü.
  let lastdateofmonth = new Date(year, month + 1, 0).getDate(); // Ayın kaç gün olduğunu veriyor

  function getFebdays() {
    return year % 4 === 0 ? 29 : 28;
  }

  const NofDays = [31, getFebdays(), 31, 30, 31, 30, 31, 30, 31, 30, 31, 30];

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
  useState(() => {
    console.log("ilkgun", firstdayofmonth);
    console.log("songun", lastdateofmonth);
  }, [year]);

  return (
    <div
      className="mainboard"
      style={hidesidebar ? mainboardextend : mainboard}
    >
      <div>
        <input
          type="number"
          id="year"
          min="2000"
          max="2100"
          onChange={(e) => setYear(e.target.value)}
        ></input>
        <ul className="Scheduler">
          year{year}
          days{" "}
          {NofDays.map((number, index) => {
            return <h1>{number}</h1>;
          })}
          {weekdays.map((day, index) => {
            return (
              <li>
                {day}
                <ul>{weekdays.map((numberofday, index) => {})}</ul>
              </li>
            );
          })}
        </ul>
      </div>{" "}
    </div>
  );
}

export default Scheduler;
