import React from "react";
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
      await axios.post(
        "http://localhost:3000/api/auth/user/login",
        { email, password },
        { withCredentials: true }
      );

      toast.success("Welcome back User!");
      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || "Login Failed";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-gradient-to-br from-[#fafafa] to-[#fff3eb]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">
          User Login
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="border border-[#ff5500] rounded-xl px-4 py-3 focus:border-[#ff6b01] outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="border border-[#ff5500] rounded-xl px-4 py-3 focus:border-[#ff6b01] outline-none"
          />
          <button
            type="submit"
            className="bg-[#ff6b01] text-white rounded-xl py-3 font-medium hover:bg-[#e65c00] transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-700">
          Don’t have an account?{" "}
          <a href="/user/register" className="text-[#2664f6] font-medium">
            Register
          </a>
        </p>
        <p className="text-center mt-2 text-sm text-gray-700">
          You are a Food Partner?{" "}
          <a href="/food-partner/register" className="text-[#2664f6] font-medium">
            Food Partner Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
