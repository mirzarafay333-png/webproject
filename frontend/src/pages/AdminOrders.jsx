import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/orders/${id}`, { status });
    fetchOrders();
  };

  const deleteOrder = async (id) => {
    await api.delete(`/orders/${id}`);
    fetchOrders();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-400/30";
      case "shipped":
        return "bg-blue-500/20 text-blue-300 border-blue-400/30";
      case "delivered":
        return "bg-green-500/20 text-green-300 border-green-400/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/30";
    }
  };

  return (
    <div className="relative min-h-screen text-white px-6 py-10 overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full top-0 left-0" />
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[150px] rounded-full bottom-0 right-0" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.35em] text-blue-300">Admin dashboard</p>
          <h1 className="mt-4 text-5xl font-black text-slate-100">Orders overview</h1>
          <p className="mt-3 text-slate-400">Manage order status, review details, and keep fulfillment moving.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 sm:justify-center">
            <Link to="/admin/products" className="btn-secondary rounded-full px-5 py-3">
              Manage products
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card p-6 shadow-lg"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-100">{order.customer?.name || "Guest"}</h2>
                  <p className="mt-2 text-slate-400">{order.customer?.phone || "No phone number"}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-100">${order.total}</p>
                  <span className={`inline-flex mt-2 rounded-full border px-3 py-1 text-sm ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="text-slate-300 text-sm">Items: {order.items?.length || 0}</div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => updateStatus(order.id, "pending")}
                    className="rounded-xl bg-yellow-500/20 px-4 py-2 text-yellow-300 hover:scale-105 transition"
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => updateStatus(order.id, "shipped")}
                    className="rounded-xl bg-blue-500/20 px-4 py-2 text-blue-300 hover:scale-105 transition"
                  >
                    Shipped
                  </button>
                  <button
                    onClick={() => updateStatus(order.id, "delivered")}
                    className="rounded-xl bg-green-500/20 px-4 py-2 text-green-300 hover:scale-105 transition"
                  >
                    Delivered
                  </button>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="ml-auto rounded-xl bg-red-500/20 px-4 py-2 text-red-300 hover:scale-105 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}