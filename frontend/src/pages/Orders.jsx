import { useEffect, useState } from "react";
import api from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await api.get("/orders");
      setOrders(res.data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="relative min-h-screen px-6 py-12 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-blue-300">Order history</p>
          <h1 className="mt-4 text-4xl font-black text-slate-100">Your past orders</h1>
          <p className="mt-3 text-slate-400">Review status and totals for your recent purchases.</p>
        </div>

        {orders.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-xl font-semibold text-slate-100">No orders found</p>
            <p className="mt-3 text-slate-400">Place an order to see history here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="glass-card p-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-100">{order.customer?.name}</h3>
                    <p className="mt-2 text-slate-400">{order.customer?.phone || "No phone provided"}</p>
                  </div>
                  <div className="text-slate-200">
                    <p className="font-semibold">Total: ${order.total}</p>
                    <p className="mt-2">Status: <span className="text-blue-300">{order.status}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}