# AI-Powered Inventory & Accounts Management System

A full-stack web-based Inventory and Accounts Management System built using the **MERN stack**. The application helps businesses manage products, suppliers, customers, purchases, sales, payments, inventory levels, reports, and intelligent inventory insights from a centralized dashboard.

The project follows a modular architecture with a React frontend, Node.js/Express backend, MongoDB database, and a Python-based AI module for future machine-learning integration.

---

## 📌 Project Overview

Managing inventory manually can lead to problems such as:

- Incorrect stock calculations
- Overstocking and understocking
- Difficulty tracking purchases and sales
- Poor visibility of customer and supplier transactions
- Manual payment tracking
- Difficulty generating reports
- Lack of data-driven inventory decisions

This system provides a centralized web application to manage these operations digitally.

The application allows authorized users to:

- Manage products and stock
- Manage suppliers and customers
- Record purchases
- Record sales
- Track payments
- Monitor low-stock products
- View business statistics
- Generate reports
- Analyze inventory activity
- Receive intelligent inventory insights

---

# 🚀 Features

## 1. Authentication & Authorization

The application provides secure user authentication using:

- JWT (JSON Web Token)
- Password hashing with bcrypt
- Role-based access
- Protected frontend routes
- Protected backend APIs

### User Roles

The system supports:

- Admin
- Staff

Different roles can be given different permissions depending on the application's requirements.

---

# 2. Dashboard

The dashboard provides an overview of the business.

### Dashboard information includes:

- Total Products
- Total Suppliers
- Total Customers
- Total Purchases
- Total Sales
- Total Payments
- Profit summary
- Low-stock products
- Inventory statistics
- Financial information
- Charts and visual summaries

The dashboard retrieves information from the backend rather than using hardcoded values.

---

# 3. Product Management

Products can be managed from the Products module.

### Product information

Each product can contain:

- Product name
- SKU
- Category
- Description
- Cost price
- Selling price
- Current stock
- Minimum stock level
- Unit

### Operations

- Add product
- Edit product
- Delete product
- Search product
- Filter products
- Monitor stock
- Identify low-stock products

---

# 4. Supplier Management

The supplier module stores supplier information.

### Supplier information

- Supplier name
- Company
- Email
- Phone
- Address
- Notes

### Operations

- Add supplier
- Edit supplier
- Delete supplier
- Search suppliers
- View supplier information

---

# 5. Customer Management

The customer module manages customer information.

### Customer information

- Customer name
- Email
- Phone
- Address
- Notes

### Operations

- Add customer
- Edit customer
- Delete customer
- Search customers
- View customer information

---

# 6. Purchase Management

The Purchase module records purchases made from suppliers.

A purchase can contain multiple products.

### Purchase information

- Supplier
- Products
- Quantity
- Unit cost
- Total amount
- Paid amount
- Payment status
- Invoice number
- Purchase date
- Notes

### Payment statuses

- Paid
- Partial
- Pending

### Inventory behavior

When a purchase is recorded:

```text
Purchase
   ↓
Product quantity increases
   ↓
Inventory stock updated
