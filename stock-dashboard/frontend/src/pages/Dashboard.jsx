import React from 'react';
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
import {
  mockMarketOverview,
  mockTopPerformers,
  mockTransactions
} from '../data/mockData';

export default function Dashboard({ userProfile, searchQuery = '' }) {
  // Statistics items compiled dynamically from user profile state
  const statsItems = [
    {
      title: "Portfolio Value",
      value: `$${userProfile.portfolioValue.toLocaleString()}`,
      change: `+${userProfile.portfolioChange}%`,
      isPositive: true,
      icon: FiBriefcase,
    },
    {
      title: "Today's Profit/Loss",
      value: `+$${userProfile.todayProfitLoss.toLocaleString()}`,
      change: `+${userProfile.todayProfitLossChange}%`,
      isPositive: true,
      icon: FiTrendingUp,
    },
    {
      title: "Total Investments",
      value: `$${userProfile.totalInvestments.toLocaleString()}`,
      change: "+8.3%",
      isPositive: true,
      icon: FiDollarSign,
    },
    {
      title: "Available Cash",
      value: `$${userProfile.availableCash.toLocaleString()}`,
      change: "-2.4%",
      isPositive: false,
      icon: FiActivity,
    },
    {
      title: "Active Holdings",
      value: `${userProfile.activeHoldings}`,
      change: "+1 new",
      isPositive: true,
      icon: FiLayers,
    }
  ];

  const filteredTransactions = mockTransactions.filter(tx =>
    tx.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="d-flex flex-column gap-4">
      {/* Welcome Header */}
      <div>
        <h4 className="fw-bold mb-1" style={{ color: 'var(--text-primary)' }}>Welcome back, {userProfile.name}!</h4>
        <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>Here is what's happening with your portfolio today.</p>
      </div>

      {/* Statistics Cards Row */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
        {statsItems.map((item, idx) => (
          <div key={item.title} className="col">
            <StatsCard {...item} delay={idx * 0.05} />
          </div>
        ))}
      </div>

      {/* Market Indices Section */}
      <div>
        <h6 className="fw-bold text-secondary mb-3" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Market Overview</h6>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
          {mockMarketOverview.map((item, idx) => (
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

      {/* Charts Section */}
      <div className="row g-4">
        <div className="col-12 col-xl-8">
          <PortfolioChart />
        </div>
        <div className="col-12 col-xl-4">
          <AllocationChart />
        </div>
      </div>

      {/* Watchlist & Top Performing Section */}
      <div className="row g-4">
        {/* Watchlist */}
        <div className="col-12 col-xl-8">
          <WatchlistTable searchQuery={searchQuery} />
        </div>

        {/* Top Performing Stocks */}
        <div className="col-12 col-xl-4">
          <div className="premium-card h-100">
            <h5 className="mb-1 fw-bold">Top Performing Stocks</h5>
            <p className="text-muted mb-4" style={{ fontSize: '0.8rem' }}>Highest daily gainers in your watchlists</p>

            <div className="d-flex flex-column gap-3">
              {mockTopPerformers.map((stock, idx) => (
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
                    <div className="fw-bold" style={{ fontSize: '0.9rem' }}>${stock.price}</div>
                    <span className="trend-indicator trend-up" style={{ fontSize: '0.75rem' }}>
                      <FiArrowUpRight size={12} />
                      {stock.gain}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions & Market News */}
      <div className="row g-4">
        {/* Recent Transactions Table */}
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
                    <th style={{ textAlign: 'right' }}>Quantity</th>
                    <th style={{ textAlign: 'right' }}>Price</th>
                    <th style={{ textAlign: 'right' }}>Date</th>
                    <th style={{ textAlign: 'center' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((tx, index) => {
                    const isBuy = tx.type === 'Buy';
                    return (
                      <tr key={tx.id}>
                        <td>
                          <span
                            className={`badge px-2 py-1 fw-bold`}
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
                        <td className="text-end text-muted" style={{ fontSize: '0.85rem' }}>{tx.date}</td>
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

        {/* Market News Panel */}
        <div className="col-12 col-xl-4">
          <NewsCard />
        </div>
      </div>

    </div>
  );
}
