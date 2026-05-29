import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  removeFromCart,
  clearCart,
} from "../features/cart/cartSlice";
import api from "../services/api";

export default function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state?.cart?.cartItems ?? []
  );

  const [showCheckout, setShowCheckout] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const total = cartItems.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!cartItems.length) return;

    try {
      const orderData = {
        customer: formData,
        items: cartItems,
        total,
      };

      await api.post("/orders", orderData);

      alert("Order placed successfully!");

      dispatch(clearCart());
      setShowCheckout(false);

      setFormData({
        name: "",
        address: "",
        phone: "",
      });
    } catch (err) {
      console.error(err);
      alert("Order failed!");
    }
  };

  return (
    <div className="relative min-h-screen text-white px-6 py-12 overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full top-0 left-0" />
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[150px] rounded-full bottom-0 right-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.35em] text-blue-300">Review your cart</p>
          <h1 className="mt-4 text-4xl font-black text-slate-100">Your shopping cart</h1>
          <p className="mt-3 text-slate-400">Manage your items, view order totals, and checkout securely.</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-xl font-semibold text-slate-100">Your cart is empty</p>
            <p className="mt-3 text-slate-400">Add a few items to continue shopping.</p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.6fr_0.9fr]">
            <div className="space-y-5">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card p-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img src={item.image} className="w-24 h-24 object-cover rounded-3xl" alt={item.title} />
                    <div>
                      <h3 className="font-semibold text-slate-100">{item.title}</h3>
                      <p className="text-slate-400 text-sm">${item.price} × {item.quantity}</p>
                      <p className="mt-2 text-blue-300 font-semibold">Subtotal: ${item.price * item.quantity}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="rounded-2xl bg-red-500/20 px-4 py-2 text-red-300 transition hover:bg-red-500/30"
                  >
                    Remove
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="glass-card p-6">
              <h2 className="text-2xl font-semibold text-slate-100">Order summary</h2>
              <div className="mt-6 space-y-3 text-slate-300">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span>{cartItems.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="font-semibold text-blue-300">${total}</span>
                </div>
              </div>
              <button
                onClick={() => setShowCheckout(true)}
                className="btn-primary w-full mt-8"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={() => dispatch(clearCart())}
                className="btn-secondary w-full mt-3"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}

        {showCheckout && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
            <motion.form
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onSubmit={handleCheckout}
              className="glass-card w-full max-w-md p-8"
            >
              <h2 className="text-2xl font-bold text-slate-100 text-center mb-6">Checkout</h2>

              <div className="space-y-4">
                <input
                  name="name"
                  placeholder="Full Name"
                  className="input-field"
                  onChange={handleChange}
                  required
                />
                <input
                  name="address"
                  placeholder="Address"
                  className="input-field"
                  onChange={handleChange}
                  required
                />
                <input
                  name="phone"
                  placeholder="Phone"
                  className="input-field"
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full mt-6">
                Place Order
              </button>
              <button type="button" onClick={() => setShowCheckout(false)} className="btn-secondary w-full mt-3">
                Cancel
              </button>
            </motion.form>
          </div>
        )}
      </div>
    </div>
  );
}