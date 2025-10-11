import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import UserRegister from "../components/auth/UserRegister";
import UserLogin from "../components/auth/UserLogin";
import FoodPartnerRegister from "../components/auth/FoodPartnerRegister";
import FoodPartnerLogin from "../components/auth/FoodPartnerLogin";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/user/login" replace />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route
          path="/food-partner/register"
          element={<FoodPartnerRegister />}
        />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
