import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiDollarSign, FiBriefcase, FiTrendingUp, FiActivity, FiLayers,
  FiArrowUpRight, FiArrowDownRight
} from 'react-icons/fi';
import StatsCard from '../components/StatsCard';
import PortfolioChart from '../components/PortfolioChart';
import AllocationChart from '../components/AllocationChart';
import WatchlistTable from '../components/WatchlistTable';
import NewsCard from '../components/NewsCard';
import { mockMarketOverview, mockTopPerformers, mockTransactions } from '../data/mockData';
import { fetchMarketOverview, fetchTopPerformers, fetchPortfolioStats } from '../services/finnhub';
import { seedIfEmpty } from '../services/transactionStore';

export default function Dashboard({ userProfile, setUserProfile, searchQuery = '', transactions }) {
  const [marketOverview, setMarketOverview] = useState(mockMarketOverview);
  const [topPerformers, setTopPerformers] = useState(mockTopPerformers);
  const [portfolioStats, setPortfolioStats] = useState(null); // null = still loading
  const [apiNotice, setApiNotice] = useState('');

  useEffect(() => {
    if (!import.meta.env.VITE_API_KEY) {
      setApiNotice('Live market data is unavailable because VITE_API_KEY is missing. Showing demo data.');
    }

    // Fire all three in parallel
    fetchMarketOverview()
      .then(data => setMarketOverview(data))
      .catch(() => {
        setApiNotice('Live market data could not be loaded. Showing demo data instead.');
      });

    fetchTopPerformers()
      .then(data => setTopPerformers(data))
      .catch(() => {
        setApiNotice('Live market data could not be loaded. Showing demo data instead.');
      });

    fetchPortfolioStats(userProfile.availableCash)
      .then(data => {
        setPortfolioStats(data);
        // Persist live stats into the profile (and therefore localStorage)
        // so other tabs/components see the same up-to-date numbers.
        if (setUserProfile) {
          setUserProfile(prev => ({ ...prev, ...data }));
        }
      })
      .catch(() => {
        setApiNotice('Live portfolio stats could not be loaded. Showing demo data instead.');
      });
  }, [setUserProfile, userProfile.availableCash]);

  // Merge live portfolio stats into userProfile (fall back to mock if API failed)
  const stats = portfolioStats
    ? { ...userProfile, ...portfolioStats }
    : userProfile;

  const statsItems = [
    {
      title: "Portfolio Value",
      value: `$${stats.portfolioValue.toLocaleString()}`,
      change: `${stats.portfolioChange >= 0 ? '+' : ''}${stats.portfolioChange}%`,
      isPositive: stats.portfolioChange >= 0,
      icon: FiBriefcase,
    },
    {
      title: "Today's P/L",
      value: `${stats.todayProfitLoss >= 0 ? '+' : ''}$${Math.abs(stats.todayProfitLoss).toLocaleString()}`,
      change: `${stats.todayProfitLossChange >= 0 ? '+' : ''}${stats.todayProfitLossChange}%`,
      isPositive: stats.todayProfitLoss >= 0,
      icon: FiTrendingUp,
    },
    {
      title: "Total Investments",
      value: `$${stats.totalInvestments.toLocaleString()}`,
      change: "+8.3%",
      isPositive: true,
      icon: FiDollarSign,
    },
    {
      title: "Available Cash",
      value: `$${stats.availableCash.toLocaleString()}`,
      change: "-2.4%",
      isPositive: false,
      icon: FiActivity,
    },
    {
      title: "Holdings",
      value: `${stats.activeHoldings}`,
      change: "+1 new",
      isPositive: true,
      icon: FiLayers,
    }
  ];

  const liveTransactions = transactions ?? seedIfEmpty(mockTransactions, userProfile.email || userProfile.name);
  const filteredTransactions = liveTransactions.filter(tx =>
    tx.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.status.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  return (
    <div className="d-flex flex-column gap-4">
      {/* Welcome Header */}
      <div>
        <h4 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>
          Welcome back, {userProfile.name}!
        </h4>
        <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>
          Here is what's happening with your portfolio today.
        </p>
        {apiNotice && (
          <div className="mt-3 alert alert-warning py-2 px-3 mb-0" style={{ fontSize: '0.8rem' }}>
            {apiNotice}
          </div>
        )}
      </div>

      {/* Statistics Cards */}
      <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-5 g-3">
        {statsItems.map((item, idx) => (
          <div key={item.title} className="col">
            <StatsCard {...item} delay={idx * 0.05} loading={!portfolioStats} />
          </div>
        ))}
      </div>

      {/* Market Overview */}
      <div>
        <h6 className="fw-bold text-secondary mb-3" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Market Overview</h6>
        <div className="row row-cols-2 row-cols-md-4 g-3">
          {marketOverview.map((item, idx) => (
            <div key={item.name} className="col">
              <motion.div
                className="premium-card p-3 d-flex justify-content-between align-items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <div>
                  <span className="text-muted fw-semibold" style={{ fontSize: '0.8rem' }}>{item.name}</span>
                  <div className="fw-bold fs-5 mt-1" style={{ color: 'var(--text-primary)' }}>{item.value}</div>
                </div>
                <span className={`badge-status ${item.isPositive ? 'badge-completed' : 'badge-failed'}`}>
                  {item.change}
                </span>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="row g-4">
        <div className="col-12 col-xl-8"><PortfolioChart currentValue={stats.portfolioValue} /></div>
        <div className="col-12 col-xl-4"><AllocationChart /></div>
      </div>

      {/* Watchlist & Top Performers */}
      <div className="row g-4">
        <div className="col-12 col-xl-8">
          <WatchlistTable searchQuery={searchQuery} />
        </div>

        <div className="col-12 col-xl-4">
          <div className="premium-card h-100">
            <h5 className="mb-1 fw-bold">Top Performing Stocks</h5>
            <p className="text-muted mb-4" style={{ fontSize: '0.8rem' }}>Highest daily gainers in your watchlists</p>
            <div className="d-flex flex-column gap-3">
              {topPerformers.map((stock, idx) => (
                <motion.div
                  key={stock.symbol}
                  className="d-flex align-items-center justify-content-between p-2 rounded-3"
                  style={{ border: '1px solid transparent' }}
                  whileHover={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="stock-logo">{stock.logo}</div>
                    <div>
                      <div className="fw-bold" style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{stock.symbol}</div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>{stock.name}</div>
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold" style={{ fontSize: '0.9rem' }}>${stock.price?.toFixed(2)}</div>
                    <span className={`trend-indicator ${stock.isPositive ? 'trend-up' : 'trend-down'}`} style={{ fontSize: '0.75rem' }}>
                      {stock.isPositive ? <FiArrowUpRight size={12} /> : <FiArrowDownRight size={12} />}
                      {stock.gain}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions & News */}
      <div className="row g-4">
        <div className="col-12 col-xl-8">
          <div className="premium-card h-100">
            <h5 className="mb-1 fw-bold">Recent Transactions</h5>
            <p className="text-muted mb-4" style={{ fontSize: '0.8rem' }}>Summary of buy and sell activities</p>
            <div className="custom-table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Stock</th>
                    <th style={{ textAlign: 'right' }}>Qty</th>
                    <th style={{ textAlign: 'right' }}>Price</th>
                    <th style={{ textAlign: 'right' }} className="d-none d-sm-table-cell">Date</th>
                    <th style={{ textAlign: 'center' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((tx) => {
                    const isBuy = tx.type === 'Buy';
                    return (
                      <tr key={tx.id}>
                        <td>
                          <span
                            className="badge px-2 py-1 fw-bold"
                            style={{
                              fontSize: '0.7rem',
                              backgroundColor: isBuy ? 'var(--green-success-light)' : 'var(--red-danger-light)',
                              color: isBuy ? 'var(--green-success)' : 'var(--red-danger)',
                              borderRadius: '4px'
                            }}
                          >
                            {tx.type}
                          </span>
                        </td>
                        <td className="fw-bold">{tx.symbol}</td>
                        <td className="text-end fw-semibold">{tx.quantity}</td>
                        <td className="text-end fw-semibold">${tx.price.toFixed(2)}</td>
                        <td className="text-end text-muted d-none d-sm-table-cell" style={{ fontSize: '0.85rem' }}>{tx.date}</td>
                        <td className="text-center">
                          <span className={`badge-status badge-${tx.status.toLowerCase()}`}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-4">
          <NewsCard />
        </div>
      </div>
    </div>
  );
}