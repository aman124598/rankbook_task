import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiMapPin, FiClock, FiStar, FiX, FiPlus } from 'react-icons/fi';
import { useBooking } from '../contexts/BookingContext';
import { pickupLocations } from '../data/vehicles';
import './BookingsPage.css';

function BookingsPage() {
  const { getUserBookings, cancelBooking, extendBooking, rateVehicle, calculateDays } = useBooking();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [showRatingModal, setShowRatingModal] = useState(null);
  const [showExtendModal, setShowExtendModal] = useState(null);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [newEndDate, setNewEndDate] = useState('');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await getUserBookings();
      setBookings(data);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
      await cancelBooking(bookingId);
      loadBookings();
    } catch (error) {
      console.error('Failed to cancel booking:', error);
      alert('Failed to cancel booking. Please try again.');
    }
  };

  const handleExtendBooking = async () => {
    if (!showExtendModal || !newEndDate) return;
    
    try {
      const booking = showExtendModal;
      // Calculate daily rate from original booking
      const pricePerDay = booking.base_cost / booking.days;
      
      // Calculate new duration
      const newDays = calculateDays(booking.start_date, newEndDate);
      
      // Calculate new costs
      const newBaseCost = pricePerDay * newDays;
      const newInsuranceCost = booking.insurance_cost > 0 ? Math.round(newBaseCost * 0.1) : 0;
      const newTotalCost = newBaseCost + newInsuranceCost - (booking.discount || 0);

      await extendBooking(booking.id, newEndDate, Math.max(0, newTotalCost));
      setShowExtendModal(null);
      setNewEndDate('');
      loadBookings();
    } catch (error) {
      console.error('Failed to extend booking:', error);
      alert('Failed to extend booking. Please try again.');
    }
  };

  const handleRateVehicle = async () => {
    if (!showRatingModal) return;
    
    try {
      await rateVehicle(showRatingModal.id, rating, review);
      setShowRatingModal(null);
      setRating(5);
      setReview('');
      loadBookings();
    } catch (error) {
      console.error('Failed to rate vehicle:', error);
      alert('Failed to submit rating. Please try again.');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed': return 'badge-success';
      case 'cancelled': return 'badge-error';
      case 'completed': return 'badge-primary';
      case 'extended': return 'badge-accent';
      default: return 'badge-primary';
    }
  };

  const isUpcoming = (booking) => {
    return new Date(booking.start_date) > new Date() && booking.status !== 'cancelled';
  };

  const isPast = (booking) => {
    return new Date(booking.end_date) < new Date() || booking.status === 'cancelled';
  };

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'upcoming') return isUpcoming(booking);
    if (activeTab === 'past') return isPast(booking);
    return true;
  });

  const getLocationName = (locationId) => {
    const location = pickupLocations.find(loc => loc.id === locationId);
    return location?.name || locationId;
  };

  if (loading) {
    return (
      <div className="page flex-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="page bookings-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">My <span className="text-gradient">Bookings</span></h1>
          <p className="page-subtitle">Manage your vehicle rentals</p>
        </div>

        <div className="bookings-tabs">
          {['all', 'upcoming', 'past'].map(tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {filteredBookings.length > 0 ? (
          <div className="bookings-list">
            {filteredBookings.map(booking => (
              <div key={booking.id} className="booking-card">
                <div className="booking-image">
                  <img src={booking.vehicle_image} alt={booking.vehicle_name} />
                  <span className={`badge ${getStatusBadge(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
                
                <div className="booking-info">
                  <h3>{booking.vehicle_name}</h3>
                  <span className="booking-category">{booking.vehicle_category}</span>
                  
                  <div className="booking-details">
                    <div className="detail-item">
                      <FiCalendar />
                      <span>{new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}</span>
                    </div>
                    <div className="detail-item">
                      <FiMapPin />
                      <span>{getLocationName(booking.pickup_location)}</span>
                    </div>
                    <div className="detail-item">
                      <FiClock />
                      <span>{booking.days} days</span>
                    </div>
                  </div>

                  {booking.rating && (
                    <div className="booking-rating">
                      <FiStar className="star-filled" />
                      <span>{booking.rating}/5</span>
                    </div>
                  )}
                </div>

                <div className="booking-price-actions">
                  <div className="booking-price">
                    <span className="price-label">Total</span>
                    <span className="price-value">₹{booking.total_cost?.toLocaleString()}</span>
                  </div>
                  
                  <div className="booking-actions">
                    {isUpcoming(booking) && booking.status !== 'cancelled' && (
                      <>
                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            setShowExtendModal(booking);
                            setNewEndDate(booking.end_date);
                          }}
                        >
                          <FiPlus /> Extend
                        </button>
                        <button 
                          className="btn btn-ghost btn-sm cancel-btn"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          <FiX /> Cancel
                        </button>
                      </>
                    )}
                    
                    {isPast(booking) && booking.status !== 'cancelled' && !booking.rating && (
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => setShowRatingModal(booking)}
                      >
                        <FiStar /> Rate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3 className="empty-state-title">No bookings found</h3>
            <p className="empty-state-text">
              {activeTab === 'upcoming' 
                ? "You don't have any upcoming bookings"
                : activeTab === 'past'
                ? "You don't have any past bookings"
                : "You haven't made any bookings yet"}
            </p>
            <Link to="/vehicles" className="btn btn-primary">
              Browse Vehicles
            </Link>
          </div>
        )}
      </div>

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="modal-overlay" onClick={() => setShowRatingModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Rate Your Experience</h3>
              <button className="btn btn-ghost btn-icon" onClick={() => setShowRatingModal(null)}>
                <FiX />
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-vehicle-name">{showRatingModal.vehicle_name}</p>
              
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    className={`star-btn ${star <= rating ? 'active' : ''}`}
                    onClick={() => setRating(star)}
                  >
                    <FiStar />
                  </button>
                ))}
              </div>
              
              <div className="form-group">
                <label className="form-label">Your Review (optional)</label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share your experience..."
                  className="form-input"
                  rows={4}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setShowRatingModal(null)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleRateVehicle}>
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Extend Modal */}
      {showExtendModal && (
        <div className="modal-overlay" onClick={() => setShowExtendModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Extend Rental</h3>
              <button className="btn btn-ghost btn-icon" onClick={() => setShowExtendModal(null)}>
                <FiX />
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-vehicle-name">{showExtendModal.vehicle_name}</p>
              <p className="current-end-date">
                Current end date: {new Date(showExtendModal.end_date).toLocaleDateString()}
              </p>
              
              <div className="form-group">
                <label className="form-label">New End Date</label>
                <input
                  type="date"
                  value={newEndDate}
                  onChange={(e) => setNewEndDate(e.target.value)}
                  min={showExtendModal.end_date}
                  className="form-input"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setShowExtendModal(null)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleExtendBooking}>
                Confirm Extension
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingsPage;
