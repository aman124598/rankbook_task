import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import VehicleCard from '../components/VehicleCard';
import { useAuth } from '../contexts/AuthContext';
import { vehicles } from '../data/vehicles';
import './FavoritesPage.css';

function FavoritesPage() {
  const { userProfile } = useAuth();
  
  const favoriteVehicles = vehicles.filter(v => 
    userProfile?.favorites?.includes(v.id)
  );

  return (
    <div className="page favorites-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">
            My <span className="text-gradient">Favorites</span>
            <FiHeart className="heart-icon" />
          </h1>
          <p className="page-subtitle">Vehicles you've saved for later</p>
        </div>

        {favoriteVehicles.length > 0 ? (
          <div className="favorites-grid">
            {favoriteVehicles.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">❤️</div>
            <h3 className="empty-state-title">No favorites yet</h3>
            <p className="empty-state-text">
              Save vehicles you like by clicking the heart icon. They'll appear here for easy access.
            </p>
            <Link to="/vehicles" className="btn btn-primary">
              Browse Vehicles
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;
