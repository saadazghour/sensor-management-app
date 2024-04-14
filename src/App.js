import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SensorList from "../src/components/SensorList/SensorList";
import SensorForm from "../src/components/SensorForm/SensorForm";

import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/" element={<SensorList />} />
          <Route path="/add-sensor" element={<SensorForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
