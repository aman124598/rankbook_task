import { Link } from 'react-router-dom';
import { FiArrowRight, FiShield, FiClock, FiMapPin, FiStar } from 'react-icons/fi';
import { RiCarLine, RiEBike2Line } from 'react-icons/ri';
import { BsSpeedometer2 } from 'react-icons/bs';
import VehicleCard from '../components/VehicleCard';
import { vehicles } from '../data/vehicles';
import './HomePage.css';

function HomePage() {
  const featuredVehicles = vehicles.slice(0, 4);
  
  const stats = [
    { value: '500+', label: 'Vehicles Available' },
    { value: '10K+', label: 'Happy Customers' },
    { value: '50+', label: 'Locations' },
    { value: '4.9', label: 'Average Rating' }
  ];

  const features = [
    {
      icon: <FiShield />,
      title: 'Fully Insured',
      description: 'All vehicles come with comprehensive insurance coverage for your peace of mind.'
    },
    {
      icon: <FiClock />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you whenever you need help.'
    },
    {
      icon: <FiMapPin />,
      title: 'Multiple Locations',
      description: 'Pick up and drop off at any of our convenient locations across India.'
    },
    {
      icon: <BsSpeedometer2 />,
      title: 'Well Maintained',
      description: 'Regular servicing and thorough cleaning ensure top-notch vehicle condition.'
    }
  ];

  const categories = [
    { 
      id: 'sedan', 
      name: 'Sedans', 
      icon: <RiCarLine />,
      description: 'Comfort & Elegance',
      count: vehicles.filter(v => v.category === 'sedan').length
    },
    { 
      id: 'suv', 
      name: 'SUVs', 
      icon: <RiCarLine />,
      description: 'Power & Adventure',
      count: vehicles.filter(v => v.category === 'suv').length
    },
    { 
      id: 'bike', 
      name: 'Bikes', 
      icon: <RiEBike2Line />,
      description: 'Freedom & Thrill',
      count: vehicles.filter(v => v.category === 'bike').length
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-particles"></div>
        </div>
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <FiStar /> Premium Vehicle Rentals
            </div>
            <h1 className="hero-title">
              Drive Your <span className="text-gradient">Dreams</span> Today
            </h1>
            <p className="hero-subtitle">
              Experience the freedom of the open road with our premium fleet of vehicles. 
              From luxury sedans to powerful SUVs and thrilling bikes.
            </p>
            <div className="hero-actions">
              <Link to="/vehicles" className="btn btn-primary btn-lg">
                Browse Vehicles <FiArrowRight />
              </Link>
              <Link to="/about" className="btn btn-outline btn-lg">
                Learn More
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800" 
                alt="Luxury Car"
              />
              <div className="hero-image-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <span className="stat-value text-gradient">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Browse by <span className="text-gradient">Category</span></h2>
            <p className="section-subtitle">Choose from our wide selection of vehicle types</p>
          </div>
          <div className="categories-grid">
            {categories.map(category => (
              <Link 
                key={category.id} 
                to={`/vehicles?category=${category.id}`}
                className="category-card"
              >
                <div className="category-icon">{category.icon}</div>
                <h3 className="category-name">{category.name}</h3>
                <p className="category-description">{category.description}</p>
                <span className="category-count">{category.count} vehicles</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Featured <span className="text-gradient">Vehicles</span></h2>
              <p className="section-subtitle">Hand-picked selection of our finest rides</p>
            </div>
            <Link to="/vehicles" className="btn btn-secondary">
              View All <FiArrowRight />
            </Link>
          </div>
          <div className="vehicles-grid">
            {featuredVehicles.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Why Choose <span className="text-gradient">RankRides</span></h2>
            <p className="section-subtitle">We make vehicle rental easy, safe, and affordable</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Hit the Road?</h2>
              <p className="cta-text">
                Sign up today and get 10% off on your first booking. Use code: FIRST10
              </p>
            </div>
            <Link to="/signup" className="btn btn-primary btn-lg">
              Get Started <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
