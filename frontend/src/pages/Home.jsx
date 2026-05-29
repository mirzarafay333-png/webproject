import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  Star,
} from "lucide-react";

export default function Home() {
  return (
    <div className="relative overflow-hidden min-h-screen text-white">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full"></div>

      {/* HERO SECTION */}
      <section className="relative z-10 px-6 py-20">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full backdrop-blur-xl mb-6">

              <Star className="text-yellow-400" size={18} />

              <span className="text-sm">
                #1 Premium Ecommerce Experience
              </span>

            </div>

            {/* HEADING */}
            <h1 className="text-6xl md:text-7xl font-black leading-tight">

              Shop Smarter With{" "}

              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                ShopAR
              </span>

            </h1>

            {/* DESCRIPTION */}
            <p className="mt-8 text-gray-300 text-lg leading-relaxed max-w-xl">

              Discover luxury fashion, premium gadgets,
              trending accessories and next-generation
              shopping experiences with lightning-fast delivery.

            </p>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-wrap gap-5">

              <Link
                to="/products"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-blue-500/30"
              >
                Explore Products
              </Link>

            

            </div>

            {/* STATS */}
            <div className="mt-14 grid grid-cols-3 gap-6">

              <div>
                <h2 className="text-3xl font-black text-blue-400">
                  10K+
                </h2>
                <p className="text-gray-400 mt-1">
                  Happy Customers
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-black text-purple-400">
                  500+
                </h2>
                <p className="text-gray-400 mt-1">
                  Premium Products
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-black text-cyan-400">
                  24/7
                </h2>
                <p className="text-gray-400 mt-1">
                  Support
                </p>
              </div>

            </div>

          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >

            {/* IMAGE GLOW */}
            <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full"></div>

            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
              alt="ShopX Hero"
              className="relative rounded-[40px] shadow-2xl shadow-blue-500/30 border border-white/10"
            />

          </motion.div>

        </div>

      </section>

      {/* FEATURES SECTION */}
      <section className="relative z-10 px-6 pb-24">

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

          {/* CARD */}
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-3xl"
          >

            <ShoppingBag
              className="text-blue-400 mb-5"
              size={40}
            />

            <h2 className="text-2xl font-bold">
              Premium Products
            </h2>

            <p className="text-gray-400 mt-4">
              Curated collections of top-quality fashion,
              electronics and lifestyle products.
            </p>

          </motion.div>

          {/* CARD */}
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-3xl"
          >

            <Truck
              className="text-purple-400 mb-5"
              size={40}
            />

            <h2 className="text-2xl font-bold">
              Fast Delivery
            </h2>

            <p className="text-gray-400 mt-4">
              Lightning-fast shipping with real-time order
              tracking and secure delivery systems.
            </p>

          </motion.div>

          {/* CARD */}
          <motion.div
            whileHover={{ y: -10 }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-3xl"
          >

            <ShieldCheck
              className="text-cyan-400 mb-5"
              size={40}
            />

            <h2 className="text-2xl font-bold">
              Secure Payments
            </h2>

            <p className="text-gray-400 mt-4">
              Your transactions are protected with advanced
              security and encrypted payment gateways.
            </p>

          </motion.div>

        </div>

      </section>

    </div>
  );
}