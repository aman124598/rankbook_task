import { Link } from 'react-router-dom';
import { FiHeart, FiStar, FiUsers, FiDroplet, FiSettings } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import './VehicleCard.css';

function VehicleCard({ vehicle, showFavorite = true }) {
  const { currentUser, userProfile, toggleFavorite } = useAuth();
  
  const isFavorite = userProfile?.favorites?.includes(vehicle.id);

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentUser) {
      await toggleFavorite(vehicle.id);
    }
  };

  const getCategoryBadgeColor = (category) => {
    switch (category) {
      case 'sedan': return 'badge-primary';
      case 'suv': return 'badge-accent';
      case 'bike': return 'badge-success';
      default: return 'badge-primary';
    }
  };

  return (
    <Link to={`/vehicles/${vehicle.id}`} className="vehicle-card">
      <div className="vehicle-card-image-container">
        <img 
          src={vehicle.images[0]} 
          alt={vehicle.name}
          className="vehicle-card-image"
        />
        <div className="vehicle-card-overlay">
          <span className={`badge ${getCategoryBadgeColor(vehicle.category)}`}>
            {vehicle.category}
          </span>
          {showFavorite && currentUser && (
            <button 
              className={`favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={handleFavoriteClick}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <FiHeart />
            </button>
          )}
        </div>
      </div>
      
      <div className="vehicle-card-content">
        <div className="vehicle-card-header">
          <h3 className="vehicle-card-title">{vehicle.name}</h3>
          <div className="vehicle-card-rating">
            <FiStar className="star-icon" />
            <span>{vehicle.rating}</span>
            <span className="review-count">({vehicle.reviews})</span>
          </div>
        </div>
        
        <p className="vehicle-card-brand">{vehicle.brand} {vehicle.model}</p>
        
        <div className="vehicle-card-specs">
          <div className="spec-item">
            <FiUsers />
            <span>{vehicle.seatingCapacity}</span>
          </div>
          <div className="spec-item">
            <FiDroplet />
            <span>{vehicle.fuelType}</span>
          </div>
          <div className="spec-item">
            <FiSettings />
            <span>{vehicle.transmission}</span>
          </div>
        </div>
        
        <div className="vehicle-card-footer">
          <div className="vehicle-card-price">
            <span className="price-amount">₹{vehicle.pricePerDay.toLocaleString()}</span>
            <span className="price-period">/day</span>
          </div>
          <button className="btn btn-primary btn-sm">Book Now</button>
        </div>
      </div>
    </Link>
  );
}

export default VehicleCard;
