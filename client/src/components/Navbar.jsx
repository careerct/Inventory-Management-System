import { useNavigate } from "react-router-dom";

export default function Navbar({ title, subtitle }) {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const logout = () => { localStorage.removeItem("token"); localStorage.removeItem("user"); navigate("/login", { replace: true }); };
    const initial = (user?.name || "U").charAt(0).toUpperCase();
    return <header className="navbar"><div className="navbar-left"><h1>{title}</h1><p>{subtitle}</p></div><div className="navbar-right"><span className="notification">🔔</span><div className="user-info"><div className="user-avatar">{initial}</div><div className="user-details"><h4>{user?.name || "User"}</h4><p>{user?.role || "Staff"}</p></div></div><button className="logout-button" onClick={logout}>Logout</button></div></header>;
}
