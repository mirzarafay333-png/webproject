const express = require("express");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

app.use("/api/products", require("./routes/productRoutes"));

module.exports = app;