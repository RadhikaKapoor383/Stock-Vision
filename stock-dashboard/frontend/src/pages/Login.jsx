import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiTrendingUp, FiUser } from 'react-icons/fi';

export default function Login({ onLogin, onSignUp }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('Radhika Kapoor');
  const [email, setEmail] = useState('radhika.kapoor@university.edu');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (isSignUp && !fullName)) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (isSignUp) {
        onSignUp({ email, name: fullName });
      } else {
        onLogin({ email });
      }
    }, 800);
  };

  return (
    <div className="auth-page">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center justify-content-center p-3 mb-3 rounded-circle" style={{ backgroundColor: 'var(--accent-purple-light)', border: '1.5px solid var(--accent-purple)' }}>
            <FiTrendingUp size={36} color="var(--accent-purple)" />
          </div>
          <h2 className="fw-bold">Stock Vision</h2>
          <p className="text-muted">Analyze. Invest. Grow.</p>
        </div>

        <h4 className="text-center fw-bold mb-4" style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>
          {isSignUp ? 'Create Your Account' : 'Sign In to Dashboard'}
        </h4>

        {error && (
          <div className="alert alert-danger py-2 text-center" role="alert" style={{ fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="mb-3">
              <label className="form-label text-secondary fw-medium" style={{ fontSize: '0.85rem' }}>Full Name</label>
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0 text-muted">
                  <FiUser />
                </span>
                <input
                  type="text"
                  className="form-control form-control-premium border-start-0 ps-0"
                  placeholder="Radhika Kapoor"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="mb-3">
            <label className="form-label text-secondary fw-medium" style={{ fontSize: '0.85rem' }}>Email Address</label>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0 text-muted">
                <FiMail />
              </span>
              <input
                type="email"
                className="form-control form-control-premium border-start-0 ps-0"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label className="form-label text-secondary fw-medium mb-0" style={{ fontSize: '0.85rem' }}>Password</label>
              {!isSignUp && (
                <a href="#" className="text-decoration-none fw-medium" style={{ fontSize: '0.8rem', color: 'var(--accent-purple)' }}>Forgot?</a>
              )}
            </div>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0 text-muted">
                <FiLock />
              </span>
              <input
                type="password"
                className="form-control form-control-premium border-start-0 ps-0"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-premium-primary w-100 py-2.5 d-flex align-items-center justify-content-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        <div className="text-center mt-4 pt-3 border-top border-light">
          <p className="mb-0 text-muted" style={{ fontSize: '0.875rem' }}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type="button"
              className="btn btn-link p-0 border-0 fw-semibold text-decoration-none"
              style={{ color: 'var(--accent-purple)', fontSize: '0.875rem' }}
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
