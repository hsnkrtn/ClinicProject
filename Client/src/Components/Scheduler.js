import React, { useEffect, useState } from "react";
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

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  const { date } = useContext(Sidebarinfo);
  const { hidesidebar, setHidesidebar } = useContext(Sidebarinfo);

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth); // 0 ocak
  const [day, setDay] = useState(currentDay);

  const [daysinperiod, setDaysinperiod] = useState([]); // Secilen period icindeki gunler
  const [pageupdated, setPageupdated] = useState(false);
  const [selectedperiod, setSelectedperiod] = useState(3); // 1 gün  2 hafta 3 ay

  const todaysdate = `${year}-${month + 1}-${day}`;

  let howmanydaysinpreviousmonth = new Date(year, month, 0).getDate(); // gecen ayın kaç gün olduğunu veriyor
  let howmanydaysinmonth = new Date(year, month + 1, 0).getDate(); // Ayın kaç gün olduğunu veriyor
  let firstdayofthemonth = new Date(year, month, 1).getDay(); // Ayin ilk basladigi gunu veriyor 0 pazar
  let todaysday = new Date(year, month, day - 1).getDay();

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
  function setdateTotoday() {
    setMonth(currentMonth);
    setYear(currentYear);
    setDay(currentDay);
  }

  // Önceki ay
  const prevDate = (selectedperiod) => {
    switch (selectedperiod) {
      case 1:
        if (day === 0) {
          setDay(howmanydaysinpreviousmonth);
          setMonth(month - 1);
        } else {
          setDay(day - 1);
        }
        break;
      case 3:
        if (month === 0) {
          setMonth(11);
          setYear(year - 1);
        } else {
          setMonth(month - 1);
        }
        break;
    }
  };

  // sonraki ay
  const nextDate = (selectedperiod) => {
    switch (selectedperiod) {
      case 1:
        if (day === howmanydaysinmonth) {
          setDay(0);
          setMonth(month + 1);
        } else {
          setDay(day + 1);
        }
        break;
      case 2:
        if (day === howmanydaysinmonth) {
          setDay(0);
          setMonth(month + 1);
        } else {
          setDay(day + 1);
        }
        break;
      case 3:
        if (month === 11) {
          setMonth(0);
          setYear(year + 1);
        } else {
          setMonth(month + 1);
        }
        break;
    }
  };

  function getNofdays() {
    let daysinperiod = [];
    for (
      let i = firstdayofthemonth !== 0 ? firstdayofthemonth : 7;
      i > 1;
      i--
    ) {
      daysinperiod.push(howmanydaysinpreviousmonth - i + 2);
    }
    for (let i = 1; i <= howmanydaysinmonth; i++) {
      daysinperiod.push(i);
    }

    return daysinperiod;
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

  useEffect(() => {
    const fetchData = () => {
      const result = getNofdays();
      setDaysinperiod(result);
    };
    fetchData();
    console.log(howmanydaysinmonth);
    console.log("tarih", currentDay);
  }, [month, pageupdated, selectedperiod, day]);

  return (
    <div
      className="mainboard"
      style={hidesidebar ? mainboardextend : mainboard}
    >
      {" "}
      <div className="scheduler-container">
        <div className="scheduler-datepicker">
          <section>
            <button
              onClick={() => {
                prevDate(selectedperiod);
              }}
            >
              <span>
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
              </span>
            </button>{" "}
            <button
              onClick={() => {
                setdateTotoday(selectedperiod);
              }}
            >
              Bugün
            </button>{" "}
            <button
              onClick={() => {
                nextDate(selectedperiod);
              }}
            >
              <span>
                <i class="fa fa-chevron-right" aria-hidden="true"></i>
              </span>
            </button>{" "}
          </section>

          <section>
            {`bugunn ${todaysdate}`}= {months[month]} {daysinperiod[0]} , {year}
          </section>
          <section>
            <button
              onClick={() => {
                setSelectedperiod(1);
              }}
            >
              {" "}
              Gün
            </button>
            <button
              onClick={() => {
                setSelectedperiod(2);
              }}
            >
              {" "}
              Hafta
            </button>
            <button
              onClick={() => {
                setSelectedperiod(3);
              }}
            >
              {" "}
              Ay
            </button>
          </section>
        </div>

        <ul className="scheduler">
          {(() => {
            switch (selectedperiod) {
              case 3:
              case 2:
                return weekdays.map((day, index) => (
                  <li key={index}>
                    <h5>{day}</h5>
                  </li>
                ));
              case 1:
                return weekdays
                  .filter((weekday, index) => {
                    return index === todaysday;
                  })
                  .map((day, index) => (
                    <li key={index}>
                      <h5>{day}</h5>
                    </li>
                  ));
            }
          })()}
        </ul>
        <ul className="scheduler-weekdays-numbers">
          {daysinperiod.map((daynumber, index) => {
            return (
              <li
                onClick={() => {
                  console.log(daynumber, index);
                }}
              >
                {daynumber}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Scheduler;
