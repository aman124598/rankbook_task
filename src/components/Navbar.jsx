import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiMenu, FiX, FiUser, FiLogOut, FiHeart, FiCalendar } from 'react-icons/fi';
import { RiCarLine } from 'react-icons/ri';
import './Navbar.css';

function Navbar() {
  const { currentUser, userProfile, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      // Always navigate home, even if there's an error
      // State is cleared immediately in logout()
      navigate('/');
    }
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/vehicles', label: 'Browse Vehicles' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <RiCarLine />
          </div>
          <span className="logo-text">Rank<span className="text-gradient">Rides</span></span>
        </Link>

        <div className={`navbar-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          {currentUser ? (
            <div className="profile-menu-container">
              <button 
                className="profile-trigger"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                {userProfile?.profilePicture ? (
                  <img 
                    src={userProfile.profilePicture} 
                    alt="Profile" 
                    className="profile-avatar"
                  />
                ) : (
                  <div className="profile-avatar-placeholder">
                    {userProfile?.fullName?.charAt(0) || currentUser.email?.charAt(0)}
                  </div>
                )}
                <span className="profile-name">{userProfile?.fullName?.split(' ')[0] || 'User'}</span>
              </button>

              {isProfileMenuOpen && (
                <div className="profile-dropdown">
                  <div className="profile-dropdown-header">
                    <p className="profile-dropdown-name">{userProfile?.fullName}</p>
                    <p className="profile-dropdown-email">{currentUser.email}</p>
                  </div>
                  <div className="profile-dropdown-divider" />
                  <Link to="/profile" className="profile-dropdown-item">
                    <FiUser /> My Profile
                  </Link>
                  <Link to="/bookings" className="profile-dropdown-item">
                    <FiCalendar /> My Bookings
                  </Link>
                  <Link to="/favorites" className="profile-dropdown-item">
                    <FiHeart /> Favorites
                  </Link>
                  <div className="profile-dropdown-divider" />
                  <button onClick={handleLogout} className="profile-dropdown-item logout">
                    <FiLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-ghost">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </div>
          )}

          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
