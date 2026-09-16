const Product = require("../models/Product");

async function list(req, res) {
    try {
        const { search = "", category = "" } = req.query;
        const filter = {};
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { sku: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } }
            ];
        }
        if (category) filter.category = category;
        const products = await Product.find(filter).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) { res.status(500).json({ message: error.message }); }
}

async function categories(req, res) {
    try { res.json(await Product.distinct("category")); }
    catch (error) { res.status(500).json({ message: error.message }); }
}

async function create(req, res) {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.code === 11000 ? "SKU already exists" : error.message });
    }
}

async function getOne(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) { res.status(400).json({ message: "Invalid product id" }); }
}

async function update(req, res) {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.code === 11000 ? "SKU already exists" : error.message });
    }
}

async function remove(req, res) {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted" });
    } catch (error) { res.status(400).json({ message: "Invalid product id" }); }
}

module.exports = { list, categories, create, getOne, update, remove };
