import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // fake auth (frontend only)
    const user = {
      name: form.name,
      email: form.email,
    };

    dispatch(
      loginSuccess({
        user,
        token: "fake-token",
      })
    );

    navigate("/");
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.16),_transparent_25%)]" />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <form
          onSubmit={handleRegister}
          className="glass-card max-w-md w-full p-8"
        >
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-blue-300">Create your account</p>
            <h1 className="mt-4 text-4xl font-black text-slate-100">Register</h1>
            <p className="mt-3 text-slate-400">Start shopping with a premium account.</p>
          </div>

          <div className="space-y-4">
            <input
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <button className="btn-primary mt-6 w-full">Register</button>
        </form>
      </div>
    </div>
  );
}