import React from "react";
import { isUserLogged, logoutService } from "../services/auth.service";
import { getAccessToken } from "../services/token.service";

function Home() {
  const handleSession = async () => {
    try {
      await isUserLogged();
      console.log({ token: getAccessToken() });
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error?.message || "Something went wrong",
      };
    }
  };

  const handleLogout = async () => {
    try {
      const res = await logoutService();
      if (!res.success) throw new Error(res.message);

      window.location.href = "/signin";
      return;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error?.message || "Something went wrong",
      };
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleSession}>Click</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
