import React from "react";
import "../../index.css";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FoodPartnerRegister = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const businessName = e.target.businessName.value;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phoneNumber = e.target.phoneNumber.value;
    const address = e.target.address.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/food-partner/register",
        {
          businessName: businessName,
          name: name,
          email: email,
          phoneNumber: phoneNumber,
          address: address,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Welcome, Food Partner " + name);
      navigate("/create-food");
      console.log(response.data);
    } catch (error) {
      const message = error?.response?.data || "Registration Failed...!";
      toast.error(message);
      console.log(error.response.data);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Food Partner Create Account</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="text" name="businessName" placeholder="Business Name" />
          <input type="text" name="name" placeholder="Owner Name" />
          <input type="email" name="email" placeholder="Email" />
          <input type="tel" name="phoneNumber" placeholder="Phone Number" />
          <textarea
            placeholder="Address"
            name="address"
            className=""
            rows="3"
          />
          <input type="password" name="password" placeholder="Password" />
          <button className="auth-btn">Create Account</button>
        </form>

        <p className="auth-link">
          Already have an account? <a href="/food-partner/login">Login</a>
        </p>
        <p className="auth-link">
          You are a normal user? <a href="/user/login">User Login</a>
        </p>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
