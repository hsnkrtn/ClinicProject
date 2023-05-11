import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Sidebarinfo } from "../App";

function Calendar() {
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
  const [day, setDay] = useState(1);
  const [selectedperiod, setSelectedperiod] = useState(3); // 1 gün  2 hafta 3 ay

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
    "Pazar",

    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
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
    let howmanydaysinmonth = new Date(year, month + 1, 0).getDate(); // Ayın kaç gün olduğunu veriyor
    let firstdayofthecurrentmonth = 1; // burada yanlis var düzeltilmesi lazım. Ayın sayısı kadar dönderiyor
    let diffbetweenmatrixandmonth =
      42 - (howmanydaysinmonth + firstdayofthemonth);
    let nextmonthsdays = 1;
    let howmanydaysinpreviousmonth = getPreviousdays(year, month, 1);
    var calendarMatrix = new Array(6);

    for (var i = 0; i < calendarMatrix.length; i++) {
      calendarMatrix[i] = new Array(7);

      for (var j = 0; j < calendarMatrix[i].length; j++) {
        if (
          firstdayofthemonth > 0 &&
          firstdayofthecurrentmonth < howmanydaysinmonth
        ) {
          calendarMatrix[i][j] = getDays(
            year,
            month - 1,
            howmanydaysinpreviousmonth - firstdayofthemonth + 1
          );
          firstdayofthemonth--;
        } else if (firstdayofthecurrentmonth < howmanydaysinmonth) {
          calendarMatrix[i][j] = getDays(
            year,
            month,
            firstdayofthecurrentmonth
          );
          firstdayofthecurrentmonth++;
        } else if (diffbetweenmatrixandmonth >= 0) {
          calendarMatrix[i][j] = getDays(year, month + 1, nextmonthsdays);

          diffbetweenmatrixandmonth--;
          nextmonthsdays++;
        }
      }
    }

    return calendarMatrix;
  }
  // sonraki ay

  const nextDate = (selectedperiod) => {
    switch (selectedperiod) {
      case 3:
        if (month === 11) {
          setMonth(0);
          setYear(year + 1);
        } else {
          setMonth(month + 1);
        }
        break;
    }
  }; // Önceki ay
  const prevDate = (selectedperiod) => {
    switch (selectedperiod) {
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
  useEffect(() => {
    const fetchData = () => {
      const result = getCalendarMatrixDays();
      setFullmatrix(result);
    };
    fetchData();
  }, []);

  return (
    <div
      className="mainboard"
      style={hidesidebar ? mainboardextend : mainboard}
    >
      <div className="scheduler-container">
        {" "}
        <div className="scheduler-datepicker">
          <section>
            {months[month]}
            <button
              onClick={() => {
                prevDate(selectedperiod);
              }}
            >
              <span>
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
              </span>
            </button>{" "}
            <button>Bugün</button>{" "}
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

export default Calendar;
