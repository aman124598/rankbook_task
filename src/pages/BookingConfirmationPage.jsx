import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FiCheck, FiCalendar, FiMapPin, FiCreditCard, FiMail, FiDownload } from 'react-icons/fi';
import { pickupLocations } from '../data/vehicles';
import './BookingConfirmationPage.css';

function BookingConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div className="page flex-center">
        <div className="empty-state">
          <div className="empty-state-icon">❌</div>
          <h3 className="empty-state-title">No booking found</h3>
          <p className="empty-state-text">The booking information is not available.</p>
          <Link to="/vehicles" className="btn btn-primary">
            Browse Vehicles
          </Link>
        </div>
      </div>
    );
  }

  const getLocationDetails = (locationId) => {
    return pickupLocations.find(loc => loc.id === locationId);
  };

  const pickupLoc = getLocationDetails(booking.pickup_location);

  return (
    <div className="page confirmation-page">
      <div className="container">
        <div className="confirmation-card">
          <div className="confirmation-header">
            <div className="success-icon">
              <FiCheck />
            </div>
            <h1>Booking Confirmed!</h1>
            <p>Your vehicle has been successfully booked</p>
          </div>

          <div className="booking-id">
            <span className="label">Booking ID</span>
            <span className="value">{booking.id}</span>
          </div>

          <div className="confirmation-content">
            <div className="confirmation-vehicle">
              <img src={booking.vehicle_image} alt={booking.vehicle_name} />
              <div className="vehicle-details">
                <span className="badge badge-primary">{booking.vehicle_category}</span>
                <h2>{booking.vehicle_name}</h2>
              </div>
            </div>

            <div className="confirmation-details">
              <div className="detail-card">
                <div className="detail-icon">
                  <FiCalendar />
                </div>
                <div className="detail-content">
                  <h4>Rental Period</h4>
                  <p>{new Date(booking.start_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} - {new Date(booking.end_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                  <span className="detail-sub">{booking.days} days</span>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-icon">
                  <FiMapPin />
                </div>
                <div className="detail-content">
                  <h4>Pickup Location</h4>
                  <p>{pickupLoc?.name}</p>
                  <span className="detail-sub">{pickupLoc?.address}</span>
                </div>
              </div>

              <div className="detail-card">
                <div className="detail-icon">
                  <FiCreditCard />
                </div>
                <div className="detail-content">
                  <h4>Payment Summary</h4>
                  <div className="payment-breakdown">
                    <div className="payment-row">
                      <span>Base Cost ({booking.days} days)</span>
                      <span>₹{booking.base_cost?.toLocaleString()}</span>
                    </div>
                    {booking.insurance_cost > 0 && (
                      <div className="payment-row">
                        <span>Insurance</span>
                        <span>₹{booking.insurance_cost?.toLocaleString()}</span>
                      </div>
                    )}
                    {booking.discount > 0 && (
                      <div className="payment-row discount">
                        <span>Discount ({booking.promo_code})</span>
                        <span>-₹{booking.discount?.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="payment-row total">
                      <span>Total Amount</span>
                      <span>₹{booking.total_cost?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="confirmation-footer">
            <div className="email-notice">
              <FiMail />
              <span>A confirmation email has been sent to your registered email address.</span>
            </div>

            <div className="confirmation-actions">
              <button className="btn btn-secondary">
                <FiDownload /> Download Receipt
              </button>
              <button className="btn btn-primary" onClick={() => navigate('/bookings')}>
                View My Bookings
              </button>
            </div>
          </div>
        </div>

        <div className="next-steps">
          <h3>What's Next?</h3>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h4>Pickup Documents</h4>
              <p>Bring your driver's license and a valid ID proof when picking up the vehicle.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h4>Vehicle Inspection</h4>
              <p>Inspect the vehicle with our staff and sign off on the condition report.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h4>Hit the Road!</h4>
              <p>Drive safely and enjoy your journey. Contact us if you need any assistance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmationPage;
