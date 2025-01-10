import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "../styles/Login.css";

function Login() {
  const baseURL = "https://medimealsbackend.onrender.com";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateForm = async (e) => {
    e.preventDefault();
    if (email.length === 0 || password.length === 0) {
      toast.info("Please enter all fields");
      return;
    }
    if (!email.includes("@") || !email.endsWith(".com")) {
      toast.info("Please enter a valid email");
      return;
    }
    if (password.length === 0) {
      toast.info("Please enter a password");
      return;
    }

    try {
      console.log(email);
      console.log(password);

      const response = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response) {
        if (data.message === "Login success for manager") {
          toast.success(data.message);

          navigate("/manager", { state: { email, password } });
        } else if (data.message === "Login success for pantry") {
          toast.success(data.message);
          localStorage.setItem("email", email);
          navigate("/pantry", { state: { email, password } });
        } else if (data.message === "Login success for delivery") {
          toast.success(data.message);

          navigate("/delivery", { state: { email, password } });
        } else if (data.message === "User not found") {
          toast.info(data.message || "Login failed");
        } else if (
          data.message === "There is a problem in logging in. Try again later"
        ) {
          toast.error(data.message || "Login failed");
        } else {
          toast.error(data.message || "Login failed");
        }
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login">
      <ToastContainer position="top-center" autoClose={2000} draggable />
      <div className="login-form">
        <h1>
          <span id="t1">Medi</span>
          <span id="t2">Meals</span>
          <img src="/assets/images/logo.png" alt="logo" id="formlogo" />
        </h1>
        <form onSubmit={validateForm}>
          <input
            type="text"
            placeholder="Email"
            className="formitems"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="formitems"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="formitems">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
