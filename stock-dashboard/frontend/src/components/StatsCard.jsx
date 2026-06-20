import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';

export default function StatsCard({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  delay = 0,
  loading = false,
}) {
  return (
    <motion.div
      className="premium-card p-3 h-100"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <div className="d-flex justify-content-between align-items-start mb-2">
        <span className="text-muted fw-semibold" style={{ fontSize: '0.75rem' }}>
          {title}
        </span>
        {Icon && (
          <div
            className="d-flex align-items-center justify-content-center rounded-3"
            style={{
              width: 32,
              height: 32,
              backgroundColor: 'var(--accent-purple-light)',
              color: 'var(--accent-purple)',
              flexShrink: 0,
            }}
          >
            <Icon size={16} />
          </div>
        )}
      </div>

      {loading ? (
        <div
          className="rounded-2"
          style={{
            height: '1.5rem',
            width: '70%',
            backgroundColor: 'var(--bg-primary)',
            opacity: 0.6,
            animation: 'pulse 1.4s ease-in-out infinite',
          }}
        />
      ) : (
        <div className="fw-bold fs-5 mb-1" style={{ color: 'var(--text-primary)' }}>
          {value}
        </div>
      )}

      {!loading && change && (
        <span
          className={`trend-indicator ${isPositive ? 'trend-up' : 'trend-down'}`}
          style={{ fontSize: '0.75rem' }}
        >
          {isPositive ? <FiArrowUpRight size={12} /> : <FiArrowDownRight size={12} />}
          {change}
        </span>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </motion.div>
  );
}