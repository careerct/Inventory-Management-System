import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import API from "../services/api";
import StatCard from "../components/StatCard";
import Loading from "../components/Loading";

const money = n => `₹${Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
export default function Dashboard() {
    const [data, setData] = useState(null); const [error, setError] = useState("");
    const load = async () => { try { setError(""); const r = await API.get("/dashboard"); setData(r.data); } catch (e) { setError(e.response?.data?.message || "Unable to load dashboard"); } };
    useEffect(() => { load(); }, []);
    if (!data && !error) return <Loading />;
    if (error) return <div className="error-state"><h2>Unable to load dashboard</h2><p>{error}</p><button className="primary-button" onClick={load}>Try Again</button></div>;
    const chart = [{ name: "Sales", value: data.totalSales }, { name: "Purchases", value: data.totalPurchase }, { name: "Payments", value: data.totalPayments }];
    return <><div className="page-header"><h2>Business Overview</h2><p>Monitor your inventory, sales and financial activity.</p></div><div className="stats-grid"><StatCard title="Total Products" value={data.totalProducts} description="Products in inventory" icon="📦" /><StatCard title="Total Sales" value={money(data.totalSales)} description={`${data.totalSalesCount} sales recorded`} icon="₹" /><StatCard title="Total Purchases" value={money(data.totalPurchase)} description={`${data.totalPurchases} purchases recorded`} icon="🛒" /><StatCard title="Total Payments" value={money(data.totalPayments)} description={`${data.totalPaymentsCount} payment records`} icon="💳" /><StatCard title="Total Customers" value={data.totalCustomers} description="Registered customers" icon="👥" /><StatCard title="Total Suppliers" value={data.totalSuppliers} description="Registered suppliers" icon="🚚" /></div><div className="dashboard-grid"><section className="dashboard-card"><div className="dashboard-card-header"><h3>Financial Activity</h3><p>Current totals from recorded transactions</p></div><div className="dashboard-card-body chart-wrap"><ResponsiveContainer width="100%" height={270}><BarChart data={chart}><XAxis dataKey="name"/><YAxis/><Tooltip formatter={v => money(v)}/><Bar dataKey="value" radius={[6,6,0,0]}/></BarChart></ResponsiveContainer></div></section><section className="dashboard-card"><div className="dashboard-card-header"><h3>Inventory Status</h3><p>Products at or below minimum stock</p></div><div className="dashboard-card-body"><div className="inventory-box warning"><div className="inventory-box-title">Low stock products</div><div className="inventory-box-value">{data.lowStockCount}</div></div>{data.lowStockProducts.length ? <div className="low-stock-list">{data.lowStockProducts.map(p => <div className="low-stock-item" key={p._id}><span className="low-stock-item-name">{p.name}</span><span className="low-stock-item-stock">{p.stock} {p.unit}</span></div>)}</div> : <div className="empty-state">No low-stock products.</div>}</div></section></div></>;
}
