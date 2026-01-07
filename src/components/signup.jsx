import React, { useState } from "react";
import '../App.css'

export default function SignUp({ onSignUpSuccess, onBack }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log('Signup attempt:', { name, email, password: '***' });

    try {
      const res = await fetch("http://localhost:5001/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      console.log('Response status:', res.status);
      const data = await res.json();
      console.log('Response data:', data);

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      localStorage.setItem("token", data.token);
      onSignUpSuccess(data.user, data.token);
    } catch (err) {
      console.error('Signup error:', err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-container">
        {/* Left Half - Image and Logo */}
        <div className="landing-left">
          <div className="landing-logo-container">
            <div className="landing-logo">
              <h1>Suchi Fashion House</h1>
              <p className="landing-tagline">Style That Speaks Your Language</p>
            </div>
          </div>
          <div className="landing-image-container">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=800&fit=crop" 
              alt="Fashion shopping"
              className="landing-image"
            />
          </div>
        </div>

        {/* Right Half - Sign Up Form */}
        <div className="landing-right">
          <div className="landing-actions">
            <h2 className="landing-welcome">Join Suchi Fashion</h2>
            <p className="landing-description">
              Create your account to start your style journey
            </p>
            
            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit} className="auth-form">
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="auth-input"
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="auth-input"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="auth-input"
              />

              <button type="submit" className="landing-btn landing-btn-primary">
                Create Account
              </button>
            </form>

            <button onClick={onBack} className="landing-btn landing-btn-secondary">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
