import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Cart from "./pages/Cart";

import Orders from "./pages/Orders";
import AdminOrders from "./pages/AdminOrders";
import AdminProducts from "./pages/AdminProducts";
import AdminLogin from "./pages/AdminLogin";

import AdminProtectedRoute from "./components/AdminProtectedRoute";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050816] via-[#0b1220] to-[#020617] text-white">

      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />

          {/* ADMIN LOGIN */}
          <Route
            path="/admin/login"
            element={<AdminLogin />}
          />

          {/* PROTECTED ADMIN PANEL */}
          <Route
            path="/admin/orders"
            element={
              <AdminProtectedRoute>
                <AdminOrders />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AdminProtectedRoute>
                <AdminProducts />
              </AdminProtectedRoute>
            }
          />

        </Routes>
      </AnimatePresence>

      <Footer />

    </div>
  );
}

export default App;