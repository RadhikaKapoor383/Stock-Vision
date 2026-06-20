import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { mockPortfolioAllocation } from '../data/mockData';

export default function AllocationChart() {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div 
          className="rounded-3 p-2 px-3" 
          style={{ 
            backgroundColor: 'var(--bg-secondary)', 
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <p className="mb-0 fw-semibold" style={{ fontSize: '0.85rem', color: payload[0].payload.color }}>
            {payload[0].name}: {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="premium-card h-100">
      <h5 className="mb-1 fw-bold">Portfolio Allocation</h5>
      <p className="text-muted mb-4" style={{ fontSize: '0.8rem' }}>Sector-wise distribution of assets</p>

      <div className="row align-items-center">
        {/* Recharts Donut Chart */}
        <div className="col-12 col-md-5 mb-4 mb-md-0 d-flex justify-content-center">
          <div style={{ width: '100%', height: 180, maxWidth: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockPortfolioAllocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="percentage"
                >
                  {mockPortfolioAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Beautiful Animated Progress Bars */}
        <div className="col-12 col-md-7">
          <div className="d-flex flex-column gap-3">
            {mockPortfolioAllocation.map((item, index) => (
              <div key={item.name}>
                <div className="d-flex justify-content-between align-items-center mb-1" style={{ fontSize: '0.825rem' }}>
                  <span className="fw-semibold" style={{ color: 'var(--text-primary)' }}>{item.name}</span>
                  <span className="fw-bold text-muted">{item.percentage}%</span>
                </div>
                
                {/* Track */}
                <div 
                  className="rounded-pill" 
                  style={{ 
                    height: '8px', 
                    backgroundColor: 'var(--bg-tertiary)',
                    overflow: 'hidden' 
                  }}
                >
                  {/* Fill with framer-motion */}
                  <motion.div 
                    className="h-100 rounded-pill"
                    style={{ backgroundColor: item.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: index * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
