import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCompass, FiDollarSign, FiSave, FiAlertCircle } from 'react-icons/fi';

export default function ProfileSettings({ userProfile, setUserProfile }) {
  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone,
    role: userProfile.role,
    country: userProfile.country,
    currency: userProfile.currency,
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Name and Email are required.');
      setMessage('');
      return;
    }

    // Calculate initials
    const words = formData.name.trim().split(' ');
    const initials = words.length > 1 
      ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
      : words[0][0].toUpperCase();

    const updatedProfile = {
      ...userProfile,
      ...formData,
      initials: initials,
    };

    setUserProfile(updatedProfile);
    setError('');
    setMessage('Profile details updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Profile & Account Settings</h4>
          <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>Update your personal details and app configuration</p>
        </div>
      </div>

      <div className="row g-4">
        {/* Profile Info Summary Card */}
        <div className="col-12 col-lg-4">
          <div className="premium-card text-center d-flex flex-column align-items-center py-5">
            <div className="avatar-initials-lg mb-3 d-flex align-items-center justify-content-center">
              {userProfile.initials}
            </div>
            <h5 className="fw-bold mb-1">{userProfile.name}</h5>
            <span className="badge bg-purple-light text-purple mb-4" style={{ fontSize: '0.75rem', backgroundColor: 'var(--accent-purple-light)', color: 'var(--accent-purple)', padding: '6px 12px', borderRadius: '50px' }}>
              {userProfile.role}
            </span>
            
            <div className="w-100 border-top border-light pt-4 mt-2 text-start px-3">
              <div className="d-flex justify-content-between mb-2" style={{ fontSize: '0.85rem' }}>
                <span className="text-muted">Account Status</span>
                <span className="fw-bold text-success">Active</span>
              </div>
              <div className="d-flex justify-content-between mb-2" style={{ fontSize: '0.85rem' }}>
                <span className="text-muted">Member Since</span>
                <span className="fw-bold text-secondary-custom">{userProfile.joinedDate}</span>
              </div>
              <div className="d-flex justify-content-between" style={{ fontSize: '0.85rem' }}>
                <span className="text-muted">Portfolio Value</span>
                <span className="fw-bold text-secondary-custom">${userProfile.portfolioValue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Editing Form */}
        <div className="col-12 col-lg-8">
          <div className="premium-card">
            <h5 className="fw-bold mb-4">Personal Details</h5>

            {message && (
              <div className="alert alert-success d-flex align-items-center gap-2 mb-4" role="alert" style={{ fontSize: '0.9rem' }}>
                <FiCompass size={18} />
                <div>{message}</div>
              </div>
            )}

            {error && (
              <div className="alert alert-danger d-flex align-items-center gap-2 mb-4" role="alert" style={{ fontSize: '0.9rem' }}>
                <FiAlertCircle size={18} />
                <div>{error}</div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                {/* Full Name */}
                <div className="col-12 col-md-6">
                  <label className="form-label text-secondary fw-semibold" style={{ fontSize: '0.85rem' }}>Full Name</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0 text-muted">
                      <FiUser />
                    </span>
                    <input 
                      type="text" 
                      name="name"
                      className="form-control form-control-premium border-start-0 ps-0" 
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="col-12 col-md-6">
                  <label className="form-label text-secondary fw-semibold" style={{ fontSize: '0.85rem' }}>Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0 text-muted">
                      <FiMail />
                    </span>
                    <input 
                      type="email" 
                      name="email"
                      className="form-control form-control-premium border-start-0 ps-0" 
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="col-12 col-md-6">
                  <label className="form-label text-secondary fw-semibold" style={{ fontSize: '0.85rem' }}>Phone Number</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0 text-muted">
                      <FiPhone />
                    </span>
                    <input 
                      type="text" 
                      name="phone"
                      className="form-control form-control-premium border-start-0 ps-0" 
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Account Role */}
                <div className="col-12 col-md-6">
                  <label className="form-label text-secondary fw-semibold" style={{ fontSize: '0.85rem' }}>Investment Tier</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0 text-muted">
                      <FiCompass />
                    </span>
                    <select 
                      name="role"
                      className="form-select form-control-premium border-start-0 ps-0"
                      value={formData.role}
                      onChange={handleChange}
                      style={{ boxShadow: 'none' }}
                    >
                      <option value="Premium Investor">Premium Investor</option>
                      <option value="Standard Trader">Standard Trader</option>
                      <option value="Institutional Investor">Institutional Investor</option>
                    </select>
                  </div>
                </div>

                {/* Country */}
                <div className="col-12 col-md-6">
                  <label className="form-label text-secondary fw-semibold" style={{ fontSize: '0.85rem' }}>Country / Region</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0 text-muted">
                      <FiMapPin />
                    </span>
                    <input 
                      type="text" 
                      name="country"
                      className="form-control form-control-premium border-start-0 ps-0" 
                      value={formData.country}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Currency */}
                <div className="col-12 col-md-6">
                  <label className="form-label text-secondary fw-semibold" style={{ fontSize: '0.85rem' }}>Preferred Currency</label>
                  <div className="input-group">
                    <span className="input-group-text bg-transparent border-end-0 text-muted">
                      <FiDollarSign />
                    </span>
                    <input 
                      type="text" 
                      name="currency"
                      className="form-control form-control-premium border-start-0 ps-0" 
                      value={formData.currency}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-top border-light d-flex justify-content-end">
                <button 
                  type="submit" 
                  className="btn btn-premium-primary d-flex align-items-center gap-2"
                >
                  <FiSave size={16} />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
