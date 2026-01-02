import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiStar, FiUsers, FiDroplet, FiSettings, FiHeart, FiCheck, FiMapPin, FiCalendar, FiShield } from 'react-icons/fi';
import { BsSpeedometer2 } from 'react-icons/bs';
import { getVehicleById, vehicles, pickupLocations } from '../data/vehicles';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import './VehicleDetailPage.css';

function VehicleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, userProfile, toggleFavorite } = useAuth();
  const { calculateCost, applyPromoCode, clearPromoCode, appliedPromo, createBooking } = useBooking();
  
  const [vehicle, setVehicle] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [includeInsurance, setIncludeInsurance] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [costDetails, setCostDetails] = useState(null);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const v = getVehicleById(id);
    if (v) {
      setVehicle(v);
    } else {
      navigate('/vehicles');
    }
  }, [id, navigate]);

  useEffect(() => {
    if (vehicle && startDate && endDate) {
      const cost = calculateCost(vehicle, startDate, endDate, includeInsurance);
      setCostDetails(cost);
    } else {
      setCostDetails(null);
    }
  }, [vehicle, startDate, endDate, includeInsurance, appliedPromo, calculateCost]);

  const handleApplyPromo = () => {
    setPromoError('');
    if (!promoCode.trim()) return;
    
    const result = applyPromoCode(promoCode);
    if (!result.success) {
      setPromoError(result.message);
    }
  };

  const handleRemovePromo = () => {
    clearPromoCode();
    setPromoCode('');
    setPromoError('');
  };

  const handleBooking = async () => {
    if (!currentUser) {
      navigate('/login', { state: { from: `/vehicles/${id}` } });
      return;
    }

    if (!startDate || !endDate || !pickupLocation) {
      alert('Please fill in all booking details');
      return;
    }

    setIsBooking(true);
    try {
      const booking = await createBooking({
        vehicleId: vehicle.id,
        vehicleName: vehicle.name,
        vehicleImage: vehicle.images[0],
        vehicleCategory: vehicle.category,
        startDate,
        endDate,
        pickupLocation,
        includeInsurance,
        promoCode: appliedPromo?.code || null,
        ...costDetails
      });
      
      navigate('/booking-confirmation', { state: { booking } });
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  const isFavorite = userProfile?.favorites?.includes(id);

  const handleFavorite = async () => {
    if (currentUser) {
      await toggleFavorite(id);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  if (!vehicle) {
    return (
      <div className="page flex-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="page vehicle-detail-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-button">
          <FiArrowLeft /> Back to vehicles
        </button>

        <div className="vehicle-detail-grid">
          {/* Gallery */}
          <div className="vehicle-gallery">
            <div className="gallery-main">
              <img src={vehicle.images[selectedImage]} alt={vehicle.name} />
              {currentUser && (
                <button 
                  className={`gallery-favorite ${isFavorite ? 'active' : ''}`}
                  onClick={handleFavorite}
                >
                  <FiHeart />
                </button>
              )}
            </div>
            <div className="gallery-thumbnails">
              {vehicle.images.map((img, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`${vehicle.name} view ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="vehicle-info">
            <span className="badge badge-primary">{vehicle.category}</span>
            <h1 className="vehicle-title">{vehicle.name}</h1>
            <p className="vehicle-subtitle">{vehicle.brand} {vehicle.model}</p>
            
            <div className="vehicle-rating">
              <FiStar className="star-filled" />
              <span className="rating-value">{vehicle.rating}</span>
              <span className="rating-count">({vehicle.reviews} reviews)</span>
            </div>

            <p className="vehicle-description">{vehicle.description}</p>

            <div className="vehicle-specs">
              <div className="spec-box">
                <FiUsers className="spec-icon" />
                <span className="spec-value">{vehicle.seatingCapacity}</span>
                <span className="spec-label">Seats</span>
              </div>
              <div className="spec-box">
                <FiDroplet className="spec-icon" />
                <span className="spec-value">{vehicle.fuelType}</span>
                <span className="spec-label">Fuel</span>
              </div>
              <div className="spec-box">
                <FiSettings className="spec-icon" />
                <span className="spec-value">{vehicle.transmission}</span>
                <span className="spec-label">Transmission</span>
              </div>
              <div className="spec-box">
                <BsSpeedometer2 className="spec-icon" />
                <span className="spec-value">{vehicle.mileage}</span>
                <span className="spec-label">Mileage</span>
              </div>
            </div>

            <div className="vehicle-features">
              <h3>Features</h3>
              <div className="features-list">
                {vehicle.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <FiCheck className="feature-check" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="booking-card">
            <div className="booking-price">
              <span className="price-amount">₹{vehicle.pricePerDay.toLocaleString()}</span>
              <span className="price-period">/day</span>
            </div>

            <div className="booking-form">
              <div className="form-group">
                <label className="form-label">
                  <FiMapPin /> Pickup Location
                </label>
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="form-input form-select"
                >
                  <option value="">Select location</option>
                  {pickupLocations.map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    <FiCalendar /> Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={today}
                    max={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <FiCalendar /> End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || today}
                    max={new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="insurance-option">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={includeInsurance}
                    onChange={(e) => setIncludeInsurance(e.target.checked)}
                  />
                  <span className="checkbox-custom"></span>
                  <div className="checkbox-content">
                    <FiShield className="insurance-icon" />
                    <div>
                      <span className="checkbox-title">Add Insurance</span>
                      <span className="checkbox-subtitle">+10% for full coverage</span>
                    </div>
                  </div>
                </label>
              </div>

              <div className="promo-section">
                <div className="promo-input-group">
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="form-input"
                    disabled={!!appliedPromo}
                  />
                  {appliedPromo ? (
                    <button className="btn btn-ghost btn-sm" onClick={handleRemovePromo}>
                      Remove
                    </button>
                  ) : (
                    <button className="btn btn-secondary btn-sm" onClick={handleApplyPromo}>
                      Apply
                    </button>
                  )}
                </div>
                {promoError && <span className="promo-error">{promoError}</span>}
                {appliedPromo && (
                  <span className="promo-success">
                    <FiCheck /> {appliedPromo.description} applied!
                  </span>
                )}
              </div>

              {costDetails && (
                <div className="cost-breakdown">
                  <div className="cost-row">
                    <span>₹{vehicle.pricePerDay.toLocaleString()} × {costDetails.days} days</span>
                    <span>₹{costDetails.baseCost.toLocaleString()}</span>
                  </div>
                  {costDetails.insuranceCost > 0 && (
                    <div className="cost-row">
                      <span>Insurance</span>
                      <span>₹{costDetails.insuranceCost.toLocaleString()}</span>
                    </div>
                  )}
                  {costDetails.discount > 0 && (
                    <div className="cost-row discount">
                      <span>Discount</span>
                      <span>-₹{costDetails.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="cost-row total">
                    <span>Total</span>
                    <span>₹{costDetails.totalCost.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <button 
                className="btn btn-primary btn-lg booking-submit"
                onClick={handleBooking}
                disabled={isBooking || !costDetails}
              >
                {isBooking ? 'Processing...' : 'Book Now'}
              </button>
            </div>
          </div>
        </div>

        {/* Similar Vehicles */}
        <section className="similar-vehicles">
          <h2>Similar Vehicles</h2>
          <div className="similar-grid">
            {vehicles
              .filter(v => v.category === vehicle.category && v.id !== vehicle.id)
              .slice(0, 3)
              .map(v => (
                <Link key={v.id} to={`/vehicles/${v.id}`} className="similar-card">
                  <img src={v.images[0]} alt={v.name} />
                  <div className="similar-info">
                    <h4>{v.name}</h4>
                    <span>₹{v.pricePerDay.toLocaleString()}/day</span>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default VehicleDetailPage;
