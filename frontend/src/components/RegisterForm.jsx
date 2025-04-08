// eslint-disable-next-line no-unused-vars
import React from "react";
import { toast } from "react-toastify";
import { useState } from "react";
import API from "../API";
import axios from "axios";


function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API}/api/v1/signup`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="bg-white border border-amber-600 border-dotted rounded-md p-4">
      <h1 className="font-bold text-2xl text-center">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-3/4 mx-auto space-y-3"
      >
        <label className="text-gray-700 font-medium">First Name</label>
        <input
          className="p-2 border rounded-md focus:ring-2 focus:ring-amber-500"
          type="text"
          name="firstName"
          placeholder="Enter First Name"
          value={formData.firstName}
          onChange={handleChange}
        />

        <label className="text-gray-700 font-medium">Last Name</label>
        <input
          className="p-2 border rounded-md focus:ring-2 focus:ring-amber-500"
          type="text"
          name="lastName"
          placeholder="Enter Last Name"
          onChange={handleChange}
          value={formData.lastName}
        />

        <label className="text-gray-700 font-medium">Email</label>
        <input
          className="p-2 border rounded-md focus:ring-2 focus:ring-amber-500"
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          value={formData.email}
        />

        <label className="text-gray-700 font-medium">Password</label>
        <input
          className="p-2 border rounded-md focus:ring-2 focus:ring-amber-600"
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
          value={formData.password}
        />
        <button className="bg-amber-600 hover:bg-black text-white font-medium p-4 rounded-md transition-all">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
