import React, { useState } from "react";
import "../styles/auth.css";
import { signupService } from "../services/auth.service";
import { toast } from "sonner";

function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signupService(
        firstname,
        lastname,
        email,
        password,
      );
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
          <h1>Welcome to Sync Cart</h1>

          <p>
            Sync Cart is an e-commerce web application that allows users to
            create and manage their own cart.
          </p>
          <p>Buy anything you want from anywhere</p>
          <p>Signup to get started</p>
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Signup</h1>

          <input
            type="text"
            placeholder="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
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
          <button className="signup-button">Signup</button>

          <p>
            Already have an account? <a href="/signin">Signin</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
