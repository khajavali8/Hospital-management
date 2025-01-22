import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddDoctors from "./components/AddDoctor";
import AddPatients from "./components/AddPatient";
import ManageAppointments from "./components/Appointment1";
import './App.css';


function App() {
  return (
    <Router>
      <div>
      <header style={{ textAlign: "center", margin: "20px 0" }}>
          <h1>Hospital Management App</h1>
        </header>
        <nav>
          <ul>
            <li >
              <Link to="/addpatient">Add Patients</Link>
            </li>
            <li >
              <Link to="/adddoctor">Add Doctors</Link>
            </li>
            <li>
              <Link to="/appointments">Appointments</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/addpatient" element={<AddPatients />} />
          <Route path="/adddoctor" element={<AddDoctors />} />
          <Route path="/appointments" element={<ManageAppointments />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
