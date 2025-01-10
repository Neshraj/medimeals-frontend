import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import PatientDetails from "./PatientDetails";
import FoodChart from "./FoodChart";
import InnerPantry from "./InnerPantry";
import "../styles/Manager.css";

function Manager() {

  return (
    <div className="manager-container">
      <div className="manager-sidebar">
        <NavLink
          to="patient-details"
          className="sidebar-items"
          activeClassName="active"
        >
          Patient Details
        </NavLink>
        <NavLink
          to="food-charts"
          className="sidebar-items"
          activeClassName="active"
        >
          Food Charts
        </NavLink>
        <NavLink
          to="inner-pantry"
          className="sidebar-items"
          activeClassName="active"
        >
          Inner Pantry
        </NavLink>
      </div>

      <div className="manager-content">
        <Routes>
          <Route path="/patient-details" element={<PatientDetails />} />
          <Route path="/food-charts" element={<FoodChart />} />
          <Route path="/inner-pantry" element={<InnerPantry />} />
        </Routes>
      </div>
    </div>
  );
}

export default Manager;
