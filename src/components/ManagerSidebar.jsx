import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/ManagerSidebar.css";

function ManagerSidebar() {
  return (
    <div className="manager-sidebar">
      <NavLink to="track-tasks" className="sidebar-items">
        TrackFood
      </NavLink>
      <NavLink to="patient-details" className="sidebar-items">
        PatientsDetails
      </NavLink>
      <NavLink to="food-chart" className="sidebar-items">
        FoodCharts
      </NavLink>
      <NavLink to="inner-pantry" className="sidebar-items">
        InnerPantry
      </NavLink>
    </div>
  );
}

export default ManagerSidebar;
