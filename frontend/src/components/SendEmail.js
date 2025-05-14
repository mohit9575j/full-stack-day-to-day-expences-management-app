

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SendEmail = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Input field change handle
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Form submit handle
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://13.203.206.230:4000/api/auth/reset-password-request", form);

      // ✅ Token ko localStorage me save karo
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token); // 👈 Important line
      }

      setMessage(res.data.message); // Message dikhane ke liye
      navigate("/set-new-password"); // ✅ Home page redirect
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Submit Email</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
 
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-red-500">{message}</p>
        )}

      </div>
    </div>
  );
};

export default SendEmail;
