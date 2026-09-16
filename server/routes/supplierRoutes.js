const express = require("express");
const Supplier = require("../models/Supplier");
const makeController = require("../controllers/contactController");
const c = makeController(Supplier, "Supplier");
const router = express.Router();
router.get("/", c.list); router.post("/", c.create); router.put("/:id", c.update); router.delete("/:id", c.remove);
module.exports = router;
