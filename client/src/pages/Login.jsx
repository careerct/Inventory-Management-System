import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
    const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); const location = useLocation();
    const submit = async e => { e.preventDefault(); setError(""); setLoading(true); try { const { data } = await API.post("/auth/login", { email, password }); localStorage.setItem("token", data.token); localStorage.setItem("user", JSON.stringify(data.user)); navigate(location.state?.from || "/dashboard", { replace: true }); } catch (err) { setError(err.response?.data?.message || "Login failed"); } finally { setLoading(false); } };
    return <div className="login-page"><div className="login-card"><div className="login-brand"><div className="brand-logo">IP</div><div><h1>InventoryPro</h1><p>Management System</p></div></div><h2>Welcome back</h2><p className="muted">Sign in to manage your inventory and accounts.</p><form onSubmit={submit}><label>Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="username" /></label><label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" /></label>{error && <div className="form-error">{error}</div>}<button className="primary-button full" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</button></form></div></div>;
}
