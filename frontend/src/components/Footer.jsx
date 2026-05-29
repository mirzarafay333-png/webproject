import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer-panel">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              ShopAR
            </h2>
            <p className="mt-4 text-sm text-slate-400 max-w-sm">
              Designed for modern stores and premium brands. Build trust with a clean and confident commerce experience.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Quick Links</h3>
            <ul className="space-y-3 text-slate-400">
              <li>Products</li>
              <li>Cart</li>
              <li>Orders</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Follow Us</h3>
            <div className="flex items-center gap-4 text-2xl text-slate-300">
              <FaFacebook className="hover:text-blue-500 transition cursor-pointer" />
              <FaInstagram className="hover:text-pink-500 transition cursor-pointer" />
              <FaTwitter className="hover:text-sky-400 transition cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-slate-500">
          © 2026 RAFAY. All rights reserved.
        </div>
      </div>
    </footer>
  );
}