import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { FiCheck, FiCalendar, FiMapPin, FiCreditCard, FiMail, FiDownload, FiAlertCircle, FiClock } from 'react-icons/fi';
import { pickupLocations } from '../data/vehicles';
import { useAuth } from '../contexts/AuthContext';
import PaymentModal from '../components/PaymentModal';
import './BookingConfirmationPage.css';

function BookingConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const booking = location.state?.booking;
  const payment = location.state?.payment;
  const paymentPending = location.state?.paymentPending;

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(payment ? 'paid' : paymentPending ? 'pending' : 'unknown');

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

  const handlePayNow = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (details) => {
    setPaymentStatus('paid');
    setTimeout(() => {
      setShowPaymentModal(false);
    }, 2000);
  };

  return (
    <div className="page confirmation-page">
      <div className="container">
        <div className="confirmation-card">
          <div className="confirmation-header">
            <div className={`success-icon ${paymentStatus === 'pending' ? 'pending' : ''}`}>
              {paymentStatus === 'paid' ? <FiCheck /> : <FiClock />}
            </div>
            <h1>{paymentStatus === 'paid' ? 'Booking Confirmed!' : 'Booking Created!'}</h1>
            <p>
              {paymentStatus === 'paid' 
                ? 'Your vehicle has been successfully booked and paid for' 
                : 'Your booking is created. Please complete the payment to confirm.'}
            </p>
          </div>

          {/* Payment Status Banner */}
          {paymentStatus === 'pending' && (
            <div className="payment-pending-banner">
              <FiAlertCircle />
              <div>
                <strong>Payment Pending</strong>
                <p>Complete the payment to confirm your booking</p>
              </div>
              <button className="btn btn-primary btn-sm" onClick={handlePayNow}>
                Pay Now ₹{booking.total_cost?.toLocaleString()}
              </button>
            </div>
          )}

          {paymentStatus === 'paid' && (
            <div className="payment-success-banner">
              <FiCheck />
              <div>
                <strong>Payment Successful</strong>
                <p>Your payment of ₹{booking.total_cost?.toLocaleString()} has been received</p>
              </div>
            </div>
          )}

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
                    <div className={`payment-row status ${paymentStatus}`}>
                      <span>Payment Status</span>
                      <span className={`status-badge ${paymentStatus}`}>
                        {paymentStatus === 'paid' ? '✓ Paid' : '⏳ Pending'}
                      </span>
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

      {/* Payment Modal */}
      {showPaymentModal && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          booking={booking}
          user={currentUser}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentFailure={(error) => console.error('Payment failed:', error)}
        />
      )}
    </div>
  );
}

export default BookingConfirmationPage;
