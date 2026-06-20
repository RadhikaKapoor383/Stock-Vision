import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiArrowDownRight, FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { mockWatchlist } from '../data/mockData';

export default function WatchlistTable({ searchQuery = '' }) {
  const [list, setList] = useState(mockWatchlist);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedList = [...list].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setList(sortedList);
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? <FiChevronUp className="ms-1" /> : <FiChevronDown className="ms-1" />;
  };

  const filteredList = list.filter(stock => 
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="premium-card h-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="mb-1 fw-bold">Watchlist</h5>
          <p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>Monitor real-time prices of your favorite tickers</p>
        </div>
      </div>

      <div className="custom-table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('symbol')} style={{ cursor: 'pointer' }}>
                Symbol {getSortIcon('symbol')}
              </th>
              <th>Company</th>
              <th onClick={() => handleSort('price')} style={{ cursor: 'pointer', textAlign: 'right' }}>
                Price {getSortIcon('price')}
              </th>
              <th onClick={() => handleSort('changePercent')} style={{ cursor: 'pointer', textAlign: 'right' }}>
                Change {getSortIcon('changePercent')}
              </th>
              <th style={{ textAlign: 'right' }}>Volume</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((stock, index) => {
              const isPositive = stock.change >= 0;
              return (
                <motion.tr 
                  key={stock.symbol}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <td className="fw-bold" style={{ color: 'var(--text-primary)' }}>
                    {stock.symbol}
                  </td>
                  <td className="text-secondary" style={{ fontSize: '0.85rem' }}>
                    {stock.name}
                  </td>
                  <td className="fw-semibold text-end">
                    ${stock.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className={`fw-semibold text-end ${isPositive ? 'trend-up' : 'trend-down'}`}>
                    <span className="d-inline-flex align-items-center gap-1">
                      {isPositive ? <FiArrowUpRight size={14} /> : <FiArrowDownRight size={14} />}
                      {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </span>
                  </td>
                  <td className="text-end text-muted">
                    {stock.volume}
                  </td>
                </motion.tr>
              );
            })}
            {filteredList.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-muted">
                  No stocks match your search query.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
