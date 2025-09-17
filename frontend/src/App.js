import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Import Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ServicesPage from './pages/ServicesPage';
import BookingPage from './pages/BookingPage';

// Import Styles
import './styles/globals.css';
import './styles/Header.css';
import './styles/Footer.css';
import './styles/HomePage.css';
import './styles/Auth.css';
import './styles/Services.css';
import './styles/Booking.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/booking" element={<BookingPage />} />
            
            {/* Additional Routes (to be implemented later) */}
            <Route path="/about" element={<ComingSoonPage title="About Us" />} />
            <Route path="/contact" element={<ComingSoonPage title="Contact Us" />} />
            <Route path="/help" element={<ComingSoonPage title="Help Center" />} />
            <Route path="/careers" element={<ComingSoonPage title="Careers" />} />
            <Route path="/blog" element={<ComingSoonPage title="Blog" />} />
            <Route path="/press" element={<ComingSoonPage title="Press" />} />
            <Route path="/safety" element={<ComingSoonPage title="Safety" />} />
            <Route path="/community" element={<ComingSoonPage title="Community" />} />
            <Route path="/provider" element={<ComingSoonPage title="Become a Provider" />} />
            <Route path="/privacy" element={<ComingSoonPage title="Privacy Policy" />} />
            <Route path="/terms" element={<ComingSoonPage title="Terms of Service" />} />
            <Route path="/cookies" element={<ComingSoonPage title="Cookie Policy" />} />
            <Route path="/accessibility" element={<ComingSoonPage title="Accessibility" />} />
            <Route path="/sitemap" element={<ComingSoonPage title="Sitemap" />} />
            
            {/* Service Category Routes */}
            <Route path="/services/plumbing" element={<ServiceCategoryPage category="plumbing" />} />
            <Route path="/services/electrical" element={<ServiceCategoryPage category="electrical" />} />
            <Route path="/services/cleaning" element={<ServiceCategoryPage category="cleaning" />} />
            <Route path="/services/appliance" element={<ServiceCategoryPage category="appliance" />} />
            <Route path="/services/painting" element={<ServiceCategoryPage category="painting" />} />
            <Route path="/services/carpentry" element={<ServiceCategoryPage category="carpentry" />} />
            
            {/* Fallback Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

// Placeholder components for routes not yet implemented
const ComingSoonPage = ({ title }) => (
  <div className="coming-soon-page">
    <div className="container">
      <div className="coming-soon-content">
        <div className="coming-soon-icon">🚧</div>
        <h1>{title}</h1>
        <p>This page is coming soon! We're working hard to bring you this feature.</p>
        <p>In the meantime, feel free to explore our other services.</p>
        <div className="coming-soon-actions">
          <a href="/" className="btn btn-primary">
            Back to Home
          </a>
          <a href="/services" className="btn btn-outline">
            Browse Services
          </a>
        </div>
      </div>
    </div>
  </div>
);

const ServiceCategoryPage = ({ category }) => {
  const categoryNames = {
    plumbing: 'Plumbing Services',
    electrical: 'Electrical Services',
    cleaning: 'House Cleaning Services',
    appliance: 'Appliance Repair Services',
    painting: 'Painting Services',
    carpentry: 'Carpentry Services'
  };

  return (
    <div className="service-category-page">
      <div className="container">
        <div className="category-header">
          <h1>{categoryNames[category]}</h1>
          <p>Find trusted professionals for {categoryNames[category].toLowerCase()}</p>
        </div>
        <div className="category-redirect">
          <p>You'll be redirected to our services page with this category pre-selected.</p>
          <div className="redirect-actions">
            <a href={`/services?category=${category}`} className="btn btn-primary">
              View {categoryNames[category]}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotFoundPage = () => (
  <div className="not-found-page">
    <div className="container">
      <div className="not-found-content">
        <div className="not-found-icon">🔍</div>
        <h1>Page Not Found</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <p>It might have been moved, deleted, or you entered the wrong URL.</p>
        <div className="not-found-actions">
          <a href="/" className="btn btn-primary">
            Go Home
          </a>
          <a href="/services" className="btn btn-outline">
            Browse Services
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default App;
