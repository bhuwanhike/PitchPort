import React, { useEffect, useState } from "react";
import { AuthContext } from "./auth-context";
import { jwtDecode } from "jwt-decode";
// import axios from "axios";

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem("token");
    return !!token;
  });

  const [role, setRole] = useState("startup");

  // startup page function
  // const [startupForm, setStartupForm] = useState(false);

  // investor page function
  // const [investorForm, setInvestorForm] = useState(false);

  // const setStartupFormView = (value) => {
  //   setStartupForm(value);
  // };

  // const setInvestorFormView = (value) => {
  //   setInvestorForm(value);
  // };

  const [Fletter, setFletter] = useState("");

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      return false;
    }
    setIsLoggedIn(true);
    const decoded = jwtDecode(token);
    const username = decoded.username || decoded.sub;
    setFletter(username.charAt(0).toUpperCase());
    return true;
  };

  const getLoggedInUser = async () => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const username = (await decoded.username) || decoded.sub;
    const email = (await decoded.email) || decoded.email;
    const userId = (await decoded.id) || decoded.id;
    const role = (await decoded.role) || decoded.role;
    if (token) {
      return { username, email, role, userId };
    }
  };


  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        checkAuth,
        logout,
        Fletter,
        role,
        setRole,
        getLoggedInUser,
        // getRegisterUserInfo,
        // startupForm,
        // setStartupFormView,
        // investorForm,
        // setInvestorFormView,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
