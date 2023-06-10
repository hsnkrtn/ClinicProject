import "./App.css";

import { useState, createContext, lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Scheduler from "./Components/Scheduler";

const Sidebar = lazy(() => import("./Components/Sidebar"));
const Addpatient = lazy(() => import("./Components/Addpatient"));
const Preregistratedpatient = lazy(() =>
  import("./Components/Preregistratedpatient")
);
const Preregistrationlist = lazy(() =>
  import("./Components/Preregistrationlist")
);
const Preregistration = lazy(() => import("./Components/Preregistration"));
const Agenda = lazy(() => import("./Components/Agenda"));
const AgendaPlan = lazy(() => import("./Components/AgendaPlan"));
const Appointmentlist = lazy(() => import("./Components/Appointmentlist"));
const Mainboard = lazy(() => import("./Components/Mainboard"));
const Appointment = lazy(() => import("./Components/Appointment"));
const CalendarScheduler = lazy(() => import("./Components/CalendarScheduler"));

export const Sidebarinfo = createContext();

function App() {
  const [hidesidebar, setHidesidebar] = useState(false);
  const [URL, setURL] = useState("http://localhost:3001");
  const [isDark, setisDark] = useState(false);
  const today = new Date();
  const year = today.getFullYear(); // içinde bulunduğumuz yıl
  const month = today.getMonth(); // içinde bulunduğumuz ay ve 0 ocak
  const day = today.getDate(); // içinde bulunduğumuz gün

  const daytommorrow = String(today.getDate() + 1).padStart(2, "0");
  const date = `${String(year)}-${String(today.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(today.getDate()).padStart(2, "0")}`; // gerçek zamanlı tarih yyyy-mm-dd

  const tommorrow = `${year}-${month}-${daytommorrow}`;

  const [initialweek, setInitialweek] = useState(null);
  const [initialdayindex, setInitialdayindex] = useState(null);

  function getCalendarMatrixDays() {
    let todaysdate = JSON.stringify(getDays(year, month, day));
    let firstweekday = new Date(year, month, 1).getDay(); // Ayin ilk basladigi gunu veriyor 0 pazar
    let firstweekdayofthemonth = firstweekday !== 0 ? firstweekday - 1 : 6;
    let howmanydaysinmonth = new Date(year, month + 1, 0).getDate(); // Ayın kaç gün olduğunu veriyor
    let firstdayofthecurrentmonth = 1; // burada yanlis var düzeltilmesi lazım. Ayın sayısı kadar dönderiyor
    let diffbetweenmatrixandmonth = 42 - howmanydaysinmonth;
    let nextmonthsdays = 1;
    let howmanydaysinpreviousmonth = getPreviousdays(year, month, 1);
    var calendarMatrix = new Array(6);

    function getPreviousdays(takenyear, takenmonth, takenday) {
      const howmanydaysinpreviousmonth = new Date(
        takenyear,
        takenmonth,
        0
      ).getDate(); // gecen ayın kaç gün olduğunu veriyor

      return howmanydaysinpreviousmonth;
    }

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

    for (var i = 0; i < calendarMatrix.length; i++) {
      calendarMatrix[i] = new Array(7);

      for (var j = 0; j < calendarMatrix[i].length; j++) {
        // gecen ayin gunlerini alir
        if (firstweekdayofthemonth > 0) {
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
        if (JSON.stringify(calendarMatrix[i][j]) === todaysdate) {
          setInitialweek(i);
          setInitialdayindex(j);
        }
      }
    }

    return calendarMatrix;
  }

  useEffect(() => {
    getCalendarMatrixDays();
  }, [initialweek, initialdayindex]);

  return (
    <Router>
      <div className="App">
        <Sidebarinfo.Provider
          value={{
            hidesidebar,
            setHidesidebar,
            URL,
            date,
            tommorrow,
            initialdayindex,
            initialweek,
          }}
        >
          <Sidebar></Sidebar>{" "}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route exact path={`/`} element={<Mainboard />} />
              <Route exact path={`/RandevuEkle`} element={<Appointment />} />
              <Route path={`/RandevuListesi`} element={<Appointmentlist />} />
              <Route path={`/RandevuListesi`} element={<Appointmentlist />} />
              <Route
                exact
                path={`/ÖnKayıtEkle`}
                element={<Preregistration />}
              />
              <Route
                exact
                path={`/ÖnKayıtListesi`}
                element={<Preregistrationlist />}
              />
              <Route
                exact
                path={`/ÖnKayıtlihasta/:id`}
                element={<Preregistratedpatient />}
              />
              <Route path={`/PlanEkle`} element={<AgendaPlan />} />
              <Route path={`/HastaEkle`} element={<Addpatient />} />
              <Route path={`/Ajanda`} element={<Agenda />} />
              <Route path={`/Scheduler`} element={<Scheduler />} />
              <Route
                path={`/CalendarScheduler`}
                element={<CalendarScheduler />}
              />
            </Routes>{" "}
          </Suspense>
        </Sidebarinfo.Provider>
      </div>
    </Router>
  );
}

export default App;

//Contentleri şartlı göstermek istediğinde suspense kullan
