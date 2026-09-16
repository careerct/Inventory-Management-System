const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    type: { type: String, enum: ["customer", "supplier", "expense", "income"], required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", default: null },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", default: null },
    amount: { type: Number, required: true, min: 0 },
    method: { type: String, enum: ["cash", "upi", "card", "bank", "credit"], required: true },
    status: { type: String, enum: ["paid", "pending"], default: "paid" },
    reference: { type: String, default: "" },
    paymentDate: { type: Date, default: Date.now },
    notes: { type: String, default: "" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
