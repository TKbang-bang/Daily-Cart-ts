import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Signup from "./auth/Signup";
import Home from "./Home/Home";
import { isUserLogged } from "./services/auth.service";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
axios.defaults.withCredentials = true;

function App() {
  const isUserAuthenticated = async () => {
    try {
      const res = await isUserLogged();
      if (!res.success) {
        if (
          window.location.pathname !== "/signin" &&
          window.location.pathname !== "/signup"
        )
          window.location.href = "/signin";
      }

      return;
      // console.log("You are logged in");
    } catch (error) {
      if (
        window.location.pathname !== "/signin" &&
        window.location.pathname !== "/signup"
      )
        window.location.href = "/signin";
    }
  };

  useEffect(() => {
    isUserAuthenticated();

    // if (window.location.pathname === "/") window.location.href = "/chats";
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
