import React, { useState, useEffect, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockChartData } from '../data/mockData';
import { recordSnapshot, getChartData } from '../services/portfolioHistory';

export default function PortfolioChart({ currentValue }) {
  const [timeframe, setTimeframe] = useState('monthly');

  useEffect(() => {
    if (currentValue) recordSnapshot(currentValue);
  }, [currentValue]);

  const realData = useMemo(() => getChartData(timeframe), [timeframe, currentValue]);
  const usingRealData = realData.length >= 2;
  const data = usingRealData ? realData : mockChartData[timeframe];

  const formatYAxis = (tick) => {
    if (tick >= 1000) {
      return `$${(tick / 1000).toFixed(0)}k`;
    }
    return `$${tick}`;
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="rounded-3 p-3"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <p className="text-secondary mb-1" style={{ fontSize: '0.75rem', fontWeight: 500 }}>
            {payload[0].payload.name}
          </p>
          <p className="fw-bold mb-0" style={{ color: 'var(--accent-purple)', fontSize: '1rem' }}>
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="premium-card h-100">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-4">
        <div>
          <h5 className="mb-1 fw-bold">Portfolio Performance</h5>
          <p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>Track your equity and cash growth over time</p>
          <span
            className="badge mt-1"
            style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              backgroundColor: usingRealData ? 'var(--green-success-light)' : 'var(--bg-primary)',
              color: usingRealData ? 'var(--green-success)' : 'var(--text-secondary)',
              border: usingRealData ? 'none' : '1px solid var(--border-color)',
              borderRadius: '4px',
              padding: '3px 8px',
            }}
          >
            {usingRealData ? 'Live history' : 'Sample data — building real history daily'}
          </span>
        </div>

        <div
          className="d-flex p-1 rounded-3"
          style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
        >
          {['weekly', 'monthly', 'yearly'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className="btn border-0 py-1.5 px-3 rounded-2 text-capitalize"
              style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                backgroundColor: timeframe === tf ? 'var(--bg-secondary)' : 'transparent',
                color: timeframe === tf ? 'var(--accent-purple)' : 'var(--text-secondary)',
                boxShadow: timeframe === tf ? 'var(--shadow-sm)' : 'none',
                transition: 'all var(--transition-fast)'
              }}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          width: '100%',
          minWidth: 0,
          height: 'clamp(260px, 45vw, 320px)',
          minHeight: 260,
        }}
      >
        <ResponsiveContainer width="100%" height="100%" minWidth={240} minHeight={260} debounce={50}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent-purple)" stopOpacity={0.25} />
                <stop offset="95%" stopColor="var(--accent-purple)" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border-color)"
            />
            <XAxis
              dataKey="name"
              stroke="var(--text-light)"
              fontSize={11}
              dy={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="var(--text-light)"
              fontSize={11}
              dx={-5}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatYAxis}
              domain={['dataMin - 10000', 'dataMax + 5000']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--accent-purple)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}