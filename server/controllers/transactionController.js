const mongoose = require("mongoose");
const Product = require("../models/Product");
const Supplier = require("../models/Supplier");
const Customer = require("../models/Customer");
const Purchase = require("../models/Purchase");
const Sale = require("../models/Sale");
const Payment = require("../models/Payment");

function statusFor(total, paid) {
    if (paid >= total) return "paid";
    if (paid > 0) return "partial";
    return "pending";
}

function validObjectId(id) { return mongoose.Types.ObjectId.isValid(id); }

async function listPurchases(req, res) {
    try { res.json(await Purchase.find().populate("supplier", "name company").populate("items.product", "name sku").sort({ purchaseDate: -1 })); }
    catch (e) { res.status(500).json({ message: e.message }); }
}

async function createPurchase(req, res) {
    const { supplier, items, paidAmount = 0, invoiceNumber, purchaseDate, notes = "" } = req.body;
    if (!validObjectId(supplier) || !Array.isArray(items) || !items.length || !invoiceNumber) return res.status(400).json({ message: "Supplier, invoice number and at least one item are required" });
    if (!(await Supplier.exists({ _id: supplier }))) return res.status(400).json({ message: "Supplier not found" });

    const normalized = [];
    let totalAmount = 0;
    for (const row of items) {
        if (!validObjectId(row.product) || Number(row.quantity) <= 0 || Number(row.unitCost) < 0) return res.status(400).json({ message: "Invalid purchase item" });
        const product = await Product.findById(row.product);
        if (!product) return res.status(400).json({ message: "Product not found" });
        const quantity = Number(row.quantity), unitCost = Number(row.unitCost), total = quantity * unitCost;
        normalized.push({ product: product._id, quantity, unitCost, total });
        totalAmount += total;
    }
    const paid = Number(paidAmount);
    if (paid < 0 || paid > totalAmount) return res.status(400).json({ message: "Paid amount must be between 0 and total amount" });

    try {
        const purchase = await Purchase.create({ supplier, items: normalized, totalAmount, paidAmount: paid, paymentStatus: statusFor(totalAmount, paid), invoiceNumber, purchaseDate, notes, createdBy: req.user._id });
        for (const row of normalized) await Product.findByIdAndUpdate(row.product, { $inc: { stock: row.quantity } });
        res.status(201).json(await Purchase.findById(purchase._id).populate("supplier", "name company").populate("items.product", "name sku"));
    } catch (e) { res.status(400).json({ message: e.code === 11000 ? "Invoice number already exists" : e.message }); }
}

async function listSales(req, res) {
    try { res.json(await Sale.find().populate("customer", "name phone").populate("items.product", "name sku").sort({ saleDate: -1 })); }
    catch (e) { res.status(500).json({ message: e.message }); }
}

async function createSale(req, res) {
    const { customer = null, items, paidAmount = 0, invoiceNumber, saleDate, notes = "" } = req.body;
    if (!Array.isArray(items) || !items.length || !invoiceNumber) return res.status(400).json({ message: "Invoice number and at least one item are required" });
    if (customer && (!validObjectId(customer) || !(await Customer.exists({ _id: customer })))) return res.status(400).json({ message: "Customer not found" });

    const normalized = [];
    let totalAmount = 0;
    for (const row of items) {
        if (!validObjectId(row.product) || Number(row.quantity) <= 0 || Number(row.unitPrice) < 0) return res.status(400).json({ message: "Invalid sale item" });
        const product = await Product.findById(row.product);
        if (!product) return res.status(400).json({ message: "Product not found" });
        const quantity = Number(row.quantity), unitPrice = Number(row.unitPrice);
        if (product.stock < quantity) return res.status(400).json({ message: `${product.name} has only ${product.stock} ${product.unit} in stock` });
        const total = quantity * unitPrice;
        normalized.push({ product: product._id, quantity, unitPrice, costPrice: product.costPrice, total });
        totalAmount += total;
    }
    const paid = Number(paidAmount);
    if (paid < 0 || paid > totalAmount) return res.status(400).json({ message: "Paid amount must be between 0 and total amount" });

    try {
        const sale = await Sale.create({ customer, items: normalized, totalAmount, paidAmount: paid, paymentStatus: statusFor(totalAmount, paid), invoiceNumber, saleDate, notes, createdBy: req.user._id });
        for (const row of normalized) await Product.findByIdAndUpdate(row.product, { $inc: { stock: -row.quantity } });
        res.status(201).json(await Sale.findById(sale._id).populate("customer", "name phone").populate("items.product", "name sku"));
    } catch (e) { res.status(400).json({ message: e.code === 11000 ? "Invoice number already exists" : e.message }); }
}

async function listPayments(req, res) {
    try { res.json(await Payment.find().populate("customer", "name").populate("supplier", "name company").sort({ paymentDate: -1 })); }
    catch (e) { res.status(500).json({ message: e.message }); }
}

async function createPayment(req, res) {
    try {
        const body = { ...req.body, amount: Number(req.body.amount), createdBy: req.user._id };
        if (body.customer && !(await Customer.exists({ _id: body.customer }))) return res.status(400).json({ message: "Customer not found" });
        if (body.supplier && !(await Supplier.exists({ _id: body.supplier }))) return res.status(400).json({ message: "Supplier not found" });
        res.status(201).json(await Payment.create(body));
    } catch (e) { res.status(400).json({ message: e.message }); }
}

module.exports = { listPurchases, createPurchase, listSales, createSale, listPayments, createPayment };
