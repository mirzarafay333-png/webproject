const router = require("express").Router();
const product = require("../controllers/productController");

router.get("/", product.getAll);
router.get("/:id", product.getById);
router.post("/", product.createProduct);
router.put("/:id", product.updateProduct);
router.delete("/:id", product.deleteProduct);

module.exports = router;