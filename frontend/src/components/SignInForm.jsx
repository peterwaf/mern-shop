// eslint-disable-next-line no-unused-vars
import React from "react";
import API from "../API";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/api/v1/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("firstName", response.data.firstName);
        navigate("/user-dashboard");
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="bg-white border border-amber-600 border-dotted rounded-md p-4">
      <h1 className="font-bold text-2xl text-center">Log In</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-3/4 mx-auto space-y-3"
      >
        <label className="text-gray-700 font-medium">Email</label>
        <input
          className="p-2 border rounded-md focus:ring-2 focus:ring-amber-500"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        <label className="text-gray-700 font-medium">Password</label>
        <input
          className="p-2 border rounded-md focus:ring-2 focus:ring-amber-600"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-amber-600 hover:bg-black text-white font-medium p-4 rounded-md transition-all"
        >
          Log In
        </button>
        <p>
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-amber-600 hover:underline">
            Sign Up
          </a>
        </p>
        <p>
          Forgot Password?{" "}
          <a href="/forgot-password" className="text-amber-600 hover:underline">
            Reset Password
          </a>
        </p>
      </form>
    </div>
  );
}

export default SignInForm;
