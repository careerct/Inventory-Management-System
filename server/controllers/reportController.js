const Product = require("../models/Product");
const Purchase = require("../models/Purchase");
const Sale = require("../models/Sale");
const Payment = require("../models/Payment");
const Supplier = require("../models/Supplier");
const Customer = require("../models/Customer");

async function dashboard(req, res) {
    try {
        const [totalProducts, totalSuppliers, totalCustomers, purchases, sales, payments, lowStockProducts] = await Promise.all([
            Product.countDocuments(), Supplier.countDocuments(), Customer.countDocuments(), Purchase.find(), Sale.find(), Payment.find(),
            Product.find({ $expr: { $lte: ["$stock", "$minStock"] } }).sort({ stock: 1 }).limit(10)
        ]);
        const totalPurchase = purchases.reduce((s, x) => s + Number(x.totalAmount || 0), 0);
        const totalSales = sales.reduce((s, x) => s + Number(x.totalAmount || 0), 0);
        const totalPayments = payments.reduce((s, x) => s + Number(x.amount || 0), 0);
        const grossProfit = sales.reduce((s, sale) => s + sale.items.reduce((a, item) => a + ((item.unitPrice - item.costPrice) * item.quantity), 0), 0);
        res.json({ totalProducts, totalSuppliers, totalCustomers, totalPurchases: purchases.length, totalSalesCount: sales.length, totalPaymentsCount: payments.length, totalPurchase, totalSales, totalPayments, grossProfit, lowStockCount: lowStockProducts.length, lowStockProducts });
    } catch (e) { res.status(500).json({ message: e.message }); }
}

async function reports(req, res) {
    try {
        const [sales, purchases, payments] = await Promise.all([
            Sale.find().populate("customer", "name").populate("items.product", "name sku"),
            Purchase.find().populate("supplier", "name").populate("items.product", "name sku"),
            Payment.find().populate("customer", "name").populate("supplier", "name")
        ]);
        const productMap = {};
        sales.forEach(sale => sale.items.forEach(item => {
            const key = item.product?._id?.toString() || "unknown";
            if (!productMap[key]) productMap[key] = { name: item.product?.name || "Unknown Product", quantity: 0, revenue: 0 };
            productMap[key].quantity += item.quantity;
            productMap[key].revenue += item.total;
        }));
        const topProducts = Object.values(productMap).sort((a, b) => b.quantity - a.quantity).slice(0, 10);
        const totalSales = sales.reduce((s, x) => s + x.totalAmount, 0);
        const totalPurchases = purchases.reduce((s, x) => s + x.totalAmount, 0);
        const totalPayments = payments.reduce((s, x) => s + x.amount, 0);
        const grossProfit = sales.reduce((s, sale) => s + sale.items.reduce((a, item) => a + ((item.unitPrice - item.costPrice) * item.quantity), 0), 0);
        res.json({ totalSales, totalPurchases, totalPayments, grossProfit, salesCount: sales.length, purchaseCount: purchases.length, paymentCount: payments.length, topProducts });
    } catch (e) { res.status(500).json({ message: e.message }); }
}

async function aiInsights(req, res) {
    try {
        const products = await Product.find();
        const recentSales = await Sale.find({ saleDate: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } });
        const demand = {};
        recentSales.forEach(sale => sale.items.forEach(item => { const k = item.product.toString(); demand[k] = (demand[k] || 0) + item.quantity; }));
        const insights = [];
        products.forEach(product => {
            const sold30 = demand[product._id.toString()] || 0;
            if (product.stock <= product.minStock) insights.push({ type: "LOW_STOCK", product: product.name, metric: product.stock, message: `${product.name} is at or below its minimum stock level.`, severity: "high" });
            if (product.stock > Math.max(product.minStock * 5, 20) && sold30 === 0) insights.push({ type: "DEAD_STOCK", product: product.name, metric: product.stock, message: `${product.name} has stock but no recorded sales in the last 30 days.`, severity: "medium" });
            if (sold30 > 20) insights.push({ type: "HIGH_DEMAND", product: product.name, metric: sold30, message: `${product.name} sold ${sold30} units in the last 30 days.`, severity: "info" });
        });
        res.json({ generatedAt: new Date(), totalInsights: insights.length, insights });
    } catch (e) { res.status(500).json({ message: e.message }); }
}

module.exports = { dashboard, reports, aiInsights };
