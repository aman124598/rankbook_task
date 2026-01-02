import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiPhone, FiCreditCard, FiCalendar } from 'react-icons/fi';
import { RiCarLine } from 'react-icons/ri';
import { useAuth } from '../contexts/AuthContext';
import './AuthPages.css';

function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    licenseExpiry: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await signup(formData.email, formData.password, {
        fullName: formData.fullName,
        phone: formData.phone,
        licenseNumber: formData.licenseNumber,
        licenseExpiry: formData.licenseExpiry
      });
      
      // Redirect to home page after successful signup
      navigate('/');
    } catch (err) {
      if (err.message?.includes('already registered') || err.message?.includes('already exists')) {
        setError('Email is already registered. Please login instead.');
      } else {
        setError(err.message || 'Registration failed. Please try again.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page signup-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <Link to="/" className="auth-logo">
              <div className="logo-icon">
                <RiCarLine />
              </div>
              <span>Rank<span className="text-gradient">Rides</span></span>
            </Link>
            <h1>Create Account</h1>
            <p>Join RankRides and start your journey</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="input-with-icon">
                  <FiUser className="input-icon" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <div className="input-with-icon">
                  <FiPhone className="input-icon" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-with-icon">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">License Number</label>
                <div className="input-with-icon">
                  <FiCreditCard className="input-icon" />
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    placeholder="DL-01234567890"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">License Expiry</label>
                <div className="input-with-icon">
                  <FiCalendar className="input-icon" />
                  <input
                    type="date"
                    name="licenseExpiry"
                    value={formData.licenseExpiry}
                    onChange={handleChange}
                    className="form-input"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    max={new Date(new Date().setFullYear(new Date().getFullYear() + 20)).toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-with-icon">
                  <FiLock className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min. 6 characters"
                    className="form-input"
                    required
                  />
                  <button
                    type="button"
                    className="input-action"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="input-with-icon">
                  <FiLock className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="terms-checkbox">
              <label className="checkbox-inline">
                <input type="checkbox" required />
                <span>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></span>
              </label>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-lg auth-submit"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>

        <div className="auth-visual">
          <div className="auth-visual-content">
            <h2>Join the Ride</h2>
            <p>Get access to premium vehicles, exclusive offers, and seamless bookings.</p>
            <div className="auth-benefits">
              <div className="benefit-item">
                <span className="benefit-check">✓</span>
                <span>10% off on first booking</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-check">✓</span>
                <span>Free cancellation on most bookings</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-check">✓</span>
                <span>24/7 customer support</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-check">✓</span>
                <span>Loyalty rewards program</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
