import React from "react";
import "../../index.css";

const FoodPartnerLogin = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Food Partner Login</h2>
        <form className="auth-form">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button className="auth-btn">Sign In</button>
        </form>
        <p className="auth-link">
          Don’t have an account? <a href="/food-partner/register">Register</a>
        </p>
        <p className="auth-link">
          You are a normal User? <a href="/user/register">User Register</a>
        </p>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
