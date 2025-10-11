import React from "react";
import "../../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post("http://localhost:3000/api/auth/user/login",{
      email: email,
      password: password,
    }, {
      withCredentials: true,
    });

    console.log(response.data);

    navigate("/")
    
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">User Login</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="email" id="email" placeholder="Email" />
          <input type="password" id="password" placeholder="Password" />
          <button className="auth-btn">Sign In</button>
        </form>
        <p className="auth-link">
          Don’t have an account? <a href="/user/register">Register</a>
        </p>
        <p className="auth-link">
            You are a Food Partner ? <a href="/food-partner/register">Food Partner Register</a>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
