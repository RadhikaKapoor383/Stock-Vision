import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProfileSettings from './pages/ProfileSettings';
import WatchlistTable from './components/WatchlistTable';
import NewsCard from './components/NewsCard';
import PortfolioChart from './components/PortfolioChart';
import AllocationChart from './components/AllocationChart';
import { 
  mockUserProfile, 
  mockTransactions, 
  mockNotifications, 
  mockMessages 
} from './data/mockData';
import { seedIfEmpty, addTransaction, deleteTransaction } from './services/transactionStore';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/dashboard.css';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : mockUserProfile;
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('activeTab') || 'dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Message for detailed messaging chat overlay
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  // Transaction log: real, user-maintained, stored locally (no free
  // brokerage API exists to fetch real buy/sell history)
  const [transactions, setTransactions] = useState(() => seedIfEmpty(mockTransactions));
  const [newTx, setNewTx] = useState({ type: 'Buy', symbol: '', quantity: '', price: '' });

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!newTx.symbol.trim() || !newTx.quantity || !newTx.price) return;
    const updated = addTransaction(newTx);
    setTransactions(updated);
    setNewTx({ type: 'Buy', symbol: '', quantity: '', price: '' });
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(deleteTransaction(id));
  };

  // Sync theme to DOM attributes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Persist activeTab
  useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  // Persist User Profile
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLogin = (credentials) => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleSignUp = (signupData) => {
    const words = signupData.name.trim().split(' ');
    const initials = words.length > 1 
      ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
      : words[0][0].toUpperCase();

    const newProfile = {
      ...mockUserProfile,
      name: signupData.name,
      email: signupData.email,
      initials: initials,
      portfolioValue: 154850,
    };
    setUserProfile(newProfile);
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('activeTab');
    setActiveTab('dashboard');
  };

  // Open Message Modal on click
  const handleMessageClick = (msg) => {
    setSelectedMessage(msg);
    setIsMessageModalOpen(true);
  };

  // Render subpages based on Sidebar Selection
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard userProfile={userProfile} setUserProfile={setUserProfile} searchQuery={searchQuery} />;
      case 'portfolio':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="row g-4">
            <div className="col-12 col-xl-8"><PortfolioChart currentValue={userProfile.portfolioValue} /></div>
            <div className="col-12 col-xl-4"><AllocationChart /></div>
          </motion.div>
        );
      case 'watchlist':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <WatchlistTable searchQuery={searchQuery} />
          </motion.div>
        );
      case 'stocks':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="premium-card">
            <h5 className="fw-bold mb-3">Holdings & Asset Details</h5>
            <p className="text-muted mb-4">Detailed lists of all assets in your active portfolio.</p>
            <WatchlistTable searchQuery={searchQuery} />
          </motion.div>
        );
      case 'analytics':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="row g-4">
            <div className="col-12"><PortfolioChart currentValue={userProfile.portfolioValue} /></div>
            <div className="col-12 col-md-6"><AllocationChart /></div>
            <div className="col-12 col-md-6">
              <div className="premium-card h-100">
                <h5 className="fw-bold mb-3">Key Risk Metrics</h5>
                <ul className="list-group list-group-flush" style={{ backgroundColor: 'transparent' }}>
                  <li className="list-group-item bg-transparent text-primary-custom d-flex justify-content-between border-color-custom">
                    <span>Beta Factor</span>
                    <span className="fw-bold">1.12 (Moderate)</span>
                  </li>
                  <li className="list-group-item bg-transparent text-primary-custom d-flex justify-content-between border-color-custom">
                    <span>Sharpe Ratio</span>
                    <span className="fw-bold">2.45 (High return/risk)</span>
                  </li>
                  <li className="list-group-item bg-transparent text-primary-custom d-flex justify-content-between border-color-custom">
                    <span>Volatility (30d)</span>
                    <span className="fw-bold">14.2%</span>
                  </li>
                  <li className="list-group-item bg-transparent text-primary-custom d-flex justify-content-between border-color-custom">
                    <span>Max Drawdown</span>
                    <span className="fw-bold text-danger">-8.4%</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        );
      case 'transactions':
        const filteredTransactions = transactions.filter(tx => 
          tx.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tx.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tx.status.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="d-flex flex-column gap-4">
            <div className="premium-card">
              <h5 className="fw-bold mb-1">Log a Transaction</h5>
              <p className="text-muted mb-3" style={{ fontSize: '0.8rem' }}>
                No free market API provides real buy/sell history — log your own trades here instead.
              </p>
              <form onSubmit={handleAddTransaction} className="row g-2 align-items-end">
                <div className="col-6 col-md-2">
                  <label className="form-label text-secondary fw-semibold" style={{ fontSize: '0.8rem' }}>Type</label>
                  <select
                    className="form-select form-control-premium"
                    value={newTx.type}
                    onChange={(e) => setNewTx({ ...newTx, type: e.target.value })}
                  >
                    <option value="Buy">Buy</option>
                    <option value="Sell">Sell</option>
                  </select>
                </div>
                <div className="col-6 col-md-3">
                  <label className="form-label text-secondary fw-semibold" style={{ fontSize: '0.8rem' }}>Symbol</label>
                  <input
                    type="text"
                    className="form-control form-control-premium"
                    placeholder="AAPL"
                    value={newTx.symbol}
                    onChange={(e) => setNewTx({ ...newTx, symbol: e.target.value })}
                    required
                  />
                </div>
                <div className="col-6 col-md-2">
                  <label className="form-label text-secondary fw-semibold" style={{ fontSize: '0.8rem' }}>Quantity</label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    className="form-control form-control-premium"
                    placeholder="10"
                    value={newTx.quantity}
                    onChange={(e) => setNewTx({ ...newTx, quantity: e.target.value })}
                    required
                  />
                </div>
                <div className="col-6 col-md-2">
                  <label className="form-label text-secondary fw-semibold" style={{ fontSize: '0.8rem' }}>Price</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="form-control form-control-premium"
                    placeholder="189.84"
                    value={newTx.price}
                    onChange={(e) => setNewTx({ ...newTx, price: e.target.value })}
                    required
                  />
                </div>
                <div className="col-12 col-md-3">
                  <button type="submit" className="btn btn-premium-primary w-100">Add Transaction</button>
                </div>
              </form>
            </div>

            <div className="premium-card">
              <h5 className="fw-bold mb-3">Transaction History</h5>
              <p className="text-muted mb-4">Complete audit trail of asset buy/sell transactions</p>
              <div className="custom-table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Stock</th>
                      <th style={{ textAlign: 'right' }}>Quantity</th>
                      <th style={{ textAlign: 'right' }}>Price</th>
                      <th style={{ textAlign: 'right' }}>Date</th>
                      <th style={{ textAlign: 'center' }}>Status</th>
                      <th style={{ textAlign: 'center' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((tx) => (
                      <tr key={tx.id}>
                        <td>
                          <span className={`badge px-2 py-1 fw-bold ${tx.type === 'Buy' ? 'bg-success-light text-success' : 'bg-danger-light text-danger'}`} style={{ borderRadius: '4px', fontSize: '0.7rem' }}>
                            {tx.type}
                          </span>
                        </td>
                        <td className="fw-bold">{tx.symbol}</td>
                        <td className="text-end fw-semibold">{tx.quantity}</td>
                        <td className="text-end fw-semibold">${tx.price}</td>
                        <td className="text-end text-muted">{tx.date}</td>
                        <td className="text-center">
                          <span className={`badge-status badge-${tx.status.toLowerCase()}`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="text-center">
                          <button
                            type="button"
                            className="btn btn-sm border-0 bg-transparent text-muted"
                            onClick={() => handleDeleteTransaction(tx.id)}
                            title="Delete"
                          >
                            &times;
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        );
      case 'news':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <NewsCard />
          </motion.div>
        );
      case 'alerts':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="premium-card">
            <h5 className="fw-bold mb-2">Active Notifications & Alerts</h5>
            <p className="text-muted mb-4">View recent price triggers and security alerts.</p>
            <div className="d-flex flex-column gap-3">
              {mockNotifications.map((alert) => (
                <div 
                  key={alert.id} 
                  className="p-3 rounded-3 border d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2" 
                  style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
                >
                  <div>
                    <div className="fw-semibold text-primary-custom" style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>{alert.text}</div>
                    <div className="text-muted mt-1" style={{ fontSize: '0.75rem' }}>{alert.time}</div>
                  </div>
                  <span className={`badge-status badge-${alert.status.toLowerCase()} align-self-start align-self-sm-center`}>
                    {alert.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        );
      case 'settings':
        return <ProfileSettings userProfile={userProfile} setUserProfile={setUserProfile} />;
      default:
        return <Dashboard userProfile={userProfile} setUserProfile={setUserProfile} searchQuery={searchQuery} />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} onSignUp={handleSignUp} />;
  }

  return (
    <div className="app-container">
      {/* Left Navigation Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Container */}
      <div className="main-content">
        {/* Top Navbar */}
        <Navbar 
          userProfile={userProfile}
          theme={theme}
          toggleTheme={toggleTheme}
          setActiveTab={setActiveTab}
          onLogout={handleLogout}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onMessageClick={handleMessageClick}
        />

        {/* Tab View Display */}
        <div className="py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Message Chat Modal (overlay) */}
      {isMessageModalOpen && selectedMessage && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center px-3" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1100 }}
        >
          <motion.div 
            className="premium-card p-4 text-start"
            style={{ width: '100%', maxWidth: '500px', backgroundColor: 'var(--bg-secondary)' }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="d-flex justify-content-between align-items-center border-bottom border-light pb-3 mb-3">
              <div>
                <h5 className="fw-bold mb-0">{selectedMessage.sender}</h5>
                <span className="text-muted" style={{ fontSize: '0.75rem' }}>Active Chat Session</span>
              </div>
              <button 
                className="btn-close border-0 bg-transparent text-primary-custom"
                onClick={() => { setIsMessageModalOpen(false); setSelectedMessage(null); }}
                style={{ fontSize: '1.25rem' }}
              >
                &times;
              </button>
            </div>
            
            {/* Conversation Log */}
            <div className="d-flex flex-column gap-3 mb-4 overflow-y-auto px-1" style={{ maxHeight: '250px' }}>
              {selectedMessage.chatHistory.map((chat, idx) => {
                const isUser = chat.sender !== selectedMessage.sender && chat.sender !== 'Advisor' && chat.sender !== 'System' && chat.sender !== 'Pulse Editor';
                return (
                  <div key={idx} className={`d-flex flex-column ${isUser ? 'align-items-end' : 'align-items-start'}`}>
                    <span className="text-muted mb-1" style={{ fontSize: '0.7rem' }}>{chat.sender}</span>
                    <div 
                      className="p-2.5 text-wrap" 
                      style={{ 
                        maxWidth: '85%', 
                        fontSize: '0.85rem',
                        backgroundColor: isUser ? 'var(--accent-purple-light)' : 'var(--bg-primary)',
                        color: isUser ? 'var(--accent-purple)' : 'var(--text-primary)',
                        border: isUser ? '1px solid var(--accent-purple)' : '1px solid var(--border-color)',
                        borderRadius: isUser ? '12px 12px 0 12px' : '12px 12px 12px 0'
                      }}
                    >
                      {chat.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chat Reply Form */}
            <form onSubmit={(e) => {
              e.preventDefault();
              const replyText = e.target.reply.value.trim();
              if (!replyText) return;
              
              const updatedHistory = [
                ...selectedMessage.chatHistory,
                { sender: userProfile.name, text: replyText, time: "Just now" }
              ];
              setSelectedMessage({ ...selectedMessage, chatHistory: updatedHistory });
              e.target.reply.value = '';
            }}>
              <div className="input-group">
                <input 
                  type="text" 
                  name="reply"
                  placeholder="Type your reply here..." 
                  className="form-control form-control-premium" 
                  autoComplete="off"
                  required
                />
                <button type="submit" className="btn btn-premium-primary px-3">Send</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      <style>{`
        .bg-success-light {
          background-color: var(--green-success-light) !important;
        }
        .bg-danger-light {
          background-color: var(--red-danger-light) !important;
        }
        .border-color-custom {
          border-color: var(--border-color) !important;
        }
        .btn-close:focus {
          box-shadow: none;
        }
      `}</style>
    </div>
  );
}