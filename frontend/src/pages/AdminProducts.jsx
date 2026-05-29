import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../services/productService";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("electronics");
  const [image, setImage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setTitle("");
    setPrice("");
    setCategory("electronics");
    setImage("");
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !price || !category || !image) {
      setStatusMessage("Please complete all fields.");
      return;
    }

    try {
      const productData = {
        title,
        price: Number(price),
        category,
        image,
      };

      if (editingId) {
        await updateProduct(editingId, productData);
        setStatusMessage("Product updated successfully.");
      } else {
        await createProduct(productData);
        setStatusMessage("Product created successfully.");
      }

      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err);
      setStatusMessage("Failed to save product.");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setTitle(product.title);
    setPrice(product.price.toString());
    setCategory(product.category);
    setImage(product.image);
    setStatusMessage("Editing product details.");
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setStatusMessage("Product deleted successfully.");
      fetchProducts();
    } catch (err) {
      console.error(err);
      setStatusMessage("Failed to delete product.");
    }
  };

  return (
    <div className="relative min-h-screen text-white px-6 py-10 overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full top-0 left-0" />
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[150px] rounded-full bottom-0 right-0" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-blue-300">
            Admin product manager
          </p>
          <h1 className="mt-4 text-5xl font-black text-slate-100">
            Create, edit and remove products
          </h1>
          <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
            Use this panel to manage the live catalog. Create premium product launches, edit pricing, and keep your storefront current.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/admin/orders" className="btn-secondary rounded-full px-6 py-3">
              Manage orders
            </Link>
            <button
              type="button"
              onClick={resetForm}
              className="btn-secondary rounded-full px-6 py-3"
            >
              New product
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-blue-300">Product form</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-100">
                {editingId ? "Edit product" : "Create new product"}
              </h2>
            </div>

            <div className="grid gap-4">
              <label className="block">
                <span className="text-sm text-slate-300">Title</span>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-field mt-2"
                  placeholder="Product title"
                />
              </label>

              <label className="block">
                <span className="text-sm text-slate-300">Price</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="input-field mt-2"
                  placeholder="Enter price"
                />
              </label>

              <label className="block">
                <span className="text-sm text-slate-300">Category</span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="input-field mt-2"
                >
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm text-slate-300">Image URL</span>
                <input
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="input-field mt-2"
                  placeholder="/images/product.jpg"
                />
              </label>
            </div>

            {statusMessage && (
              <p className="text-sm text-slate-300">{statusMessage}</p>
            )}

            <button type="submit" className="btn-primary w-full">
              {editingId ? "Save changes" : "Add product"}
            </button>
          </motion.form>

          <div className="space-y-4">
            <div className="glass-card p-8">
              <p className="text-sm uppercase tracking-[0.35em] text-blue-300">Live catalog</p>
              <p className="mt-2 text-slate-300">{products.length} products available</p>
            </div>

            <div className="glass-card p-6 space-y-4">
              {loading ? (
                <p className="text-slate-400">Loading products…</p>
              ) : error ? (
                <p className="text-red-400">{error}</p>
              ) : (
                products.map((product) => (
                  <div key={product.id} className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-base font-semibold text-slate-100">{product.title}</p>
                        <p className="mt-1 text-sm text-slate-400">{product.category}</p>
                        <p className="mt-2 text-lg font-bold text-slate-100">${product.price}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(product)}
                          className="rounded-full bg-blue-500/10 px-4 py-2 text-sm text-blue-200 hover:bg-blue-500/20"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          className="rounded-full bg-red-500/10 px-4 py-2 text-sm text-red-200 hover:bg-red-500/20"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
