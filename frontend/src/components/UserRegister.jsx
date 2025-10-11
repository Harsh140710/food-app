import React from "react";
import "../index.css";

const UserRegister = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Your Account</h2>
        <form className="auth-form">
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className="auth-btn">Create Account</button>
        </form>
        <p className="auth-link">
          Already have an account? <a href="/user/login">Login</a>
        </p>
        <p className="auth-link">
          You are a Food Partner? <a href="/food-partner/login">Food Partner Login</a>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
