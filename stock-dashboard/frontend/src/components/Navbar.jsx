import React, { useState } from 'react';
import { FiSearch, FiBell, FiMessageSquare, FiSun, FiMoon, FiSettings, FiUser, FiLogOut, FiTrendingUp } from 'react-icons/fi';
import { mockNotifications, mockMessages } from '../data/mockData';

export default function Navbar({ 
  userProfile, 
  theme, 
  toggleTheme, 
  setActiveTab, 
  onLogout, 
  searchQuery, 
  setSearchQuery, 
  onMessageClick 
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);

  return (
    <nav 
      className="navbar navbar-expand px-3 px-sm-4 py-0 position-sticky top-0" 
      style={{ 
        height: 'var(--navbar-height)', 
        backgroundColor: 'var(--bg-secondary)', 
        borderBottom: '1px solid var(--border-color)',
        zIndex: 1000
      }}
    >
      <div className="container-fluid p-0 d-flex justify-content-between align-items-center">
        
        {/* Left Side: Brand Logo (on mobile) & Search Bar */}
        <div className="d-flex align-items-center gap-3 flex-grow-1 flex-md-grow-0" style={{ maxWidth: '50%' }}>
          
          {/* Logo Name on Navbar (visible on smaller screens when sidebar is hidden) */}
          <div className="d-flex align-items-center gap-2 d-lg-none ms-0 ms-sm-5">
            <div className="d-flex align-items-center justify-content-center rounded-3 bg-purple text-white" style={{ width: '32px', height: '32px', backgroundColor: 'var(--accent-purple)' }}>
              <FiTrendingUp size={16} color="#fff" />
            </div>
            <span className="fw-bold mb-0 text-primary-custom" style={{ fontSize: '1.05rem', letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>Stock Vision</span>
          </div>

          {/* Search Bar */}
          <div className="d-none d-sm-flex align-items-center" style={{ minWidth: '260px' }}>
            <div className="input-group rounded-3" style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
              <span className="input-group-text bg-transparent border-0 text-muted ps-3 pr-2">
                <FiSearch size={18} />
              </span>
              <input 
                type="text" 
                className="form-control bg-transparent border-0 ps-1 py-2 text-primary-custom" 
                placeholder="Search symbol, transactions..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ boxShadow: 'none', color: 'var(--text-primary)', fontSize: '0.875rem' }}
              />
            </div>
          </div>
        </div>

        {/* Right Side: Action Controls & Profile */}
        <div className="d-flex align-items-center gap-3">
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="btn rounded-circle d-flex align-items-center justify-content-center p-2"
            style={{ 
              width: '40px', 
              height: '40px', 
              color: 'var(--text-secondary)',
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              transition: 'all var(--transition-fast)'
            }}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
          </button>

          {/* Messages Dropdown */}
          <div className="position-relative">
            <button 
              onClick={() => { setMsgOpen(!msgOpen); setNotifOpen(false); setDropdownOpen(false); }}
              className="btn rounded-circle position-relative d-flex align-items-center justify-content-center p-2"
              style={{ 
                width: '40px', 
                height: '40px', 
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                transition: 'all var(--transition-fast)'
              }}
            >
              <FiMessageSquare size={18} />
              <span 
                className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"
                style={{ width: '8px', height: '8px', transform: 'translate(-12px, 2px) !important' }}
              ></span>
            </button>

            {msgOpen && (
              <div 
                className="position-absolute end-0 mt-2 py-2 rounded-3 text-start" 
                style={{ 
                  width: '300px', 
                  backgroundColor: 'var(--bg-secondary)', 
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 1010,
                  animation: 'fadeIn 0.2s ease-out'
                }}
                onMouseLeave={() => setMsgOpen(false)}
              >
                <div className="px-3 py-2 border-bottom border-light fw-bold" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Messages</div>
                <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                  {mockMessages.map((msg) => (
                    <button 
                      key={msg.id} 
                      onClick={() => { 
                        onMessageClick(msg); 
                        setMsgOpen(false); 
                      }}
                      className="dropdown-item px-3 py-2.5 text-start w-100 border-0 bg-transparent"
                      style={{ 
                        borderBottom: '1px solid var(--bg-primary)', 
                        whiteSpace: 'normal',
                        lineHeight: '1.3' 
                      }}
                    >
                      <div className="fw-semibold text-primary-custom" style={{ fontSize: '0.825rem', color: 'var(--text-primary)' }}>{msg.sender}</div>
                      <div className="text-muted" style={{ fontSize: '0.75rem', marginTop: '2px' }}>{msg.preview}</div>
                      <div className="text-light" style={{ fontSize: '0.65rem', marginTop: '4px' }}>{msg.time}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notification Dropdown */}
          <div className="position-relative">
            <button 
              onClick={() => { setNotifOpen(!notifOpen); setMsgOpen(false); setDropdownOpen(false); }}
              className="btn rounded-circle position-relative d-flex align-items-center justify-content-center p-2"
              style={{ 
                width: '40px', 
                height: '40px', 
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                transition: 'all var(--transition-fast)'
              }}
            >
              <FiBell size={18} />
              <span 
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ 
                  fontSize: '0.6rem', 
                  padding: '3px 6px',
                  transform: 'translate(-12px, -2px) !important'
                }}
              >
                {mockNotifications.filter(n => n.unread).length || 5}
              </span>
            </button>

            {notifOpen && (
              <div 
                className="position-absolute end-0 mt-2 py-2 rounded-3 text-start" 
                style={{ 
                  width: '300px', 
                  backgroundColor: 'var(--bg-secondary)', 
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 1010,
                  animation: 'fadeIn 0.2s ease-out'
                }}
                onMouseLeave={() => setNotifOpen(false)}
              >
                <div className="px-3 py-2 border-bottom border-light fw-bold" style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>Notifications</div>
                <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                  {mockNotifications.map((notif) => (
                    <button 
                      key={notif.id} 
                      onClick={() => { setActiveTab('alerts'); setNotifOpen(false); }}
                      className="dropdown-item px-3 py-2.5 text-start w-100 border-0 bg-transparent d-flex flex-column"
                      style={{ 
                        borderBottom: '1px solid var(--bg-primary)',
                        whiteSpace: 'normal',
                        lineHeight: '1.3'
                      }}
                    >
                      <div className="text-primary-custom" style={{ 
                        fontSize: '0.8rem', 
                        color: notif.unread ? 'var(--text-primary)' : 'var(--text-secondary)', 
                        fontWeight: notif.unread ? '600' : '400' 
                      }}>
                        {notif.text}
                      </div>
                      <span className="text-light mt-1" style={{ fontSize: '0.65rem' }}>{notif.time}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Vertical Divider */}
          <div className="vr d-none d-sm-block text-muted mx-1" style={{ height: '24px' }}></div>

          {/* User Profile Dropdown */}
          <div className="position-relative">
            <button 
              onClick={() => { setDropdownOpen(!dropdownOpen); setNotifOpen(false); setMsgOpen(false); }} 
              className="btn p-0 border-0 d-flex align-items-center gap-2"
            >
              <div className="avatar-initials">
                {userProfile.initials}
              </div>
              <div className="d-none d-md-block text-start">
                <div className="fw-semibold text-primary-custom" style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: '1.2' }}>
                  {userProfile.name}
                </div>
                <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                  {userProfile.role}
                </div>
              </div>
            </button>

            {dropdownOpen && (
              <div 
                className="position-absolute end-0 mt-2 py-2 rounded-3 text-start" 
                style={{ 
                  width: '200px', 
                  backgroundColor: 'var(--bg-secondary)', 
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-lg)',
                  zIndex: 1010,
                  animation: 'fadeIn 0.2s ease-out'
                }}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button 
                  onClick={() => { setActiveTab('settings'); setDropdownOpen(false); }}
                  className="dropdown-item px-3 py-2 d-flex align-items-center gap-2 text-start w-100 border-0 bg-transparent"
                  style={{ color: 'var(--text-primary)', fontSize: '0.875rem' }}
                >
                  <FiUser size={16} />
                  <span>My Profile</span>
                </button>
                <button 
                  onClick={() => { setActiveTab('settings'); setDropdownOpen(false); }}
                  className="dropdown-item px-3 py-2 d-flex align-items-center gap-2 text-start w-100 border-0 bg-transparent"
                  style={{ color: 'var(--text-primary)', fontSize: '0.875rem' }}
                >
                  <FiSettings size={16} />
                  <span>Settings</span>
                </button>
                <div className="dropdown-divider" style={{ borderTop: '1px solid var(--border-color)' }}></div>
                <button 
                  onClick={() => { onLogout(); setDropdownOpen(false); }}
                  className="dropdown-item px-3 py-2 d-flex align-items-center gap-2 text-start w-100 border-0 bg-transparent text-danger"
                  style={{ fontSize: '0.875rem' }}
                >
                  <FiLogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
      <style>{`
        .dropdown-item:hover {
          background-color: var(--accent-purple-light) !important;
          color: var(--accent-purple) !important;
        }
        .dropdown-item.text-danger:hover {
          background-color: var(--red-danger-light) !important;
          color: var(--red-danger) !important;
        }
      `}</style>
    </nav>
  );
}
