import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SensorList from "../src/components/SensorList/SensorList";
import SensorForm from "../src/components/SensorForm/SensorForm";

import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SensorList />} />
          <Route path="/add-sensor" element={<SensorForm />} />
          <Route path="/sensor/:id" element={<SensorForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
