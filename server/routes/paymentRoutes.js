const express = require("express");
const { listPayments, createPayment } = require("../controllers/transactionController");
const router = express.Router();
router.get("/", listPayments); router.post("/", createPayment);
module.exports = router;
