import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Grid, Card, CardBody } from '../components/UI';

const HomePage = () => {
  const services = [
    {
      id: 1,
      name: 'Plumbing',
      description: 'Professional plumbing services for repairs and installations',
      icon: '🔧',
      price: 'Starting at ₹299',
      rating: 4.8,
      providers: 150
    },
    {
      id: 2,
      name: 'Electrical',
      description: 'Licensed electricians for all your electrical needs',
      icon: '⚡',
      price: 'Starting at ₹399',
      rating: 4.9,
      providers: 120
    },
    {
      id: 3,
      name: 'House Cleaning',
      description: 'Professional cleaning services for your home',
      icon: '🧹',
      price: 'Starting at ₹199',
      rating: 4.7,
      providers: 200
    },
    {
      id: 4,
      name: 'Appliance Repair',
      description: 'Expert repair for all home appliances',
      icon: '🔨',
      price: 'Starting at ₹249',
      rating: 4.6,
      providers: 80
    },
    {
      id: 5,
      name: 'Painting',
      description: 'Professional painting and wall decoration',
      icon: '🎨',
      price: 'Starting at ₹599',
      rating: 4.8,
      providers: 95
    },
    {
      id: 6,
      name: 'Carpentry',
      description: 'Custom furniture and woodwork solutions',
      icon: '🪚',
      price: 'Starting at ₹449',
      rating: 4.7,
      providers: 75
    }
  ];

  const features = [
    {
      icon: '✅',
      title: 'Verified Professionals',
      description: 'All service providers are background-checked and verified'
    },
    {
      icon: '🕒',
      title: 'Same Day Service',
      description: 'Get your service done on the same day you book'
    },
    {
      icon: '💯',
      title: '100% Satisfaction',
      description: 'Money-back guarantee if you\'re not completely satisfied'
    },
    {
      icon: '🔒',
      title: 'Secure Payments',
      description: 'Safe and secure payment processing with multiple options'
    }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <Container>
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge">
                <span className="badge-text">🏆 India's #1 Home Services Platform</span>
              </div>
              <h1 className="hero-title">
                Book trusted help for
                <br />
                <span className="text-gradient">home tasks</span>
              </h1>
              <p className="hero-description">
                Get household chores done by skilled & trusted professionals. 
                From cleaning to repairs, we connect you with vetted experts 
                who deliver quality work at transparent, upfront prices.
              </p>
              <div className="hero-features">
                <div className="feature-item">
                  <span className="feature-icon">✅</span>
                  <span>Background verified professionals</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">💰</span>
                  <span>Transparent pricing</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">⚡</span>
                  <span>Same day service available</span>
                </div>
              </div>
              <div className="hero-buttons">
                <Link to="/services">
                  <Button size="lg" className="hero-btn-primary">
                    Book a Service
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="lg" className="hero-btn-secondary">
                    Become a Pro
                  </Button>
                </Link>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">1M+</span>
                  <span className="stat-label">Tasks completed</span>
                </div>
                <div className="stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Expert Providers</span>
                </div>
                <div className="stat">
                  <span className="stat-number">4.8★</span>
                  <span className="stat-label">Average Rating</span>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <div className="booking-widget">
                <div className="widget-header">
                  <h3>Book a Service</h3>
                  <p>Get instant quotes from professionals</p>
                </div>
                <div className="service-quick-select">
                  <div className="quick-service-item">
                    <div className="service-icon-small">🧹</div>
                    <span>Cleaning</span>
                    <span className="price">from ₹199</span>
                  </div>
                  <div className="quick-service-item">
                    <div className="service-icon-small">🔧</div>
                    <span>Plumbing</span>
                    <span className="price">from ₹299</span>
                  </div>
                  <div className="quick-service-item">
                    <div className="service-icon-small">⚡</div>
                    <span>Electrical</span>
                    <span className="price">from ₹399</span>
                  </div>
                </div>
                <Link to="/services" className="widget-cta">
                  <Button variant="primary" size="md" fullWidth>
                    View All Services →
                  </Button>
                </Link>
                <div className="trust-badges">
                  <div className="trust-item">
                    <span className="trust-icon">🛡️</span>
                    <span>Insured</span>
                  </div>
                  <div className="trust-item">
                    <span className="trust-icon">✅</span>
                    <span>Verified</span>
                  </div>
                  <div className="trust-item">
                    <span className="trust-icon">⭐</span>
                    <span>4.8 Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <Container>
          <div className="section-header">
            <h2>Popular Services</h2>
            <p>Choose from our wide range of professional home services</p>
          </div>
          <Grid cols={3} className="services-grid">
            {services.map((service) => (
              <Card key={service.id} className="service-card">
                <CardBody>
                  <div className="service-icon">{service.icon}</div>
                  <h3 className="service-name">{service.name}</h3>
                  <p className="service-description">{service.description}</p>
                  <div className="service-meta">
                    <span className="service-price">{service.price}</span>
                    <div className="service-rating">
                      <span className="rating-stars">⭐</span>
                      <span className="rating-value">{service.rating}</span>
                      <span className="rating-count">({service.providers} providers)</span>
                    </div>
                  </div>
                  <Link to={`/booking?service=${service.id}`}>
                    <Button className="service-btn">
                      Book Now
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            ))}
          </Grid>
          <div className="services-footer">
            <Link to="/services">
              <Button variant="outline" size="lg">
                View All Services
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Trending Services Section */}
      <section className="trending-services">
        <Container>
          <div className="section-header">
            <h2>Trending This Week</h2>
            <p>Most popular services booked by customers like you</p>
          </div>
          <div className="trending-grid">
            <div className="trending-item featured">
              <div className="trending-content">
                <div className="trending-badge">🔥 Hot</div>
                <h3>Deep House Cleaning</h3>
                <p>Complete home sanitization and deep cleaning</p>
                <div className="trending-price">Starting at ₹499</div>
                <div className="trending-stats">
                  <span>⭐ 4.9</span>
                  <span>📅 3.2k bookings this week</span>
                </div>
                <Link to="/booking?service=deep-cleaning">
                  <Button variant="primary" size="sm">Book Now</Button>
                </Link>
              </div>
            </div>
            <div className="trending-item">
              <div className="trending-content">
                <div className="trending-badge">⚡ Quick</div>
                <h3>AC Repair & Service</h3>
                <p>Same-day AC repair and maintenance</p>
                <div className="trending-price">Starting at ₹349</div>
                <Link to="/booking?service=ac-repair">
                  <Button variant="outline" size="sm">Book Now</Button>
                </Link>
              </div>
            </div>
            <div className="trending-item">
              <div className="trending-content">
                <div className="trending-badge">💎 Premium</div>
                <h3>Home Painting</h3>
                <p>Professional painting with premium paints</p>
                <div className="trending-price">Starting at ₹89/sq ft</div>
                <Link to="/booking?service=painting">
                  <Button variant="outline" size="sm">Book Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <Container>
          <div className="section-header">
            <h2>What Our Customers Say</h2>
            <p>Real reviews from real customers</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Amazing service! The plumber arrived on time and fixed my kitchen sink perfectly. 
                Very professional and reasonably priced."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">A</div>
                <div className="author-info">
                  <div className="author-name">Arjun Mehta</div>
                  <div className="author-service">Plumbing Service</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Exceptional house cleaning service. The team was thorough, professional, 
                and left my home spotless. Highly recommend!"
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">P</div>
                <div className="author-info">
                  <div className="author-name">Priya Sharma</div>
                  <div className="author-service">House Cleaning</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Quick and efficient electrical work. Fixed my wiring issues in no time. 
                Great communication throughout the process."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">R</div>
                <div className="author-info">
                  <div className="author-name">Rajesh Kumar</div>
                  <div className="author-service">Electrical Service</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <Container>
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Get your home tasks done in 3 simple steps</p>
          </div>
          <div className="steps-container">
            <div className="step-item">
              <div className="step-number">1</div>
              <div className="step-content">
                <div className="step-icon">📱</div>
                <h3>Choose a Service</h3>
                <p>Browse our services and select the one you need. View transparent pricing and provider ratings.</p>
              </div>
            </div>
            <div className="step-connector">→</div>
            <div className="step-item">
              <div className="step-number">2</div>
              <div className="step-content">
                <div className="step-icon">⏰</div>
                <h3>Book & Schedule</h3>
                <p>Pick your preferred date and time. Our vetted professionals are available as early as today.</p>
              </div>
            </div>
            <div className="step-connector">→</div>
            <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <div className="step-icon">✨</div>
                <h3>Get It Done</h3>
                <p>Relax while our expert handles the job. Pay securely through the app and leave a review.</p>
              </div>
            </div>
          </div>
          <div className="cta-section">
            <Link to="/services">
              <Button size="lg" variant="primary">
                Get Started Now
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <Container>
          <div className="section-header">
            <h2>Why Choose EasyHome?</h2>
            <p>We make home services simple, reliable, and affordable</p>
          </div>
          <Grid cols={2} className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-content">
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </Grid>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <Container>
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-description">
              Join thousands of satisfied customers who trust EasyHome for their service needs
            </p>
            <div className="cta-buttons">
              <Link to="/booking">
                <Button size="lg" className="cta-btn-primary">
                  Book a Service
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg" className="cta-btn-secondary">
                  Become a Provider
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
