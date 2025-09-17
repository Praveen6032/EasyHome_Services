import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button, Container, Grid, Card, CardBody, Input } from '../components/UI';

const ServicesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    priceRange: searchParams.get('priceRange') || '',
    rating: searchParams.get('rating') || '',
    location: searchParams.get('location') || ''
  });
  const [sortBy, setSortBy] = useState('popular');
  
  const services = [
    {
      id: 1,
      name: 'Emergency Plumbing',
      category: 'plumbing',
      description: 'Quick fixes for leaks, clogs, and pipe repairs',
      price: { min: 299, max: 1200 },
      rating: 4.8,
      reviews: 156,
      provider: 'ProFix Services',
      image: '🔧',
      features: ['24/7 Available', 'Licensed', 'Insured'],
      responseTime: '30 mins',
      completionTime: '1-2 hours'
    },
    {
      id: 2,
      name: 'Residential Electrical',
      category: 'electrical',
      description: 'Wiring, outlets, switches, and electrical installations',
      price: { min: 399, max: 2500 },
      rating: 4.9,
      reviews: 203,
      provider: 'ElectriCare',
      image: '⚡',
      features: ['Certified', 'Warranty', 'Safety Check'],
      responseTime: '45 mins',
      completionTime: '2-4 hours'
    },
    {
      id: 3,
      name: 'Deep House Cleaning',
      category: 'cleaning',
      description: 'Comprehensive cleaning for your entire home',
      price: { min: 199, max: 800 },
      rating: 4.7,
      reviews: 342,
      provider: 'SparkleClean',
      image: '🧹',
      features: ['Eco-friendly', 'Supplies Included', 'Satisfaction Guaranteed'],
      responseTime: '2 hours',
      completionTime: '3-6 hours'
    },
    {
      id: 4,
      name: 'Appliance Repair',
      category: 'appliance',
      description: 'Fix washing machines, refrigerators, and more',
      price: { min: 249, max: 1500 },
      rating: 4.6,
      reviews: 128,
      provider: 'AppliancePro',
      image: '🔨',
      features: ['Same Day', 'Parts Warranty', 'All Brands'],
      responseTime: '1 hour',
      completionTime: '1-3 hours'
    },
    {
      id: 5,
      name: 'Interior Painting',
      category: 'painting',
      description: 'Professional painting for rooms and walls',
      price: { min: 599, max: 3000 },
      rating: 4.8,
      reviews: 89,
      provider: 'ColorCraft',
      image: '🎨',
      features: ['Quality Paint', 'Clean-up Included', 'Color Consultation'],
      responseTime: '24 hours',
      completionTime: '1-3 days'
    },
    {
      id: 6,
      name: 'Custom Carpentry',
      category: 'carpentry',
      description: 'Furniture repair, custom builds, and woodwork',
      price: { min: 449, max: 2200 },
      rating: 4.7,
      reviews: 67,
      provider: 'WoodWorks',
      image: '🪚',
      features: ['Custom Design', 'Quality Wood', 'Finishing'],
      responseTime: '2 hours',
      completionTime: '2-5 days'
    },
    {
      id: 7,
      name: 'AC Maintenance',
      category: 'appliance',
      description: 'Air conditioning cleaning, repair, and maintenance',
      price: { min: 349, max: 1800 },
      rating: 4.5,
      reviews: 94,
      provider: 'CoolAir Services',
      image: '❄️',
      features: ['Annual Plans', 'Energy Efficient', 'Emergency Service'],
      responseTime: '1 hour',
      completionTime: '2-4 hours'
    },
    {
      id: 8,
      name: 'Bathroom Renovation',
      category: 'plumbing',
      description: 'Complete bathroom remodeling and upgrades',
      price: { min: 2500, max: 15000 },
      rating: 4.9,
      reviews: 45,
      provider: 'Reno Masters',
      image: '🚿',
      features: ['Design Consultation', 'Premium Materials', '2 Year Warranty'],
      responseTime: '24 hours',
      completionTime: '5-10 days'
    }
  ];

  const categories = [
    { id: '', name: 'All Services', icon: '🏠', count: services.length },
    { id: 'plumbing', name: 'Plumbing', icon: '🔧', count: services.filter(s => s.category === 'plumbing').length },
    { id: 'electrical', name: 'Electrical', icon: '⚡', count: services.filter(s => s.category === 'electrical').length },
    { id: 'cleaning', name: 'Cleaning', icon: '🧹', count: services.filter(s => s.category === 'cleaning').length },
    { id: 'appliance', name: 'Appliance', icon: '🔨', count: services.filter(s => s.category === 'appliance').length },
    { id: 'painting', name: 'Painting', icon: '🎨', count: services.filter(s => s.category === 'painting').length },
    { id: 'carpentry', name: 'Carpentry', icon: '🪚', count: services.filter(s => s.category === 'carpentry').length }
  ];

  // Filter services based on current filters
  const filteredServices = services.filter(service => {
    const matchesSearch = !filters.search || 
      service.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      service.description.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesCategory = !filters.category || service.category === filters.category;
    
    const matchesPrice = !filters.priceRange || 
      (filters.priceRange === 'low' && service.price.min < 500) ||
      (filters.priceRange === 'medium' && service.price.min >= 500 && service.price.min < 1000) ||
      (filters.priceRange === 'high' && service.price.min >= 1000);
    
    const matchesRating = !filters.rating || service.rating >= parseFloat(filters.rating);

    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  // Sort services
  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price.min - b.price.min;
      case 'price-high':
        return b.price.min - a.price.min;
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviews - a.reviews;
      default: // popular
        return b.reviews - a.reviews;
    }
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach(k => {
      if (newFilters[k]) params.set(k, newFilters[k]);
    });
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      priceRange: '',
      rating: '',
      location: ''
    });
    setSearchParams({});
  };

  return (
    <div className="services-page">
      <Container>
        {/* Page Header */}
        <div className="services-header">
          <h1>Our Services</h1>
          <p>Find trusted professionals for all your home service needs</p>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <div className="search-bar">
            <Input
              placeholder="Search services..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="search-input"
            />
            <Button className="search-btn">
              🔍 Search
            </Button>
          </div>
        </div>

        <div className="services-layout">
          {/* Sidebar Filters */}
          <aside className="services-sidebar">
            <div className="filter-section">
              <div className="filter-header">
                <h3>Categories</h3>
                <button className="clear-filters" onClick={clearFilters}>
                  Clear All
                </button>
              </div>
              
              <div className="category-filters">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`category-item ${filters.category === category.id ? 'active' : ''}`}
                    onClick={() => handleFilterChange('category', category.id)}
                  >
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-name">{category.name}</span>
                    <span className="category-count">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4>Price Range</h4>
              <div className="price-filters">
                {[
                  { id: '', name: 'Any Price' },
                  { id: 'low', name: 'Under ₹500' },
                  { id: 'medium', name: '₹500 - ₹1000' },
                  { id: 'high', name: 'Above ₹1000' }
                ].map(price => (
                  <label key={price.id} className="filter-option">
                    <input
                      type="radio"
                      name="priceRange"
                      value={price.id}
                      checked={filters.priceRange === price.id}
                      onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    />
                    <span>{price.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4>Minimum Rating</h4>
              <div className="rating-filters">
                {[
                  { id: '', name: 'Any Rating' },
                  { id: '4.5', name: '4.5+ Stars' },
                  { id: '4.0', name: '4.0+ Stars' },
                  { id: '3.5', name: '3.5+ Stars' }
                ].map(rating => (
                  <label key={rating.id} className="filter-option">
                    <input
                      type="radio"
                      name="rating"
                      value={rating.id}
                      checked={filters.rating === rating.id}
                      onChange={(e) => handleFilterChange('rating', e.target.value)}
                    />
                    <span>{rating.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="services-main">
            {/* Results Header */}
            <div className="results-header">
              <div className="results-info">
                <h2>{sortedServices.length} Services Available</h2>
                {filters.category && (
                  <p>in {categories.find(c => c.id === filters.category)?.name}</p>
                )}
              </div>
              
              <div className="sort-controls">
                <label htmlFor="sortBy">Sort by:</label>
                <select
                  id="sortBy"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="reviews">Most Reviews</option>
                </select>
              </div>
            </div>

            {/* Services Grid */}
            <Grid cols={2} className="services-grid">
              {sortedServices.map(service => (
                <Card key={service.id} className="service-card">
                  <CardBody>
                    <div className="service-header">
                      <div className="service-icon">{service.image}</div>
                      <div className="service-basic">
                        <h3 className="service-name">{service.name}</h3>
                        <p className="service-provider">by {service.provider}</p>
                      </div>
                      <div className="service-rating">
                        <span className="rating-stars">⭐</span>
                        <span className="rating-value">{service.rating}</span>
                        <span className="rating-reviews">({service.reviews})</span>
                      </div>
                    </div>

                    <p className="service-description">{service.description}</p>

                    <div className="service-features">
                      {service.features.map((feature, index) => (
                        <span key={index} className="feature-tag">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="service-details">
                      <div className="detail-item">
                        <span className="detail-label">Response:</span>
                        <span className="detail-value">{service.responseTime}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Duration:</span>
                        <span className="detail-value">{service.completionTime}</span>
                      </div>
                    </div>

                    <div className="service-footer">
                      <div className="service-pricing">
                        <span className="price-range">
                          ₹{service.price.min} - ₹{service.price.max}
                        </span>
                        <span className="price-label">Starting price</span>
                      </div>
                      <Link to={`/booking?service=${service.id}`}>
                        <Button className="book-btn">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </Grid>

            {/* No Results */}
            {sortedServices.length === 0 && (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h3>No services found</h3>
                <p>Try adjusting your filters or search terms</p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </Container>
    </div>
  );
};

export default ServicesPage;
