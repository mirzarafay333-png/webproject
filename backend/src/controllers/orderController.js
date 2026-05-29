const { AppDataSource } = require("../data-source");
const Order = require("../entities/Order");

// CREATE ORDER (CUSTOMER CHECKOUT)
exports.createOrder = async (req, res) => {
  try {
    const { customer, items, total } = req.body;

    if (!customer || !items || items.length === 0) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const repo = AppDataSource.getRepository(Order);

    const newOrder = repo.create({
      customer,
      items,
      total,
      status: "pending",
    });

    const saved = await repo.save(newOrder);

    res.status(201).json(saved);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Create order failed" });
  }
};

// GET ALL ORDERS
exports.getAllOrders = async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(Order);
    const orders = await repo.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

// UPDATE ORDER
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const repo = AppDataSource.getRepository(Order);

    const order = await repo.findOneBy({ id: Number(id) });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;

    const updated = await repo.save(order);

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// DELETE ORDER
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const repo = AppDataSource.getRepository(Order);

    await repo.delete(id);

    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};