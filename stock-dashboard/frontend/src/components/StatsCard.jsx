import React from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

export default function StatsCard({ title, value, change, isPositive, icon: Icon, delay, loading }) {
  return (
    <motion.div 
      className="premium-card stats-card h-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay }}
    >
      <div className="d-flex justify-content-between align-items-start mb-2">
        <span className="stats-title text-secondary fw-semibold">{title}</span>
        <div 
          className="stats-icon d-flex align-items-center justify-content-center rounded-3 flex-shrink-0" 
          style={{ width: '36px', height: '36px', backgroundColor: 'var(--accent-purple-light)', color: 'var(--accent-purple)' }}
        >
          <Icon size={16} />
        </div>
      </div>

      {loading ? (
        /* Skeleton shimmer while API loads */
        <div>
          <div className="skeleton mb-2" style={{ height: '28px', width: '80%', borderRadius: '6px' }} />
          <div className="skeleton" style={{ height: '14px', width: '50%', borderRadius: '4px' }} />
        </div>
      ) : (
        <>
          <div className="d-flex align-items-baseline gap-2">
            <h3 className="stats-value mb-0 fw-bold" style={{ color: 'var(--text-primary)' }}>
              {value}
            </h3>
          </div>
          <div className="d-flex align-items-center justify-content-between mt-2">
            <span className={`trend-indicator ${isPositive ? 'trend-up' : 'trend-down'}`} style={{ fontSize: '0.8rem' }}>
              {isPositive ? <FiTrendingUp size={13} /> : <FiTrendingDown size={13} />}
              <span>{change}</span>
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>vs last month</span>
          </div>
        </>
      )}

      <style>{`
        .stats-card { padding: 16px !important; }
        .stats-title { font-size: 0.78rem; line-height: 1.3; }
        .stats-value { font-size: 1.35rem; line-height: 1.2; word-break: break-all; }

        .skeleton {
          background: linear-gradient(90deg, var(--bg-tertiary) 25%, var(--border-color) 50%, var(--bg-tertiary) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
        }
        @keyframes shimmer { to { background-position: -200% 0; } }

        @media (max-width: 399px) {
          .stats-card { padding: 12px !important; }
          .stats-value { font-size: 1.1rem !important; }
          .stats-title { font-size: 0.72rem; }
          .stats-icon { width: 30px !important; height: 30px !important; }
        }
        @media (min-width: 400px) and (max-width: 767px) {
          .stats-value { font-size: 1.2rem !important; }
        }
        @media (min-width: 768px) and (max-width: 1199px) {
          .stats-value { font-size: 1.25rem !important; }
        }
      `}</style>
    </motion.div>
  );
}