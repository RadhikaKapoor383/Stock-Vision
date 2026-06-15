import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
    return (
        <aside className="sidebar">
            <ul>
                <li><Link to="/overview">Overview</Link></li>
                <li><Link to="/market-trends">Market Trends</Link></li>
                <li><Link to="/portfolio">Portfolio</Link></li>
                <li><Link to="/settings">Settings</Link></li>
            </ul>
        </aside>
    );
}
export default Sidebar;