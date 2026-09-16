const express = require("express");
const { aiInsights } = require("../controllers/reportController");
const router = express.Router();
router.get("/insights", aiInsights);
module.exports = router;
