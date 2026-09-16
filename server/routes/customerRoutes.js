const express = require("express");
const Customer = require("../models/Customer");
const makeController = require("../controllers/contactController");
const c = makeController(Customer, "Customer");
const router = express.Router();
router.get("/", c.list); router.post("/", c.create); router.put("/:id", c.update); router.delete("/:id", c.remove);
module.exports = router;
