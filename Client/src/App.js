import "./App.css";
import Mainboard from "./Components/Mainboard";
import Sidebar from "./Components/Sidebar";
import Appointment from "./Components/Appointment";
import { useState, createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Appointmentlist from "./Components/Appointmentlist";
import AgendaPlan from "./Components/AgendaPlan";
import Agenda from "./Components/Agenda";
import Preregistration from "./Components/Preregistration";
import Preregistrationlist from "./Components/Preregistrationlist";
import Preregistratedpatient from "./Components/Preregistratedpatient";

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
          <Sidebar></Sidebar>
          <Routes>
            <Route exact path={`/`} element={<Mainboard />} />
            <Route exact path={`/RandevuEkle`} element={<Appointment />} />
            <Route path={`/RandevuListesi`} element={<Appointmentlist />} />
            <Route path={`/RandevuListesi`} element={<Appointmentlist />} />
            <Route exact path={`/ÖnKayıtEkle`} element={<Preregistration />} />
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
            <Route path={`/Ajanda`} element={<Agenda />} />
          </Routes>
        </Sidebarinfo.Provider>
      </div>
    </Router>
  );
}

export default App;
