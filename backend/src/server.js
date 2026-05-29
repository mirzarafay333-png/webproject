const express = require("express");
const cors = require("cors");
const { AppDataSource } = require("./data-source");

const adminRoutes = require("./routes/adminRoutes");

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const Product = require("./entities/Product");
const app = express();

// MIDDLEWARE
app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());

// ROUTES

app.use("/admin", adminRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

const seedProducts = async () => {
  const repo = AppDataSource.getRepository(Product);
  const count = await repo.count();

  if (count > 0) return;

  const products = [
    { id: 1, title: "Smart Watch Pro X", category: "electronics", price: 4000, image: "/images/newsma.jpg" },
    { id: 2, title: "Wireless Noise Cancelling Headphones", category: "electronics", price: 2500, image: "/images/new.jpg" },
    { id: 3, title: "Gaming Mechanical Keyboard RGB", category: "electronics", price: 8000, image: "/images/gaming.jpg" },
    { id: 4, title: "Minimalist Leather Jacket", category: "fashion", price: 15000, image: "/images/leather.jpg" },
    { id: 5, title: "Classic White Sneakers", category: "fashion", price: 4500, image: "/images/sneakers.jpg" },
    { id: 6, title: "ROLEX", category: "fashion", price: 18000, image: "/images/rolex.jpg" },
    { id: 7, title: "hp elite book 840 G8", category: "electronics", price: 180000, image: "/images/hp.jpg" },
    { id: 8, title: "BRACELET", category: "fashion", price: 1800, image: "/images/braclet.jpg" },
    { id: 9, title: "CHAIN", category: "fashion", price: 1500, image: "/images/chain.jpg" },
    { id: 10, title: "RAM DDR4", category: "electronics", price: 15000, image: "/images/ram.jpg" },
    { id: 11, title: "SAMSUNG SSD 512gb", category: "electronics", price: 25000, image: "/images/ssd.jpg" },
    { id: 12, title: "Oxford shoes", category: "fashion", price: 28000, image: "/images/ox.jpg" },
    { id: 13, title: "Chelsea", category: "fashion", price: 17000, image: "/images/chelsea.jpg" },
    { id: 14, title: "Badminton Shoes", category: "fashion", price: 30000, image: "/images/bad.jpg" },
    { id: 15, title: "Cooling Fan", category: "electronics", price: 8000, image: "/images/cool.jpg" },
    { id: 16, title: "Cuban link Chain", category: "fashion", price: 2000, image: "/images/cuban.jpg" },
    { id: 17, title: "Hp Zbook", category: "electronics", price: 250000, image: "/images/zbook.jpg" },
    { id: 18, title: "POLO T Shirt", category: "fashion", price: 5000, image: "/images/polo.jpg" },
    { id: 19, title: "Two piece suit", category: "fashion", price: 14000, image: "/images/two.jpg" },
    { id: 20, title: "Graphic Card", category: "electronics", price: 40000, image: "/images/gra.jpg" },
  ];

  await repo.save(products);
  console.log("Seeded initial products");
};

// START SERVER
AppDataSource.initialize()
  .then(async () => {
    console.log("Database connected");
    await seedProducts();

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => console.log(err));