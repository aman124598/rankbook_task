import { Link } from 'react-router-dom';
import { RiCarLine } from 'react-icons/ri';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow"></div>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="logo-icon">
                <RiCarLine />
              </div>
              <span className="logo-text">Rank<span className="text-gradient">Rides</span></span>
            </Link>
            <p className="footer-description">
              Experience premium vehicle rentals with our extensive fleet of cars and bikes. 
              Your journey begins here.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook"><FiFacebook /></a>
              <a href="#" className="social-link" aria-label="Twitter"><FiTwitter /></a>
              <a href="#" className="social-link" aria-label="Instagram"><FiInstagram /></a>
              <a href="#" className="social-link" aria-label="LinkedIn"><FiLinkedin /></a>
            </div>
          </div>

          <div className="footer-links">
            <h4 className="footer-title">Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/vehicles">Browse Vehicles</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4 className="footer-title">Vehicle Types</h4>
            <ul>
              <li><Link to="/vehicles?category=sedan">Sedans</Link></li>
              <li><Link to="/vehicles?category=suv">SUVs</Link></li>
              <li><Link to="/vehicles?category=bike">Bikes</Link></li>
              <li><Link to="/vehicles">All Vehicles</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-title">Contact Us</h4>
            <ul>
              <li>
                <FiMapPin />
                <span>123 Business Hub, Mumbai, India</span>
              </li>
              <li>
                <FiPhone />
                <span>+91 98765 43210</span>
              </li>
              <li>
                <FiMail />
                <span>hello@rankrides.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} RankRides. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
