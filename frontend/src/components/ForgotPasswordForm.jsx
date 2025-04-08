// eslint-disable-next-line no-unused-vars
import React from "react";
import { toast } from "react-toastify";
import { useState } from "react";
import API from "../API";
import axios from "axios";

function ForgotPasswordForm() {
  const [formData, setFormData] = useState({
    email: "",
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
      const response = await axios.post(
        `${API}/api/v1/forgot-password-notice`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="bg-white border border-amber-600 border-dotted rounded-md p-4">
      <h1 className="font-bold text-2xl text-center">Reset Password</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-3/4 mx-auto space-y-3"
      >
        <p>Did you forget your password?</p>
        <p>
          Don&apos;t worry, we&apos;ll send you an email to reset your password
        </p>
        <p>Enter the email address associated with your account below</p>
        <label className="text-gray-700 font-medium">Enter Your Email</label>
        <input
          className="p-2 border rounded-md focus:ring-2 focus:ring-amber-500"
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          placeholder="Enter your email"
        />
        <button
          type="submit"
          className="bg-amber-600 hover:bg-black text-white font-medium p-4 rounded-md transition-all"
        >
          Send Email{" "}
        </button>
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
