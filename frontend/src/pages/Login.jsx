import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });

    dispatch(loginSuccess(res.data));
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.16),_transparent_25%)]" />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <div className="glass-card max-w-md w-full p-8">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-blue-300">Welcome back</p>
            <h1 className="mt-4 text-4xl font-black text-slate-100">Login to your account</h1>
            <p className="mt-3 text-slate-400">Secure access to your orders and profile.</p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            <label className="block space-y-2 text-sm text-slate-200">
              <span>Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@example.com"
              />
            </label>

            <label className="block space-y-2 text-sm text-slate-200">
              <span>Password</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter your password"
              />
            </label>

            <button type="submit" className="btn-primary w-full">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}