import { NavLink } from "react-router-dom";

const items = [
    ["Dashboard", "/dashboard", "▣"],
    ["Products", "/products", "▦"],
    ["Suppliers", "/suppliers", "♜"],
    ["Customers", "/customers", "♙"],
    ["Purchases", "/purchases", "↓"],
    ["Sales", "/sales", "↑"],
    ["Payments", "/payments", "₹"],
    ["Reports", "/reports", "▥"],
    ["AI Insights", "/ai-insights", "✦"]
];

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <div className="brand-logo">IP</div>
                <div>
                    <h2>InventoryPro</h2>
                    <p>Management System</p>
                </div>
            </div>

            <div className="sidebar-section">
                <p className="sidebar-title">MAIN MENU</p>

                <nav className="sidebar-menu">
                    {items.map(([name, path, icon]) => (
                        <NavLink
                            key={path}
                            to={path}
                            className={({ isActive }) =>
                                `sidebar-link${isActive ? " active" : ""}`
                            }
                        >
                            <span className="sidebar-icon">{icon}</span>
                            <span>{name}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="sidebar-bottom">
                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        `sidebar-link${isActive ? " active" : ""}`
                    }
                >
                    <span className="sidebar-icon">⚙</span>
                    <span>Settings</span>
                </NavLink>
            </div>
        </aside>
    );
}
