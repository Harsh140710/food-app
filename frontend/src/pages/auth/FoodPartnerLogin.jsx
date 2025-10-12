import React from "react";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const FoodPartnerLogin = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/food-partner/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Welcome back Food Partner !");
      navigate("/create-food");
      console.log(response.data);
    } catch (error) {
      const message = error?.response?.data || "Login Failed";
      toast.error(message);
      console.log(error.response.data);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Food Partner Login</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
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
