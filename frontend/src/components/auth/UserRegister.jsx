import React from "react";
import "../../index.css";
import axios from "axios";

const UserRegister = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fullName = e.target.firstName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        
        await axios.post("http://localhost:3000/api/auth/user/register",{
            fullName: fullName,
            email: email,
            password: password
        }, {
            withCredentials:true,
        });

    }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Your Account</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="text" id="firstName" placeholder="Full Name" />
          <input type="email" id="email" placeholder="Email" />
          <input type="password" id="password" placeholder="Password" />
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
