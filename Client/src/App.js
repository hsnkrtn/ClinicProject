import "./App.css";
import Mainboard from "./Components/Mainboard";
import Sidebar from "./Components/Sidebar";
import Appointment from "./Components/Appointment";
import { useState, createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Appointmentlist from "./Components/Appointmentlist";
import AgendaPlan from "./Components/AgendaPlan";
import Agenda from "./Components/Agenda";

export const Sidebarinfo = createContext();

function App() {
  const [hidesidebar, setHidesidebar] = useState(false);
  const [URL, setURL] = useState("http://localhost:3001");
  const [isDark, setisDark] = useState(false);

  return (
    <Router>
      <div className="App">
        <Sidebarinfo.Provider
          value={{ hidesidebar, setHidesidebar, URL, setisDark, isDark }}
        >
          <Sidebar></Sidebar>
          <Routes>
            <Route path={`RandevuEkle`} element={<Appointment />} />
          </Routes>
          <Routes>
            <Route path={`Randevulistesi`} element={<Appointmentlist />} />
          </Routes>
          <Routes>
            <Route path={`PlanEkle`} element={<AgendaPlan />} />
          </Routes>
          <Routes>
            <Route path={`Ajanda`} element={<Agenda />} />
          </Routes>
        </Sidebarinfo.Provider>
      </div>
    </Router>
  );
}

export default App;
