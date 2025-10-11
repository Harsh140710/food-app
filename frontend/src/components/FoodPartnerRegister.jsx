import React from "react";
import "../index.css";

const FoodPartnerRegister = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Food Partner Create Account</h2>
        <form className="auth-form">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className="auth-btn">Create Account</button>
        </form>
        <p className="auth-link">
          Already have an account? <a href="/food-partner/login">Login</a>
        </p>
        <p className="auth-link">
          You are normal user? <a href="/user/login">User Login</a>
        </p>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
