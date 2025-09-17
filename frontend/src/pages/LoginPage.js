import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Container, Card, CardHeader, CardBody } from '../components/UI';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      console.log('Login attempt:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Redirect based on role
      // navigate('/dashboard');
    } catch (error) {
      setErrors({ submit: 'Login failed. Please try again.' });
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
                <h2 className="auth-title">Welcome Back</h2>
                <p className="auth-subtitle">Sign in to your account</p>
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
                    <button
                      type="button"
                      className={`role-tab ${formData.role === 'admin' ? 'active' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, role: 'admin' }))}
                    >
                      <span className="role-icon">⚙️</span>
                      Admin
                    </button>
                  </div>
                </div>

                {/* Email */}
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

                {/* Password */}
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  required
                />

                {/* Remember Me & Forgot Password */}
                <div className="auth-options">
                  <label className="checkbox">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    Remember me
                  </label>
                  <Link to="/forgot-password" className="forgot-link">
                    Forgot password?
                  </Link>
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
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>

                {/* Social Login */}
                <div className="social-divider">
                  <span>or continue with</span>
                </div>

                <div className="social-buttons">
                  <button type="button" className="social-btn google-btn">
                    <span className="social-icon">📧</span>
                    Google
                  </button>
                  <button type="button" className="social-btn facebook-btn">
                    <span className="social-icon">📘</span>
                    Facebook
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="auth-footer">
                  <p>
                    Don't have an account?{' '}
                    <Link to="/register" className="auth-link">
                      Sign up here
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

export default LoginPage;
