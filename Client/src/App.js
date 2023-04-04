import "./App.css";
import Mainboard from "./Components/Mainboard";
import Sidebar from "./Components/Sidebar";
import Appointment from "./Components/Appointment";
import { useState, createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Appointmentlist from "./Components/Appointmentlist";

export const Sidebarinfo = createContext();

function App() {
  const [hidesidebar, setHidesidebar] = useState(false);
  const [URL, setURL] = useState("http://localhost:3001");

  return (
    <Router>
      <div className="App">
        <Sidebarinfo.Provider value={{ hidesidebar, setHidesidebar, URL }}>
          <Sidebar></Sidebar>
          <Routes>
            <Route path={`RandevuEkle`} element={<Appointment />} />
          </Routes>
          <Routes>
            <Route path={`Randevulistesi`} element={<Appointmentlist />} />
          </Routes>
        </Sidebarinfo.Provider>
      </div>
    </Router>
  );
}

export default App;
