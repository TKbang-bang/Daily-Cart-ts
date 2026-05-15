import React, { useState } from "react";
import "../styles/auth.css";
import { signinService } from "../services/auth.service";
import { toast } from "sonner";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signinService(email, password);
      if (!response.success) throw new Error(response.message);

      toast.success(response.message);
      window.location.href = "/";
      return;
    } catch (error) {
      return toast.error(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-subcontainer">
        <h1 className="logo">SyncCart</h1>
        <div className="welcome">
          <h1>Welcome back to Sync Cart</h1>

          <p>
            Sync Cart is an e-commerce web application that allows users to
            create and manage their own cart.
          </p>
          <p>Buy anything you want from anywhere</p>
          <p>Signup to get started</p>
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Signin</h1>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="signup-button">Signin</button>

          <p>
            Already have an account? <a href="/signup">Signup</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signin;
