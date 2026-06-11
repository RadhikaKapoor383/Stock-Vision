import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="sidebar">
            <h2>Stock Dashboard</h2>
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