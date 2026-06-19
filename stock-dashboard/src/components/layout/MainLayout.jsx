import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './MainLayout.css';

function MainLayout({ children }) {
    return (
        <div className="main-layout">
            <Navbar />
            <div className="content">
                <Sidebar />
                <main>{children}</main>
            </div>
        </div>
    );
}
export default MainLayout;