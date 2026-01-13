import { useState, useEffect } from 'react';
import { FiCreditCard, FiCheck, FiAlertCircle, FiX, FiLoader, FiLock } from 'react-icons/fi';
import { createPaymentOrder, processTestPayment } from '../supabase/payments';
import './PaymentModal.css';

export default function PaymentModal({
  isOpen,
  onClose,
  booking,
  user,
  onPaymentSuccess,
  onPaymentFailure
}) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, processing, success, failed
  const [progressMessage, setProgressMessage] = useState('');
  const [error, setError] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  
  // Form fields for simulated payment
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setError(null);
      setPaymentDetails(null);
      setProgressMessage('');
      // Pre-fill test card details
      setCardNumber('4111 1111 1111 1111');
      setExpiry('12/28');
      setCvv('123');
      setCardName(user?.full_name || user?.fullName || 'Test User');
    }
  }, [isOpen, user]);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : v;
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handlePayment = async () => {
    // Basic validation
    if (!cardNumber || !expiry || !cvv || !cardName) {
      setError('Please fill in all card details');
      return;
    }

    setLoading(true);
    setStatus('processing');
    setError(null);

    try {
      // Create order
      await createPaymentOrder(
        booking.id,
        booking.total_cost || booking.totalCost,
        user?.id
      );

      // Process test payment with progress updates
      const result = await processTestPayment(
        booking.total_cost || booking.totalCost,
        (message) => setProgressMessage(message)
      );

      if (result.success) {
        setStatus('success');
        setPaymentDetails(result);
        if (onPaymentSuccess) {
          onPaymentSuccess({
            orderId: result.orderId,
            paymentId: result.paymentId,
            signature: result.signature
          });
        }
      } else {
        throw new Error('Payment failed');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setStatus('failed');
      setError(err.message || 'Payment failed. Please try again.');
      if (onPaymentFailure) {
        onPaymentFailure(err);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const amount = booking?.total_cost || booking?.totalCost || 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content payment-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            <FiCreditCard /> Complete Payment
          </h2>
          <button className="modal-close" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="modal-body">
          {/* Test Mode Notice */}
          {status === 'idle' && (
            <div className="test-mode-banner">
              <FiLock />
              <div>
                <strong>Test Mode</strong>
                <p>This is a simulated payment for demo purposes.</p>
              </div>
            </div>
          )}

          {/* Payment Summary */}
          <div className="payment-summary">
            <div className="payment-summary-header">
              <img 
                src={booking?.vehicle_image || booking?.vehicleImage} 
                alt={booking?.vehicle_name || booking?.vehicleName}
                className="payment-vehicle-image"
              />
              <div className="payment-vehicle-info">
                <h3>{booking?.vehicle_name || booking?.vehicleName}</h3>
                <p className="payment-dates">
                  {booking?.start_date || booking?.startDate} to {booking?.end_date || booking?.endDate}
                </p>
              </div>
            </div>

            <div className="payment-breakdown">
              <div className="payment-row">
                <span>Booking Amount</span>
                <span>₹{(booking?.base_cost || booking?.baseCost || 0).toLocaleString()}</span>
              </div>
              {(booking?.insurance_cost || booking?.insuranceCost) > 0 && (
                <div className="payment-row">
                  <span>Insurance</span>
                  <span>₹{(booking?.insurance_cost || booking?.insuranceCost).toLocaleString()}</span>
                </div>
              )}
              {(booking?.discount || 0) > 0 && (
                <div className="payment-row discount">
                  <span>Discount</span>
                  <span>-₹{(booking?.discount).toLocaleString()}</span>
                </div>
              )}
              <div className="payment-row total">
                <span>Total Amount</span>
                <span>₹{amount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          {status === 'idle' && (
            <div className="payment-form">
              <div className="form-group">
                <label className="form-label">Card Number</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="4111 1111 1111 1111"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                />
              </div>
              <div className="form-row-payment">
                <div className="form-group">
                  <label className="form-label">Expiry</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    maxLength={5}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">CVV</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    maxLength={4}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Cardholder Name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Name on card"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
              </div>
              {error && <p className="form-error">{error}</p>}
            </div>
          )}

          {/* Processing Status */}
          {status === 'processing' && (
            <div className="payment-status processing">
              <FiLoader className="spinner-icon" />
              <p>{progressMessage || 'Processing payment...'}</p>
            </div>
          )}

          {/* Success Status */}
          {status === 'success' && (
            <div className="payment-status success">
              <div className="status-icon success">
                <FiCheck />
              </div>
              <h3>Payment Successful!</h3>
              <p>Your booking has been confirmed.</p>
              {paymentDetails && (
                <div className="payment-details">
                  <p><strong>Payment ID:</strong> {paymentDetails.paymentId}</p>
                </div>
              )}
            </div>
          )}

          {/* Failed Status */}
          {status === 'failed' && (
            <div className="payment-status failed">
              <div className="status-icon failed">
                <FiAlertCircle />
              </div>
              <h3>Payment Failed</h3>
              <p>{error || 'Something went wrong. Please try again.'}</p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {status === 'idle' && (
            <>
              <button className="btn btn-ghost" onClick={onClose}>
                Cancel
              </button>
              <button 
                className="btn btn-primary btn-lg"
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FiLoader className="spinner-icon" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FiLock /> Pay ₹{amount.toLocaleString()}
                  </>
                )}
              </button>
            </>
          )}

          {status === 'success' && (
            <button className="btn btn-primary btn-lg" onClick={onClose}>
              Done
            </button>
          )}

          {status === 'failed' && (
            <>
              <button className="btn btn-ghost" onClick={onClose}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={() => setStatus('idle')}>
                Try Again
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
