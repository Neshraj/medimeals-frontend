import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/ManagerSidebar.css";

function ManagerSidebar() {
  return (
    <div className="manager-sidebar">
      <NavLink to="patient-details" className="sidebar-items">Patient Details</NavLink>
      <NavLink to="food-chart" className="sidebar-items">Food Charts</NavLink>
      <NavLink to="inner-pantry" className="sidebar-items">Inner Pantry</NavLink>
    </div>
  );
}

export default ManagerSidebar;
