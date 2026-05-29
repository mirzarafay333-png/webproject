import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Menu,
  X,
  
  ShieldCheck,
  LogOut,
} from "lucide-react";

import { useState } from "react";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);

  const cartCount = useSelector(
    (state) => state.cart.cartItems.length
  );

  const token = localStorage.getItem("adminToken");

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur-3xl shadow-[0_20px_80px_rgba(15,23,42,0.35)]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-[24px] bg-gradient-to-br from-blue-500 to-purple-500 text-lg font-black text-white shadow-[0_20px_60px_rgba(59,130,246,0.25)]">
            S
          </div>
          <div>
            <p className="text-lg font-semibold tracking-[0.2em] text-slate-100">ShopAR</p>
            <p className="text-xs uppercase text-slate-400">Modern luxury commerce</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
          <Link to="/cart" className="relative nav-link">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-red-500 px-2 text-[10px] font-bold text-white shadow-lg shadow-red-500/40">
                {cartCount}
              </span>
            )}
          </Link>

          {!token ? (
            <Link to="/admin/login" className="btn-secondary">Admin Login</Link>
          ) : (
            <>
              <Link to="/admin/orders" className="btn-secondary">Dashboard</Link>
              <button
                onClick={() => {
                  localStorage.removeItem("adminToken");
                  window.location.href = "/admin/login";
                }}
                className="btn-secondary"
              >
                Logout
              </button>
            </>
          )}
        </div>

        <button
          className="md:hidden text-slate-200"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-950/95 px-6 py-5 backdrop-blur-3xl text-slate-100 space-y-4">
          <Link to="/" className="block py-2 nav-link">Home</Link>
          <Link to="/products" className="block py-2 nav-link">Products</Link>
          <Link to="/cart" className="block py-2 nav-link">Cart ({cartCount})</Link>

          {!token ? (
            <Link to="/admin/login" className="block rounded-2xl bg-purple-600 px-4 py-3 text-center text-white shadow-lg shadow-purple-500/20">
              Admin Login
            </Link>
          ) : (
            <>
              <Link to="/admin/orders" className="block rounded-2xl bg-blue-600 px-4 py-3 text-center text-white shadow-lg shadow-blue-500/20">
                Dashboard
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("adminToken");
                  window.location.href = "/admin/login";
                }}
                className="w-full rounded-2xl bg-red-600 px-4 py-3 text-white shadow-lg shadow-red-500/20"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}