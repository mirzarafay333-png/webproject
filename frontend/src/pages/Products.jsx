import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sort, setSort] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, priceRange, sort]);

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "all" || product.category === category;

      let matchesPrice = true;

      if (priceRange === "low") matchesPrice = product.price < 5000;
      if (priceRange === "mid")
        matchesPrice = product.price >= 5000 && product.price <= 10000;
      if (priceRange === "high") matchesPrice = product.price > 10000;

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sort === "low-high") return a.price - b.price;
      if (sort === "high-low") return b.price - a.price;
      return 0;
    });

  const itemsPerPage = 9;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const startItem = filteredProducts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(filteredProducts.length, currentPage * itemsPerPage);

  if (loading) {
    return (
      <div className="relative min-h-screen text-white px-6 py-16">
        <p className="text-center text-xl text-gray-300">
          Loading products...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen text-white px-6 py-16">
        <p className="text-center text-xl text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="absolute top-0 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-purple-500/20 blur-[140px]" />

      <div className="relative z-10 px-6 py-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-slate-200 border border-white/10 mb-4">
            Refined collection · Smart filters · premium presentation
          </p>

          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-100">
            Shop a curated lineup of premium products.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-slate-400 text-lg leading-relaxed">
            Find top-rated electronics, timeless fashion essentials and modern essentials with intuitive search and a clean shopping experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card mt-12 p-6 md:p-8"
        >
          <div className="grid gap-6 lg:grid-cols-[1.7fr_0.9fr]">
            <div className="space-y-5">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-blue-300">
                  Search & filter
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-100">
                  Narrow down your product search
                </h2>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products"
                  className="input-field pr-24"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-slate-950/70 px-3 py-2 text-xs uppercase tracking-[0.25em] text-slate-200">
                  Search
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Category
                  </label>
                  <select
                    className="input-field"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="all">All categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Price range
                  </label>
                  <select
                    className="input-field"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                  >
                    <option value="all">All prices</option>
                    <option value="low">Under 5000</option>
                    <option value="mid">5000 - 10000</option>
                    <option value="high">Above 10000</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 text-slate-300">
              <div className="mb-6">
                <p className="text-sm uppercase tracking-[0.35em] text-blue-300">
                  Overview
                </p>
                <p className="mt-3 text-lg font-semibold text-slate-100">
                  {filteredProducts.length} results
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-400">Current sort</p>
                  <p className="mt-1 text-slate-100">
                    {sort === "default"
                      ? "Recommended"
                      : sort === "low-high"
                      ? "Price: Low to High"
                      : "Price: High to Low"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-400">Showing</p>
                  <p className="mt-1 text-slate-100">{search ? `Search: "${search}"` : "All products"}</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setCategory("all");
                    setPriceRange("all");
                    setSort("default");
                  }}
                  className="btn-secondary w-full"
                >
                  Reset filters
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Sort by
            </label>
            <select
              className="input-field w-full"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">Recommended</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedProducts.length ? (
            paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="glass-card col-span-full p-12 text-center">
              <h2 className="text-2xl font-semibold text-slate-100">
                No products found
              </h2>
              <p className="mt-3 text-slate-400">
                Try adjusting your filters or search term to discover more products.
              </p>
            </div>
          )}
        </div>

        {filteredProducts.length > 0 && (
          <div className="mt-8 flex flex-col gap-4 items-center justify-between rounded-3xl border border-white/10 bg-slate-950/70 p-5 text-slate-300 sm:flex-row">
            <p className="text-sm text-slate-400">
              Showing {startItem}-{endItem} of {filteredProducts.length} products
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="btn-secondary rounded-full px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      currentPage === page
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                        : "bg-white/5 text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="btn-secondary rounded-full px-4 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
