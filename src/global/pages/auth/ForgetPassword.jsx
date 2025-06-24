import React, { useState } from "react";
import { Link } from "react-router-dom";
import Registration from "./Registration";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="forget-password-container">
        <div className="forget-password-card">
          <div className="success-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="title">Check Your Email</h1>
          <p className="description">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <p className="description secondary">
            Please check your inbox and follow the instructions to reset your
            password.
          </p>
          <button className="btn btn-primary">Back to Login</button>
          <p className="resend-text">
            Didn't receive the email?{" "}
            <button className="link-btn">Resend</button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="forget-password-container">
      <div className="forget-password-card">
        <div className="header">
          <h1 className="title">Forget Password?</h1>
          <p className="description">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        <div className="forget-password-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Enter your email address"
            />
          </div>

          <button
            onClick={handleSubmit}
            className={`btn btn-primary ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </div>

        <div className="forget-footer">
          <p className="back-to-login">
            Remember your password?
            <Link
              to="/registration"
              element={<Registration />}
              className="link-btn"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
