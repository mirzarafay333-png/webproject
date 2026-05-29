import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/admin/login", formData);

      localStorage.setItem("adminToken", res.data.token);

      navigate("/admin/orders");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full top-0 left-0"></div>
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[150px] rounded-full bottom-0 right-0"></div>

      {/* LOGIN CARD */}
      <motion.form
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        onSubmit={handleLogin}
        className="relative z-10 bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl w-[420px] shadow-2xl shadow-blue-500/20"
      >

        {/* TITLE */}
        <h2 className="text-4xl font-black text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Admin Panel
        </h2>

        <p className="text-center text-gray-400 mt-2 mb-8">
          Secure login access
        </p>

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-4 mb-4 rounded-xl bg-blue-500/10 border border-blue-400/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-4 mb-6 rounded-xl bg-blue-500/10 border border-blue-400/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 transition font-bold shadow-lg shadow-blue-500/30"
        >
          Login
        </button>

        {/* FOOTER TEXT */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Protected admin access only
        </p>

      </motion.form>
    </div>
  );
}