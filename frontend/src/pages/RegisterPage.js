import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Container, Card, CardHeader, CardBody } from '../components/UI';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    role: 'user',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // Provider specific fields
    companyName: '',
    experience: '',
    specialization: '',
    // Terms
    agreeToTerms: false,
    agreeToMarketing: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Provider specific validations
    if (formData.role === 'provider') {
      if (!formData.companyName) newErrors.companyName = 'Company name is required';
      if (!formData.experience) newErrors.experience = 'Experience is required';
      if (!formData.specialization) newErrors.specialization = 'Specialization is required';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // TODO: Implement API call to backend
      console.log('Registration attempt:', formData);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      // Redirect to verification page
      // navigate('/verify-email');
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Container size="sm">
        <div className="auth-container">
          <Card className="auth-card">
            <CardHeader>
              <div className="auth-header">
                <div className="auth-logo">
                  <span className="logo-icon">🏠</span>
                  <span className="logo-text">EasyHome</span>
                </div>
                <h2 className="auth-title">Create Account</h2>
                <p className="auth-subtitle">Join our community today</p>
              </div>
            </CardHeader>
            
            <CardBody>
              <form onSubmit={handleSubmit} className="auth-form">
                {/* Role Selection */}
                <div className="role-selector">
                  <div className="role-tabs">
                    <button
                      type="button"
                      className={`role-tab ${formData.role === 'user' ? 'active' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, role: 'user' }))}
                    >
                      <span className="role-icon">👤</span>
                      Customer
                    </button>
                    <button
                      type="button"
                      className={`role-tab ${formData.role === 'provider' ? 'active' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, role: 'provider' }))}
                    >
                      <span className="role-icon">🔧</span>
                      Provider
                    </button>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="form-section">
                  <h4 className="section-title">Personal Information</h4>
                  
                  <div className="form-row">
                    <Input
                      label="First Name"
                      name="firstName"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={handleChange}
                      error={errors.firstName}
                      required
                    />
                    <Input
                      label="Last Name"
                      name="lastName"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      error={errors.lastName}
                      required
                    />
                  </div>

                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                  />

                  <Input
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    required
                  />
                </div>

                {/* Provider Specific Fields */}
                {formData.role === 'provider' && (
                  <div className="form-section">
                    <h4 className="section-title">Business Information</h4>
                    
                    <Input
                      label="Company Name"
                      name="companyName"
                      placeholder="Enter your company name"
                      value={formData.companyName}
                      onChange={handleChange}
                      error={errors.companyName}
                      required
                    />

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Years of Experience *</label>
                        <select
                          name="experience"
                          className={`form-input ${errors.experience ? 'error' : ''}`}
                          value={formData.experience}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select experience</option>
                          <option value="1-2">1-2 years</option>
                          <option value="3-5">3-5 years</option>
                          <option value="6-10">6-10 years</option>
                          <option value="10+">10+ years</option>
                        </select>
                        {errors.experience && <div className="form-error">{errors.experience}</div>}
                      </div>

                      <div className="form-group">
                        <label className="form-label">Specialization *</label>
                        <select
                          name="specialization"
                          className={`form-input ${errors.specialization ? 'error' : ''}`}
                          value={formData.specialization}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select specialization</option>
                          <option value="plumbing">Plumbing</option>
                          <option value="electrical">Electrical</option>
                          <option value="cleaning">House Cleaning</option>
                          <option value="appliance">Appliance Repair</option>
                          <option value="painting">Painting</option>
                          <option value="carpentry">Carpentry</option>
                        </select>
                        {errors.specialization && <div className="form-error">{errors.specialization}</div>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Security */}
                <div className="form-section">
                  <h4 className="section-title">Security</h4>
                  
                  <Input
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    required
                  />

                  <Input
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    required
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="form-section">
                  <div className="checkbox-group">
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                      />
                      <span className="checkmark"></span>
                      I agree to the{' '}
                      <Link to="/terms" className="auth-link">Terms of Service</Link>
                      {' '}and{' '}
                      <Link to="/privacy" className="auth-link">Privacy Policy</Link>
                    </label>
                    {errors.agreeToTerms && <div className="form-error">{errors.agreeToTerms}</div>}
                  </div>

                  <div className="checkbox-group">
                    <label className="checkbox">
                      <input
                        type="checkbox"
                        name="agreeToMarketing"
                        checked={formData.agreeToMarketing}
                        onChange={handleChange}
                      />
                      <span className="checkmark"></span>
                      I'd like to receive marketing updates and special offers
                    </label>
                  </div>
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="form-error">{errors.submit}</div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="auth-submit-btn"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>

                {/* Sign In Link */}
                <div className="auth-footer">
                  <p>
                    Already have an account?{' '}
                    <Link to="/login" className="auth-link">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default RegisterPage;
