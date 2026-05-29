const { AppDataSource } = require("../data-source");
const Product = require("../entities/Product");

exports.getAll = async (req, res) => {
  const repo = AppDataSource.getRepository(Product);
  const data = await repo.find();
  res.json(data);
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  const repo = AppDataSource.getRepository(Product);
  const product = await repo.findOneBy({ id: Number(id) });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};

exports.createProduct = async (req, res) => {
  const { title, price, category, image } = req.body;
  const repo = AppDataSource.getRepository(Product);
  const product = repo.create({ title, price, category, image });
  const result = await repo.save(product);
  res.status(201).json(result);
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, price, category, image } = req.body;
  const repo = AppDataSource.getRepository(Product);
  const product = await repo.findOneBy({ id: Number(id) });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.title = title ?? product.title;
  product.price = price ?? product.price;
  product.category = category ?? product.category;
  product.image = image ?? product.image;

  const updated = await repo.save(product);
  res.json(updated);
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const repo = AppDataSource.getRepository(Product);
  const product = await repo.findOneBy({ id: Number(id) });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  await repo.remove(product);
  res.json({ success: true, message: "Product deleted" });
};