import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Sidebarinfo } from "../App";

function Scheduler() {
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

  const [fullmatrix, setFullmatrix] = useState([]);
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth); // 0 ocak
  const [dayindex, setDayindex] = useState(0);
  const [week, setWeek] = useState(0);
  const [selectedperiod, setSelectedperiod] = useState(3); // 1 gün  2 hafta 
  let howmanydaysincurrentmonth = new Date(year, month + 1, 0).getDate(); // Ayın kaç gün olduğunu veriyor

  let firstdayofthemonth = new Date(year, month, 1).getDay(); // Ayin ilk basladigi gunu veriyor 0 pazar
  // let firstdayofthemonth = 5; // Ayin ilk basladigi gunu veriyor 0 pazar
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
  function getCalendarMatrixDays() {
    let firstweekday = new Date(year, month, 1).getDay(); // Ayin ilk basladigi gunu veriyor 0 pazar
    let firstweekdayofthemonth = firstweekday !== 0 ? firstweekday : 7;
    let howmanydaysinmonth = new Date(year, month + 1, 0).getDate(); // Ayın kaç gün olduğunu veriyor
    let firstdayofthecurrentmonth = 1; // burada yanlis var düzeltilmesi lazım. Ayın sayısı kadar dönderiyor
    let diffbetweenmatrixandmonth = 42 - howmanydaysinmonth;
    let nextmonthsdays = 1;
    let howmanydaysinpreviousmonth = getPreviousdays(year, month, 1);
    var calendarMatrix = new Array(6);

    if (selectedperiod === 3) {
      for (var i = 0; i < calendarMatrix.length; i++) {
        calendarMatrix[i] = new Array(7);

        for (var j = 0; j < calendarMatrix[i].length; j++) {
          // gecen ayin gunlerini alir
          if (
            firstweekdayofthemonth > 1 &&
            firstdayofthecurrentmonth < howmanydaysinmonth
          ) {
            calendarMatrix[i][j] = getDays(
              year,
              month - 1,
              howmanydaysinpreviousmonth - firstweekdayofthemonth + 1
            );
            firstweekdayofthemonth--;
          }
          // Oldugumuz ayin gunlerini alir
          else if (firstdayofthecurrentmonth <= howmanydaysinmonth) {
            calendarMatrix[i][j] = getDays(
              year,
              month,
              firstdayofthecurrentmonth
            );
            firstdayofthecurrentmonth++;
          }
          // gelecek ayin gunlerini alir ve 7 x 6 lik matrixi tamamlar
          else if (diffbetweenmatrixandmonth >= 0) {
            calendarMatrix[i][j] = getDays(year, month + 1, nextmonthsdays);

            diffbetweenmatrixandmonth--;
            nextmonthsdays++;
          }
        }
      }
      return calendarMatrix;
    }
    if (selectedperiod === 2) {
      for (var i = 0; i < calendarMatrix.length; i++) {
        calendarMatrix[i] = new Array(7);

        for (var j = 0; j < calendarMatrix[i].length; j++) {
          // gecen ayin gunlerini alir
          if (
            firstweekdayofthemonth > 1 &&
            firstdayofthecurrentmonth < howmanydaysinmonth
          ) {
            calendarMatrix[i][j] = getDays(
              year,
              month - 1,
              howmanydaysinpreviousmonth - firstweekdayofthemonth + 1
            );
            firstweekdayofthemonth--;
          }
          // Oldugumuz ayin gunlerini alir
          else if (firstdayofthecurrentmonth <= howmanydaysinmonth) {
            calendarMatrix[i][j] = getDays(
              year,
              month,
              firstdayofthecurrentmonth
            );
            firstdayofthecurrentmonth++;
          }
          // gelecek ayin gunlerini alir ve 7 x 6 lik matrixi tamamlar
          else if (diffbetweenmatrixandmonth >= 0) {
            calendarMatrix[i][j] = getDays(year, month + 1, nextmonthsdays);

            diffbetweenmatrixandmonth--;
            nextmonthsdays++;
          }
        }
      }
// secilen hafta indexini ayin haftalik indexi ile esleyip yeni bi array donderiyor
      let weekrow = calendarMatrix.filter((periodday, index) => {
        if (index === week) {
          return periodday;
        }
      });
      return weekrow;
    }
  }
  // sonraki ay

  const nextDate = () => {
    switch (selectedperiod) {
      case 1:
        if (dayindex === 6) {
          setWeek(week + 1);
          setDayindex(0);
          if (week === 6) {
            setWeek(0);
            setMonth(month + 1);
          }
        } else {
          setDayindex(dayindex + 1);
        }
        break;
      case 2:
        if (week === 5) {
          setWeek((week) => 0);
          if (month === 11) {
            setMonth((month) => 0);
            setYear((year) => year + 1);
          } else {
            setMonth((month) => month + 1);
          }
        } else {
          setWeek((week) => week + 1);
        }
        break;
      case 3:
        setMonth(month + 1);

        break;
    }
  }; // Önceki ay
  const prevDate = () => {
    switch (selectedperiod) {
      case 1:
        if (dayindex === 0) {
          setWeek(week - 1); // buraya bak alttaki ifle iliskilendir
          setDayindex(6);
          if (week === 0) {
            setWeek(6);
            setMonth(month - 1);
          }
        } else {
          setDayindex(dayindex - 1);
        }
        break;
      case 2:
        if (week === 0) {
          setWeek(5);
          setMonth(month - 1);
          if (month === 0) {
            setYear(year - 1);
            setMonth(11);
          }
        } else {
          setWeek(week - 1);
        }
        break;
      case 3:
        setMonth(month - 1);

        break;
    }
  };
  function setdateTotoday() {
    setMonth(currentMonth);
    setYear(currentYear);
    setWeek(0);
  }
  useEffect(() => {
    const fetchData = () => {
      const result = getCalendarMatrixDays();
      setFullmatrix(result);
      console.log("fullmatix", fullmatrix);
    };
    fetchData();

    console.log("firstlineofmatrix", typeof fullmatrix);
  }, [month, year, week, dayindex, selectedperiod]);

  return (
    <div
      className="mainboard"
      style={hidesidebar ? mainboardextend : mainboard}
    >
      <div className="scheduler-container">
        {" "}
        <div className="scheduler-datepicker">
          <section>
            <button
              onClick={() => {
                prevDate();
              }}
            >
              <span>
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
              </span>
            </button>{" "}
            <button
              onClick={() => {
                setdateTotoday();
              }}
            >
              Bugün
            </button>{" "}
            <button
              onClick={() => {
                nextDate();
              }}
            >
              <span>
                <i class="fa fa-chevron-right" aria-hidden="true"></i>
              </span>
            </button>{" "}
            {months[month]} {year} {week}
          </section>

          <section></section>
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
          {weekdays.map((day, index) => {
            return (
              <li key={index}>
                <h5>{day}</h5>
              </li>
            );
          })}
        </ul>
        <ul className="scheduler-weekdays-numbers">
          {fullmatrix.map((calendarMatrixdays, index) => {
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

export default Scheduler;
