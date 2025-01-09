import React from "react";
import { Outlet } from "react-router-dom";
import ManagerSidebar from "../components/ManagerSidebar";

import "../styles/ManagerLayout.css";

const ManagerLayout = () => {
  return (
    <div className="manager-layout-container">
      <ManagerSidebar />
      <div className="manager-layout-content">
        <Outlet />
      </div>
    </div>
  );
};

export default ManagerLayout;
