const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
dotenv.config();
const { protect } = require("./middleware/authMiddleware");
const { dashboard } = require("./controllers/reportController");

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", protect, require("./routes/productRoutes"));
app.use("/api/suppliers", protect, require("./routes/supplierRoutes"));
app.use("/api/customers", protect, require("./routes/customerRoutes"));
app.use("/api/purchases", protect, require("./routes/purchaseRoutes"));
app.use("/api/sales", protect, require("./routes/saleRoutes"));
app.use("/api/payments", protect, require("./routes/paymentRoutes"));
app.use("/api/reports", protect, require("./routes/reportRoutes"));
app.use("/api/ai", protect, require("./routes/aiRoutes"));
app.get("/api/dashboard", protect, dashboard);
app.get("/", (req, res) => res.json({ message: "Inventory Management API is running" }));
app.use((req, res) => res.status(404).json({ message: "API endpoint not found" }));
app.use((err, req, res, next) => { console.error(err); res.status(500).json({ message: err.message || "Server error" }); });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
