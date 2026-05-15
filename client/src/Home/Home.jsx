import React from "react";
import { isUserLogged } from "../services/auth.service";
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

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleSession}>Click</button>
    </div>
  );
}

export default Home;
