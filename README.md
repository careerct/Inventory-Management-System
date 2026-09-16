# InventoryPro - AI-Powered Inventory & Accounts Management System

Professional MERN web application for inventory, purchases, sales, payments, reports and rule-based AI insights, with a structure ready for a Python ML service.

## Stack
- React + Vite
- Node.js + Express
- MongoDB + Mongoose
- JWT + bcryptjs
- Recharts
- Python/scikit-learn starter AI service files

## Setup
1. Install Node.js and MongoDB.
2. Copy `server/.env.example` to `server/.env` and set your MongoDB URI, JWT secret and admin credentials.
3. Run `npm run install:all` from the project root.
4. Run `npm run seed:admin --prefix server`.
5. Start backend: `npm run dev --prefix server`.
6. Start frontend: `npm run dev --prefix client`.
7. Open `http://localhost:5173`.

The database starts empty except for the admin user created by the seed command. No demo products, customers, suppliers, sales or purchases are inserted.
