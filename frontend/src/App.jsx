/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import VerifyAccountSuccess from "./pages/VerifyAccountSuccess";
import VerifyAccountFailed from "./pages/VerifyAccountFailed";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordStatus from "./pages/ResetPasswordStatus";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import ManageProducts from "./pages/ManageProducts";
import Profile from "./pages/Profile";
import _404_Page from "./pages/_404_Page";
import EditProduct from "./pages/EditProduct";

import "./App.css";
function App() {
  const windowUrlPath = window.location.pathname;

return (
  <BrowserRouter>
    {/* Hide Navbar on specific pages */}
    {!(
      windowUrlPath.startsWith("/edit-product/") ||
      windowUrlPath === "/user-dashboard" ||
      windowUrlPath === "/admin-dashboard" ||
      windowUrlPath === "/add-product" ||
      windowUrlPath === "/manage-products" ||
      windowUrlPath === "/profile"
    ) && <Navbar />}
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<_404_Page />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-account-success" element={<VerifyAccountSuccess />} />
      <Route path="/verify-account-failed" element={<VerifyAccountFailed />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/reset-password-status/:status" element={<ResetPasswordStatus />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/manage-products" element={<ManageProducts />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-product/:id" element={<EditProduct />} />
    </Routes>

    <Footer />
  </BrowserRouter>
);

}

export default App;
