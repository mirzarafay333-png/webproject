const router = require("express").Router();
const orderController = require("../controllers/orderController");

// ✅ MAKE SURE THESE ARE REAL FUNCTIONS
router.post("/", orderController.createOrder);
router.get("/", orderController.getAllOrders);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;