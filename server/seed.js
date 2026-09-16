const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");
dotenv.config();

async function seed() {
    await connectDB();
    const email = String(process.env.ADMIN_EMAIL || "").trim().toLowerCase();
    const password = String(process.env.ADMIN_PASSWORD || "");
    const name = String(process.env.ADMIN_NAME || "System Administrator").trim();
    if (!email || !password) { console.error("ADMIN_EMAIL and ADMIN_PASSWORD are required in .env"); process.exit(1); }
    const existing = await User.findOne({ email });
    if (existing) { console.log("Admin already exists"); process.exit(0); }
    const hash = await bcrypt.hash(password, 12);
    await User.create({ name, email, password: hash, role: "admin" });
    console.log("Admin created");
    process.exit(0);
}
seed();
