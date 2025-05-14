

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
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
      const res = await axios.post("http://13.203.206.230:4000/api/auth/login", form);

      // ✅ Token ko localStorage me save karo
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token); // 👈 Important line
      }

      setMessage(res.data.message); // Message dikhane ke liye

      // Correct way to check the status
 
      const res2 = await axios.get("http://13.203.206.230:4000/api/premium/status", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (res2.data.isPremium) {
        navigate("/leaderdashboard"); // ✅ Paid user
      } else {
        navigate("/dashboard"); // ✅ Normal user
      }




      //navigate("/dashboard"); // ✅ Home page redirect
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Login</h2>

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

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-red-500">{message}</p>
        )}

        <p className="mt-4 text-center text-sm">
          Not registered?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>

        <p className="mt-4 text-center text-sm">
        Forgot Password?{" "}
          <Link to="/sendemail" className="text-blue-500 hover:underline">
          Reset Password
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
