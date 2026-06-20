import React from 'react';
import { motion } from 'framer-motion';
import { mockNews } from '../data/mockData';
import { FiClock, FiShare2 } from 'react-icons/fi';

export default function NewsCard() {
  return (
    <div className="premium-card h-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="mb-1 fw-bold">Market News</h5>
          <p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>Stay updated with global financial headlines</p>
        </div>
      </div>

      <div className="d-flex flex-column gap-3">
        {mockNews.map((article, index) => (
          <motion.a 
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            key={article.id}
            className="d-flex flex-column flex-sm-row gap-3 text-decoration-none rounded-3 p-2 border border-transparent"
            style={{ 
              color: 'inherit',
              transition: 'all var(--transition-fast)'
            }}
            whileHover={{ 
              scale: 1.01,
              backgroundColor: 'var(--bg-primary)',
              borderColor: 'var(--border-color)'
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {/* News Image */}
            <div 
              className="flex-shrink-0 rounded-3 overflow-hidden" 
              style={{ width: '100%', height: '120px', maxWidth: '140px', minWidth: '100px' }}
            >
              <img 
                src={article.image} 
                alt={article.headline}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Content */}
            <div className="d-flex flex-column justify-content-between flex-grow-1">
              <div>
                <span 
                  className="badge px-2.5 py-1 mb-2 fw-semibold" 
                  style={{ 
                    fontSize: '0.7rem', 
                    backgroundColor: 'var(--accent-purple-light)', 
                    color: 'var(--accent-purple)' 
                  }}
                >
                  {article.category}
                </span>
                <h6 className="fw-bold mb-2 line-clamp-2 text-primary-custom" style={{ fontSize: '0.925rem', lineHeight: '1.4', color: 'var(--text-primary)' }}>
                  {article.headline}
                </h6>
              </div>

              <div className="d-flex justify-content-between align-items-center mt-2 text-muted" style={{ fontSize: '0.75rem' }}>
                <span className="d-flex align-items-center gap-1">
                  <FiClock size={12} />
                  {article.time}
                </span>
                <button className="btn p-0 border-0 text-muted hover-purple">
                  <FiShare2 size={14} />
                </button>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
        .hover-purple:hover {
          color: var(--accent-purple) !important;
        }
      `}</style>
    </div>
  );
}
