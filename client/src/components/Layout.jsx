import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const titles = {
    "/dashboard": ["Dashboard", "Overview of your business"],
    "/products": ["Products", "Manage inventory products and stock levels"],
    "/suppliers": ["Suppliers", "Manage your supplier records"],
    "/customers": ["Customers", "Manage your customer records"],
    "/purchases": ["Purchases", "Record purchases and increase stock"],
    "/sales": ["Sales", "Record sales and decrease stock"],
    "/payments": ["Payments", "Track customer, supplier and business payments"],
    "/reports": ["Reports", "Review sales, purchases and business performance"],
    "/ai-insights": ["AI Insights", "Inventory intelligence from your business data"],
    "/settings": ["Settings", "Account and application settings"]
};

export default function Layout() {
    const location = useLocation();
    const [title, subtitle] = titles[location.pathname] || ["InventoryPro", "Management System"];

    return (
        <div className="app-layout">
            <Sidebar />

            <div className="main-content">
                <Navbar title={title} subtitle={subtitle} />

                <main className="page-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
