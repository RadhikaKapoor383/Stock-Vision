import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiGrid, FiBriefcase, FiEye, FiTrendingUp, FiPieChart, 
  FiActivity, FiBookOpen, FiBell, FiSettings, FiLogOut, FiMenu, FiX 
} from 'react-icons/fi';

export default function Sidebar({ activeTab, setActiveTab, onLogout, isOpen, setIsOpen }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiGrid },
    { id: 'portfolio', label: 'Portfolio', icon: FiBriefcase },
    { id: 'watchlist', label: 'Watchlist', icon: FiEye },
    { id: 'stocks', label: 'Stocks', icon: FiTrendingUp },
    { id: 'analytics', label: 'Analytics', icon: FiPieChart },
    { id: 'transactions', label: 'Transactions', icon: FiActivity },
    { id: 'news', label: 'News', icon: FiBookOpen },
    { id: 'alerts', label: 'Alerts', icon: FiBell },
    { id: 'settings', label: 'Settings', icon: FiSettings },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="btn d-lg-none position-fixed" 
        style={{ top: '15px', left: '15px', zIndex: 1050, backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-lg-none" 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 1040 }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div 
        className={`sidebar-container position-fixed top-0 start-0 h-100 d-flex flex-column${isOpen ? ' sidebar-open' : ''}`}
        style={{
          width: 'var(--sidebar-width)',
          backgroundColor: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-color)',
          zIndex: 1045,
          transition: 'transform var(--transition-normal)',
        }}
      >
        {/* Logo Section */}
        <div className="d-flex align-items-center gap-2 px-4 py-4" style={{ borderBottom: '1px solid var(--border-color)', height: 'var(--navbar-height)' }}>
          <div className="d-flex align-items-center justify-content-center rounded-3" style={{ width: '36px', height: '36px', backgroundColor: 'var(--accent-purple)', color: '#fff' }}>
            <FiTrendingUp size={20} />
          </div>
          <span className="fw-bold fs-5 text-primary-custom" style={{ color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>Stock Vision</span>
        </div>

        {/* Menu Navigation */}
        <div className="flex-grow-1 overflow-y-auto py-3 px-3">
          <ul className="nav nav-pills flex-column gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id} className="nav-item">
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsOpen(false); // Close mobile sidebar on select
                    }}
                    className={`nav-link w-100 text-start d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 border-0 transition-all ${
                      isActive 
                        ? 'active fw-semibold' 
                        : 'text-secondary-custom'
                    }`}
                    style={{
                      backgroundColor: isActive ? 'var(--accent-purple-light)' : 'transparent',
                      color: isActive ? 'var(--accent-purple)' : 'var(--text-secondary)',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Logout Footer */}
        <div className="p-3" style={{ borderTop: '1px solid var(--border-color)' }}>
          <button
            onClick={onLogout}
            className="btn w-100 d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 text-start border-0 text-danger"
            style={{
              backgroundColor: 'transparent',
              transition: 'all var(--transition-fast)',
              fontSize: '0.95rem'
            }}
          >
            <FiLogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Styled overrides for Sidebar CSS */}
      <style>{`
        @media (min-width: 992px) {
          .sidebar-container {
            transform: translateX(0) !important;
          }
        }
        @media (max-width: 991.98px) {
          .sidebar-container {
            transform: translateX(-100%);
          }
          .sidebar-container.sidebar-open {
            transform: translateX(0);
          }
        }
        .nav-link:hover {
          background-color: var(--accent-purple-light-hover) !important;
          color: var(--accent-purple) !important;
        }
        .text-danger:hover {
          background-color: var(--red-danger-light) !important;
          color: var(--red-danger) !important;
        }
      `}</style>
    </>
  );
}