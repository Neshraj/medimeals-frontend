import React, { useState } from "react";
import useDocumentTitle from "../useDocumentTitle";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

import '../styles/Login.css';

function Login() {

  useDocumentTitle('Login');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const validateForm = (e) => {
      e.preventDefault();
      if(email.length === 0 || password.length === 0) {
        toast.info("Please enter all fields");
        return;
      }
      if (!email.includes("@") || !email.endsWith(".com")) {
        toast.info("Please enter a valid email")
        return;
      }
      if (password.length === 0) {
        toast.info("Please enter a password");
        return;
      }
      toast.success("Login successful");
      navigate('manager');

    };
  
    return (
      <div className="login">
        <ToastContainer 
        position="top-center" 
        autoClose={2000} 
        draggable
      />
        <div className="login-form">
          <h1><span id="t1">Medi</span><span id="t2">Meals</span><img src="/assets/images/logo.png" alt="logo" id="formlogo"/></h1>
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
            <button type="submit" className="formitems">Login</button>
          </form>
        </div>
      </div>
    );
  }
  
  export default Login;
  