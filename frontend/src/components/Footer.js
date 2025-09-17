import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './UI';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-main">
        <Container>
          <div className="footer-content">
            {/* Company Info */}
            <div className="footer-section">
              <div className="footer-logo">
                <div className="logo">
                  <span className="logo-icon">🏠</span>
                  <span className="logo-text">EasyHome</span>
                </div>
              </div>
              <p className="footer-description">
                Your trusted partner for all home services. We connect you with verified professionals 
                for plumbing, electrical work, cleaning, and more.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook">
                  <span>📘</span>
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <span>🐦</span>
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <span>📷</span>
                </a>
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <span>💼</span>
                </a>
              </div>
            </div>

            {/* Services */}
            <div className="footer-section">
              <h4 className="footer-title">Services</h4>
              <div className="footer-links">
                <Link to="/services/plumbing" className="footer-link">Plumbing</Link>
                <Link to="/services/electrical" className="footer-link">Electrical</Link>
                <Link to="/services/cleaning" className="footer-link">House Cleaning</Link>
                <Link to="/services/appliance" className="footer-link">Appliance Repair</Link>
                <Link to="/services/painting" className="footer-link">Painting</Link>
                <Link to="/services/carpentry" className="footer-link">Carpentry</Link>
              </div>
            </div>

            {/* Company */}
            <div className="footer-section">
              <h4 className="footer-title">Company</h4>
              <div className="footer-links">
                <Link to="/about" className="footer-link">About Us</Link>
                <Link to="/careers" className="footer-link">Careers</Link>
                <Link to="/blog" className="footer-link">Blog</Link>
                <Link to="/press" className="footer-link">Press</Link>
                <Link to="/contact" className="footer-link">Contact</Link>
              </div>
            </div>

            {/* Support */}
            <div className="footer-section">
              <h4 className="footer-title">Support</h4>
              <div className="footer-links">
                <Link to="/help" className="footer-link">Help Center</Link>
                <Link to="/safety" className="footer-link">Safety</Link>
                <Link to="/community" className="footer-link">Community</Link>
                <Link to="/provider" className="footer-link">Become a Provider</Link>
              </div>
            </div>

            {/* Legal */}
            <div className="footer-section">
              <h4 className="footer-title">Legal</h4>
              <div className="footer-links">
                <Link to="/privacy" className="footer-link">Privacy Policy</Link>
                <Link to="/terms" className="footer-link">Terms of Service</Link>
                <Link to="/cookies" className="footer-link">Cookie Policy</Link>
                <Link to="/accessibility" className="footer-link">Accessibility</Link>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <Container>
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} EasyHome Services. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link to="/sitemap" className="footer-bottom-link">Sitemap</Link>
              <Link to="/accessibility" className="footer-bottom-link">Accessibility</Link>
              <Link to="/privacy" className="footer-bottom-link">Privacy</Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
