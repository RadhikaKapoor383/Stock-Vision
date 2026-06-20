import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiArrowDownRight, FiChevronUp, FiChevronDown, FiPlus, FiTrash2, FiRefreshCw } from 'react-icons/fi';
import { mockWatchlist } from '../data/mockData';
import { fetchMultipleQuotes } from '../services/finnhub';

const REFRESH_INTERVAL = 30000; // refresh every 30 seconds

const STORAGE_KEY = 'stockvision_watchlist';

function loadWatchlist() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return mockWatchlist;
}

function saveWatchlist(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {}
}

export default function WatchlistTable({ searchQuery = '' }) {
  const [list, setList] = useState(loadWatchlist);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [addMode, setAddMode] = useState(false);
  const [newSymbol, setNewSymbol] = useState('');
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newChange, setNewChange] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [apiError, setApiError] = useState('');

  // Fetch live prices and merge into list
  const refreshPrices = useCallback(async (currentList) => {
    setLoading(true);
    setApiError('');
    try {
      const symbols = currentList.map(s => s.symbol);
      const quotes = await fetchMultipleQuotes(symbols);
      setList(prev => prev.map(stock => {
        const live = quotes.find(q => q.symbol === stock.symbol);
        if (!live || !live.price) return stock;
        return { ...stock, price: live.price, change: live.change, changePercent: live.changePercent, isPositive: live.isPositive };
      }));
      setLastUpdated(new Date());
    } catch (err) {
      setApiError('Live prices unavailable. Showing last known data.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on mount + every 30s
  useEffect(() => {
    const initial = loadWatchlist();
    refreshPrices(initial);
    const interval = setInterval(() => refreshPrices(loadWatchlist()), REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [refreshPrices]);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    const sortedList = [...list].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setList(sortedList);
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? <FiChevronUp className="ms-1" /> : <FiChevronDown className="ms-1" />;
  };

  const handleAdd = () => {
    const symbol = newSymbol.trim().toUpperCase();
    const name = newName.trim();
    const price = parseFloat(newPrice);
    const changeVal = parseFloat(newChange);

    if (!symbol || !name || isNaN(price) || isNaN(changeVal)) return;

    const changePercent = parseFloat(((changeVal / (price - changeVal)) * 100).toFixed(2));

    const newEntry = {
      symbol,
      name,
      price,
      change: changeVal,
      changePercent,
      volume: 'N/A',
      isPositive: changeVal >= 0,
    };

    setList(prev => [newEntry, ...prev]);
    setNewSymbol(''); setNewName(''); setNewPrice(''); setNewChange('');
    setAddMode(false);
  };

  const handleRemove = (symbol) => {
    setList(prev => prev.filter(s => s.symbol !== symbol));
  };

  const handleReset = () => {
    setList(mockWatchlist);
    saveWatchlist(mockWatchlist);
  };

  const filteredList = list.filter(stock => 
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="premium-card h-100">
      <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-2">
        <div>
          <h5 className="mb-1 fw-bold">Watchlist</h5>
          <p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>
            {lastUpdated
              ? `Live prices · Updated ${lastUpdated.toLocaleTimeString()}`
              : 'Monitor real-time prices of your favorite tickers'}
          </p>
        </div>
        <div className="d-flex gap-2">
          <button
            className="btn d-flex align-items-center gap-1"
            style={{ padding: '6px 12px', fontSize: '0.8rem', color: 'var(--text-light)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
            onClick={() => refreshPrices(list)}
            disabled={loading}
            title="Refresh prices"
          >
            <FiRefreshCw size={13} className={loading ? 'spin' : ''} />
            {loading ? 'Updating...' : 'Refresh'}
          </button>
          <button
            className="btn btn-premium-outline d-flex align-items-center gap-1"
            style={{ padding: '6px 12px', fontSize: '0.8rem' }}
            onClick={() => setAddMode(!addMode)}
          >
            <FiPlus size={14} />
            Add Stock
          </button>
          <button
            className="btn"
            style={{ padding: '6px 12px', fontSize: '0.8rem', color: 'var(--text-light)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
            onClick={handleReset}
            title="Reset to default"
          >
            Reset
          </button>
        </div>
      </div>

      {/* API Error Banner */}
      {apiError && (
        <div className="alert alert-warning py-2 mb-3 d-flex align-items-center gap-2" style={{ fontSize: '0.8rem', borderRadius: '10px' }}>
          <span>⚠️</span> {apiError}
        </div>
      )}

      {/* Add Stock Form */}
      {addMode && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-4 p-3 rounded-3"
          style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
        >
          <p className="fw-semibold mb-3" style={{ fontSize: '0.85rem' }}>Add a stock to your watchlist</p>
          <div className="row g-2">
            <div className="col-6 col-sm-3">
              <input
                type="text"
                className="form-control form-control-premium"
                placeholder="Symbol (e.g. GOOGL)"
                value={newSymbol}
                onChange={e => setNewSymbol(e.target.value)}
                style={{ fontSize: '0.85rem', padding: '8px 12px' }}
              />
            </div>
            <div className="col-6 col-sm-3">
              <input
                type="text"
                className="form-control form-control-premium"
                placeholder="Company Name"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                style={{ fontSize: '0.85rem', padding: '8px 12px' }}
              />
            </div>
            <div className="col-6 col-sm-2">
              <input
                type="number"
                className="form-control form-control-premium"
                placeholder="Price ($)"
                value={newPrice}
                onChange={e => setNewPrice(e.target.value)}
                style={{ fontSize: '0.85rem', padding: '8px 12px' }}
              />
            </div>
            <div className="col-6 col-sm-2">
              <input
                type="number"
                className="form-control form-control-premium"
                placeholder="Change ($)"
                value={newChange}
                onChange={e => setNewChange(e.target.value)}
                style={{ fontSize: '0.85rem', padding: '8px 12px' }}
              />
            </div>
            <div className="col-12 col-sm-2 d-flex gap-2">
              <button className="btn btn-premium-primary flex-grow-1" style={{ padding: '8px', fontSize: '0.85rem' }} onClick={handleAdd}>
                Add
              </button>
              <button className="btn" style={{ padding: '8px 10px', fontSize: '0.85rem', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-secondary)' }} onClick={() => setAddMode(false)}>
                ✕
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="custom-table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('symbol')} style={{ cursor: 'pointer' }}>
                Symbol {getSortIcon('symbol')}
              </th>
              <th className="d-none d-sm-table-cell">Company</th>
              <th onClick={() => handleSort('price')} style={{ cursor: 'pointer', textAlign: 'right' }}>
                Price {getSortIcon('price')}
              </th>
              <th onClick={() => handleSort('changePercent')} style={{ cursor: 'pointer', textAlign: 'right' }}>
                Change {getSortIcon('changePercent')}
              </th>
              <th style={{ textAlign: 'right' }} className="d-none d-md-table-cell">Volume</th>
              <th style={{ textAlign: 'center', width: '40px' }}></th>
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
                    <div className="d-sm-none text-muted fw-normal" style={{ fontSize: '0.72rem' }}>{stock.name}</div>
                  </td>
                  <td className="text-secondary d-none d-sm-table-cell" style={{ fontSize: '0.85rem' }}>
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
                  <td className="text-end text-muted d-none d-md-table-cell">
                    {stock.volume}
                  </td>
                  <td className="text-center">
                    <button
                      className="btn p-1 border-0"
                      style={{ color: 'var(--text-light)', lineHeight: 1 }}
                      onClick={() => handleRemove(stock.symbol)}
                      title="Remove from watchlist"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </td>
                </motion.tr>
              );
            })}
            {filteredList.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  No stocks match your search query.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-muted mt-3 mb-0" style={{ fontSize: '0.72rem' }}>
        {list.length} stock{list.length !== 1 ? 's' : ''} tracked · Auto-refreshes every 30s
      </p>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}