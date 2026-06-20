import React from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

export default function StatsCard({ title, value, change, isPositive, icon: Icon, delay }) {
  return (
    <motion.div 
      className="premium-card h-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-secondary fw-semibold" style={{ fontSize: '0.85rem' }}>{title}</span>
        <div 
          className="d-flex align-items-center justify-content-center rounded-3" 
          style={{ 
            width: '38px', 
            height: '38px', 
            backgroundColor: 'var(--accent-purple-light)', 
            color: 'var(--accent-purple)' 
          }}
        >
          <Icon size={18} />
        </div>
      </div>

      <div className="d-flex align-items-baseline gap-2">
        <h3 className="mb-0 fw-bold" style={{ fontSize: '1.6rem', color: 'var(--text-primary)' }}>
          {value}
        </h3>
      </div>

      <div className="d-flex align-items-center justify-content-between mt-3">
        <span className={`trend-indicator ${isPositive ? 'trend-up' : 'trend-down'}`}>
          {isPositive ? <FiTrendingUp size={14} /> : <FiTrendingDown size={14} />}
          <span>{change}</span>
        </span>
        <span className="text-light" style={{ fontSize: '0.75rem' }}>vs last month</span>
      </div>
    </motion.div>
  );
}
