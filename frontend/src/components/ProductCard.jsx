import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      })
    );

    toast.success("Added to cart!");
  };

  return (
    <motion.div whileHover={{ y: -6 }} className="glass-card overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-72 w-full object-cover transition duration-500 hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-slate-950/80 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-200 shadow-sm shadow-black/20">
          {product.category || "Product"}
        </span>
      </div>

      <div className="p-6 space-y-4">
        <h2 className="text-lg font-semibold text-slate-100 leading-snug">{product.title}</h2>

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-slate-400 text-sm">Starting at</p>
            <p className="text-blue-300 text-xl font-bold">${product.price}</p>
          </div>

          <button
            onClick={handleAdd}
            className="btn-primary h-12 w-12 rounded-[18px] p-0"
            aria-label={`Add ${product.title} to cart`}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}