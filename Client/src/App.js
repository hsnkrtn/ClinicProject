import "./App.css";

import { useState, createContext, lazy, Suspense } from "react";
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

export const Sidebarinfo = createContext();

function App() {
  const [hidesidebar, setHidesidebar] = useState(false);
  const [URL, setURL] = useState("http://localhost:3001");
  const [isDark, setisDark] = useState(false);
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const daytommorrow = String(today.getDate() + 1).padStart(2, "0");
  const date = `${year}-${month}-${day}`;
  const tommorrow = `${year}-${month}-${daytommorrow}`;

  return (
    <Router>
      <div className="App">
        <Sidebarinfo.Provider
          value={{ hidesidebar, setHidesidebar, URL, date, tommorrow }}
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
            </Routes>{" "}
          </Suspense>
        </Sidebarinfo.Provider>
      </div>
    </Router>
  );
}

export default App;

//Contentleri şartlı göstermek istediğinde suspense kullan
