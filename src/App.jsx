import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import VehiclesPage from './pages/VehiclesPage';
import VehicleDetailPage from './pages/VehicleDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import BookingsPage from './pages/BookingsPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import FavoritesPage from './pages/FavoritesPage';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <BookingProvider>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/vehicles" element={<VehiclesPage />} />
                <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/bookings" 
                  element={
                    <ProtectedRoute>
                      <BookingsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/booking-confirmation" 
                  element={
                    <ProtectedRoute>
                      <BookingConfirmationPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/favorites" 
                  element={
                    <ProtectedRoute>
                      <FavoritesPage />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </BookingProvider>
      </AuthProvider>
    </Router>
  );
}

// Simple About Page
function AboutPage() {
  return (
    <div className="page about-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">About <span className="text-gradient">RankRides</span></h1>
          <p className="page-subtitle">Your trusted partner for premium vehicle rentals</p>
        </div>
        
        <div className="about-content">
          <div className="about-section">
            <h2>Our Story</h2>
            <p>
              Founded in 2020, RankRides has grown from a small local rental service to one of 
              India's most trusted vehicle rental platforms. We believe that everyone deserves 
              access to quality transportation, whether it's for a weekend getaway, a business trip, 
              or daily commuting.
            </p>
          </div>
          
          <div className="about-section">
            <h2>Our Mission</h2>
            <p>
              To provide seamless, affordable, and premium vehicle rental experiences that empower 
              our customers to explore, travel, and live their best lives on the road.
            </p>
          </div>
          
          <div className="about-stats">
            <div className="about-stat">
              <span className="stat-value text-gradient">500+</span>
              <span className="stat-label">Vehicles</span>
            </div>
            <div className="about-stat">
              <span className="stat-value text-gradient">50+</span>
              <span className="stat-label">Cities</span>
            </div>
            <div className="about-stat">
              <span className="stat-value text-gradient">10K+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="about-stat">
              <span className="stat-value text-gradient">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple Contact Page
function ContactPage() {
  return (
    <div className="page contact-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Contact <span className="text-gradient">Us</span></h1>
          <p className="page-subtitle">We'd love to hear from you</p>
        </div>
        
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-card">
              <h3>📍 Address</h3>
              <p>123 Business Hub<br />Mumbai, Maharashtra 400001<br />India</p>
            </div>
            <div className="contact-card">
              <h3>📞 Phone</h3>
              <p>+91 98765 43210<br />+91 12345 67890</p>
            </div>
            <div className="contact-card">
              <h3>✉️ Email</h3>
              <p>hello@rankrides.com<br />support@rankrides.com</p>
            </div>
            <div className="contact-card">
              <h3>🕐 Working Hours</h3>
              <p>Mon - Fri: 9AM - 9PM<br />Sat - Sun: 10AM - 6PM</p>
            </div>
          </div>
          
          <form className="contact-form card">
            <h2>Send us a message</h2>
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input type="text" className="form-input" placeholder="John Doe" />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" placeholder="john@example.com" />
            </div>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input type="text" className="form-input" placeholder="How can we help?" />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea className="form-input" rows="5" placeholder="Your message..."></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-lg">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
