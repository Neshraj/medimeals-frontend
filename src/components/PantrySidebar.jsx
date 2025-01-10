import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/ManagerSidebar.css";

function PantrySidebar({ email, password }) {
  console.log("in sidebar", email);

  return (
    <div className="manager-sidebar">
      <NavLink
        to="tasks-assigned"
        className="sidebar-items"
        state={{ email, password }}
      >
        Tasks
      </NavLink>
      <NavLink to="delivery-staff-details" className="sidebar-items">
        AssigneDelivery
      </NavLink>
      <NavLink to="delivery-details" className="sidebar-items">
        Delivery
      </NavLink>
    </div>
  );
}

export default PantrySidebar;
