const express = require("express");
const { reports } = require("../controllers/reportController");
const router = express.Router();
router.get("/", reports);
module.exports = router;
