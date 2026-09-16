const express = require("express");
const { listPurchases, createPurchase } = require("../controllers/transactionController");
const router = express.Router();
router.get("/", listPurchases); router.post("/", createPurchase);
module.exports = router;
