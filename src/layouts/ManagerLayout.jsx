import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import ManagerSidebar from "../components/ManagerSidebar";

import "../styles/ManagerLayout.css";

const ManagerLayout = () => {
  const { state } = useLocation();
  const { email, password } = state || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (!email || !password) {
      //navigate("/login");
    }
  }, [email, password, navigate]);

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
