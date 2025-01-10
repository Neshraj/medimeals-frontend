import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import PantrySidebar from "../components/PantrySidebar";

import "../styles/ManagerLayout.css";

const PantryLayout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { email, password } = state || {};

  useEffect(() => {
    if (!email || !password) {
      // navigate("/login");
    }
  }, [email, password, navigate]);

  return (
    <div className="manager-layout-container">
      <PantrySidebar email={email} password={password} />
      <div className="manager-layout-content">
        <Outlet context={{ email, password }} />
      </div>
    </div>
  );
};

export default PantryLayout;
