import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Container, Card, CardHeader, CardBody } from '../components/UI';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // TODO: Implement API call to backend
      console.log('Password reset request for:', email);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setIsEmailSent(true);
    } catch (error) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
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
                  <div className="success-icon">✅</div>
                  <h2 className="auth-title">Check Your Email</h2>
                  <p className="auth-subtitle">
                    We've sent a password reset link to<br />
                    <strong>{email}</strong>
                  </p>
                </div>
              </CardHeader>
              
              <CardBody>
                <div className="success-content">
                  <p className="success-message">
                    Click the link in the email to reset your password. 
                    If you don't see the email, check your spam folder.
                  </p>
                  
                  <div className="success-actions">
                    <Link to="/login">
                      <Button className="auth-submit-btn">
                        Back to Sign In
                      </Button>
                    </Link>
                    
                    <button
                      type="button"
                      className="resend-btn"
                      onClick={() => setIsEmailSent(false)}
                    >
                      Didn't receive the email? Try again
                    </button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </Container>
      </div>
    );
  }

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
                <h2 className="auth-title">Forgot Password?</h2>
                <p className="auth-subtitle">
                  No worries! Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>
            </CardHeader>
            
            <CardBody>
              <form onSubmit={handleSubmit} className="auth-form">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  error={error}
                  required
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="auth-submit-btn"
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>

                <div className="auth-footer">
                  <Link to="/login" className="back-link">
                    ← Back to Sign In
                  </Link>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default ForgotPasswordPage;
