import React from "react";
import "../../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const UserLogin = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/user/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Welcome back User !");
      console.log(response.data);

      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || "Login Failed";
      toast.error(message);
      console.log("Login error:", error.response?.data);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">User Login</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button className="auth-btn">Sign In</button>
        </form>
        <p className="auth-link">
          Don’t have an account? <a href="/user/register">Register</a>
        </p>
        <p className="auth-link">
          You are a Food Partner ?{" "}
          <a href="/food-partner/register">Food Partner Register</a>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
