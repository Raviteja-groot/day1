import { useState } from "react";
import "../App.css";
import api from "../utils/api";

function SignUp({ onSignupSuccess, onBack }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await api("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      onSignupSuccess(); // Go to login page
    } catch (err) {
      setError(err.message || "Signup failed");
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-card">
        <button className="signup-back-btn" onClick={onBack}>
          ← Back
        </button>

        <h1 className="signup-title">Create Your Account</h1>
        <p className="signup-subtitle">Join Suchi Fashion House</p>

        {error && <div className="signup-otp-sent">{error}</div>}

        <form className="signup-form" onSubmit={handleSubmit}>
          <label className="signup-label">
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="signup-input"
            />
          </label>

          <label className="signup-label">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="signup-input"
            />
          </label>

          <label className="signup-label">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="signup-input"
            />
          </label>

          <button type="submit" className="signup-enter-btn">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
