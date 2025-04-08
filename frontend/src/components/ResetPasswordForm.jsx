// eslint-disable-next-line no-unused-vars
import React from "react";
import API from "../API";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ResetPasswordForm() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { token } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword){
      toast.error("Passwords do not match");
      return
    }
    try {
      const response = await axios.post(
        `${API}/api/v1/reset-password/${token}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        navigate("/reset-password-status/success");
      }
    } catch (error) {
      console.log(error.response.data.error);
      navigate("/reset-password-status/failed");
    }
  };

  return (
    <div className="bg-white border border-amber-600 border-dotted rounded-md p-4">
      <h1 className="font-bold text-2xl text-center">Reset Password</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-3/4 mx-auto space-y-3"
      >
        <input
          className="p-2 border rounded-md focus:ring-2 focus:ring-amber-500"
          type="password"
          name="password"
          value={formData.password}
          placeholder="Enter your new password"
          onChange={handleChange}
        />
        <input
          className="p-2 border rounded-md focus:ring-2 focus:ring-amber-500"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          placeholder="Repeat your new password"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-amber-600 hover:bg-black text-white font-medium p-4 rounded-md transition-all"
        >
          Reset
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
