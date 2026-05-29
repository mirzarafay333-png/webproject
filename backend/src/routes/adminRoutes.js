const router = require("express").Router();
const admin = require("../controllers/adminController");

router.post("/login", admin.login);

module.exports = router;