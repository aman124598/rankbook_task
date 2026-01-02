import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import VehicleCard from '../components/VehicleCard';
import { filterVehicles } from '../data/vehicles';
import './VehiclesPage.css';

function VehiclesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    minPrice: '',
    maxPrice: '',
    seatingCapacity: '',
    fuelType: 'all',
    search: ''
  });

  useEffect(() => {
    const results = filterVehicles(filters);
    setFilteredVehicles(results);
  }, [filters]);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setFilters(prev => ({ ...prev, category }));
    }
  }, [searchParams]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    if (key === 'category') {
      setSearchParams(value === 'all' ? {} : { category: value });
    }
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      minPrice: '',
      maxPrice: '',
      seatingCapacity: '',
      fuelType: 'all',
      search: ''
    });
    setSearchParams({});
  };

  const hasActiveFilters = 
    filters.category !== 'all' || 
    filters.minPrice || 
    filters.maxPrice || 
    filters.seatingCapacity || 
    filters.fuelType !== 'all' ||
    filters.search;

  return (
    <div className="page vehicles-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Browse <span className="text-gradient">Vehicles</span></h1>
          <p className="page-subtitle">Find the perfect ride for your journey</p>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <div className="search-input-wrapper">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by brand, model, or name..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="search-input"
            />
          </div>
          <button 
            className="btn btn-secondary filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter />
            Filters
            {hasActiveFilters && <span className="filter-badge"></span>}
          </button>
        </div>

        {/* Filters Panel */}
        <div className={`filters-panel ${showFilters ? 'open' : ''}`}>
          <div className="filters-header">
            <h3>Filters</h3>
            {hasActiveFilters && (
              <button className="btn btn-ghost btn-sm" onClick={clearFilters}>
                <FiX /> Clear All
              </button>
            )}
          </div>
          
          <div className="filters-grid">
            <div className="filter-group">
              <label className="filter-label">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="form-input form-select"
              >
                <option value="all">All Categories</option>
                <option value="sedan">Sedans</option>
                <option value="suv">SUVs</option>
                <option value="bike">Bikes</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Min Price (₹/day)</label>
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className="form-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Max Price (₹/day)</label>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="form-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Seating Capacity</label>
              <select
                value={filters.seatingCapacity}
                onChange={(e) => handleFilterChange('seatingCapacity', e.target.value)}
                className="form-input form-select"
              >
                <option value="">Any</option>
                <option value="2">2+ Seats</option>
                <option value="4">4+ Seats</option>
                <option value="5">5+ Seats</option>
                <option value="7">7+ Seats</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Fuel Type</label>
              <select
                value={filters.fuelType}
                onChange={(e) => handleFilterChange('fuelType', e.target.value)}
                className="form-input form-select"
              >
                <option value="all">All Types</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="hybrid">Hybrid</option>
                <option value="electric">Electric</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {['all', 'sedan', 'suv', 'bike'].map(cat => (
            <button
              key={cat}
              className={`category-tab ${filters.category === cat ? 'active' : ''}`}
              onClick={() => handleFilterChange('category', cat)}
            >
              {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1) + 's'}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="results-info">
          <span>{filteredVehicles.length} vehicles found</span>
        </div>

        {filteredVehicles.length > 0 ? (
          <div className="vehicles-grid">
            {filteredVehicles.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🚗</div>
            <h3 className="empty-state-title">No vehicles found</h3>
            <p className="empty-state-text">Try adjusting your filters or search terms</p>
            <button className="btn btn-primary" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VehiclesPage;
