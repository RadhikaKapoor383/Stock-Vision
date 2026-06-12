import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <button className="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <h1>Stock Vision</h1>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/stocks">Stocks</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
            </ul>
            <button className="user-button avatar">
                👤
            </button>
        </nav>
    );
}
export default Navbar;