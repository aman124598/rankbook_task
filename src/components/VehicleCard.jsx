import { Link } from 'react-router-dom';
import { FiHeart, FiStar, FiUsers, FiDroplet, FiSettings, FiArrowRight } from 'react-icons/fi';
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

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'sedan': return 'Sedan';
      case 'suv': return 'SUV';
      case 'bike': return 'Bike';
      default: return category;
    }
  };

  return (
    <Link to={`/vehicles/${vehicle.id}`} className="vehicle-card">
      {/* Image Section */}
      <div className="vehicle-card-image">
        <img 
          src={vehicle.images[0]} 
          alt={vehicle.name}
          loading="lazy"
        />
        
        {/* Category Badge */}
        <span className="vehicle-category-badge">
          {getCategoryLabel(vehicle.category)}
        </span>
        
        {/* Favorite Button */}
        {showFavorite && currentUser && (
          <button 
            className={`vehicle-card-favorite ${isFavorite ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <FiHeart />
          </button>
        )}
      </div>
      
      {/* Content Section */}
      <div className="vehicle-card-content">
        {/* Header */}
        <div className="vehicle-card-header">
          <span className="vehicle-card-brand">{vehicle.brand}</span>
          <div className="vehicle-card-rating">
            <FiStar className="star-icon" />
            <span className="rating-value">{vehicle.rating}</span>
          </div>
        </div>
        
        <h3 className="vehicle-card-title">{vehicle.name}</h3>
        
        {/* Features */}
        <div className="vehicle-card-features">
          <div className="vehicle-feature">
            <FiUsers />
            <span>{vehicle.seatingCapacity}</span>
          </div>
          <div className="vehicle-feature">
            <FiDroplet />
            <span>{vehicle.fuelType}</span>
          </div>
          <div className="vehicle-feature">
            <FiSettings />
            <span>{vehicle.transmission}</span>
          </div>
        </div>
        
        {/* Footer */}
        <div className="vehicle-card-footer">
          <div className="vehicle-card-price">
            <span className="price-amount">₹{vehicle.pricePerDay.toLocaleString()}</span>
            <span className="price-period">/day</span>
          </div>
          <span className="vehicle-card-cta">
            Book Now <FiArrowRight />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default VehicleCard;
