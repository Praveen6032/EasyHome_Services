import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button, Input, Container, Card, CardHeader, CardBody } from '../components/UI';

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const serviceId = searchParams.get('service');
  
  const services = [
    { id: '1', name: 'Emergency Plumbing', price: { min: 299, max: 1200 }, category: 'plumbing', icon: '🔧' },
    { id: '2', name: 'Residential Electrical', price: { min: 399, max: 2500 }, category: 'electrical', icon: '⚡' },
    { id: '3', name: 'Deep House Cleaning', price: { min: 199, max: 800 }, category: 'cleaning', icon: '🧹' },
    { id: '4', name: 'Appliance Repair', price: { min: 249, max: 1500 }, category: 'appliance', icon: '🔨' },
    { id: '5', name: 'Interior Painting', price: { min: 599, max: 3000 }, category: 'painting', icon: '🎨' },
    { id: '6', name: 'Custom Carpentry', price: { min: 449, max: 2200 }, category: 'carpentry', icon: '🪚' }
  ];

  const [selectedService, setSelectedService] = useState(
    services.find(s => s.id === serviceId) || services[0]
  );
  
  const [formData, setFormData] = useState({
    // Service Details
    serviceId: selectedService.id,
    serviceType: '',
    urgency: 'normal',
    description: '',
    
    // Schedule
    preferredDate: '',
    preferredTime: '',
    alternateDate: '',
    alternateTime: '',
    
    // Location
    address: '',
    apartment: '',
    city: '',
    pincode: '',
    landmark: '',
    
    // Contact
    fullName: '',
    phone: '',
    email: '',
    
    // Additional Options
    provideSupplies: false,
    needEstimate: true,
    specialInstructions: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(selectedService.price.min);

  const serviceTypes = {
    plumbing: ['Leak Repair', 'Pipe Installation', 'Drain Cleaning', 'Toilet Repair', 'Faucet Installation'],
    electrical: ['Wiring', 'Switch Installation', 'Outlet Repair', 'Circuit Breaker', 'Light Fixture'],
    cleaning: ['Deep Cleaning', 'Regular Cleaning', 'Move-in/out', 'Post Construction', 'Carpet Cleaning'],
    appliance: ['Washing Machine', 'Refrigerator', 'AC Repair', 'Dishwasher', 'Microwave'],
    painting: ['Room Painting', 'Exterior Paint', 'Wall Texture', 'Touch-up', 'Color Consultation'],
    carpentry: ['Furniture Repair', 'Custom Build', 'Cabinet Install', 'Shelving', 'Door/Window']
  };

  useEffect(() => {
    setFormData(prev => ({ ...prev, serviceId: selectedService.id }));
    setEstimatedPrice(selectedService.price.min);
  }, [selectedService]);

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

    // Update price estimate based on urgency and service type
    if (name === 'urgency' || name === 'serviceType') {
      updatePriceEstimate(name === 'urgency' ? value : formData.urgency);
    }
  };

  const updatePriceEstimate = (urgency) => {
    let basePrice = selectedService.price.min;
    if (urgency === 'urgent') basePrice *= 1.5;
    else if (urgency === 'emergency') basePrice *= 2;
    setEstimatedPrice(Math.round(basePrice));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1: // Service Details
        if (!formData.serviceType) newErrors.serviceType = 'Please select a service type';
        if (!formData.description.trim()) newErrors.description = 'Please describe your requirements';
        break;
        
      case 2: // Schedule
        if (!formData.preferredDate) newErrors.preferredDate = 'Please select a preferred date';
        if (!formData.preferredTime) newErrors.preferredTime = 'Please select a preferred time';
        
        // Validate date is not in the past
        const selectedDate = new Date(formData.preferredDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
          newErrors.preferredDate = 'Please select a future date';
        }
        break;
        
      case 3: // Location
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.pincode.trim()) newErrors.pincode = 'PIN code is required';
        else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'PIN code must be 6 digits';
        break;
        
      case 4: // Contact
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
          newErrors.phone = 'Phone number must be 10 digits';
        }
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(4)) return;
    
    setIsLoading(true);
    try {
      // TODO: Implement API call to backend
      console.log('Booking submission:', formData);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      // Redirect to confirmation page
      navigate('/booking-confirmation', { 
        state: { 
          booking: { ...formData, estimatedPrice, service: selectedService } 
        } 
      });
    } catch (error) {
      setErrors({ submit: 'Booking failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Service Details', icon: '🛠️' },
    { number: 2, title: 'Schedule', icon: '📅' },
    { number: 3, title: 'Location', icon: '📍' },
    { number: 4, title: 'Contact Info', icon: '👤' },
    { number: 5, title: 'Review & Book', icon: '✅' }
  ];

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Get time slots
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  return (
    <div className="booking-page">
      <Container>
        {/* Progress Steps */}
        <div className="booking-progress">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className={`progress-step ${currentStep >= step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}
            >
              <div className="step-icon">{step.icon}</div>
              <div className="step-info">
                <div className="step-number">Step {step.number}</div>
                <div className="step-title">{step.title}</div>
              </div>
              {index < steps.length - 1 && <div className="step-connector"></div>}
            </div>
          ))}
        </div>

        <div className="booking-layout">
          {/* Main Form */}
          <div className="booking-main">
            <Card className="booking-card">
              <CardHeader>
                <h2>Book Your Service</h2>
                <p>Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}</p>
              </CardHeader>
              
              <CardBody>
                <form onSubmit={handleSubmit} className="booking-form">
                  {/* Step 1: Service Details */}
                  {currentStep === 1 && (
                    <div className="form-step">
                      <h3>What service do you need?</h3>
                      
                      {/* Service Selection */}
                      <div className="service-selector">
                        {services.map(service => (
                          <button
                            key={service.id}
                            type="button"
                            className={`service-option ${selectedService.id === service.id ? 'active' : ''}`}
                            onClick={() => setSelectedService(service)}
                          >
                            <span className="service-icon">{service.icon}</span>
                            <span className="service-name">{service.name}</span>
                          </button>
                        ))}
                      </div>

                      {/* Service Type */}
                      <div className="form-group">
                        <label className="form-label">Specific Service Type *</label>
                        <select
                          name="serviceType"
                          className={`form-input ${errors.serviceType ? 'error' : ''}`}
                          value={formData.serviceType}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select service type</option>
                          {serviceTypes[selectedService.category]?.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                        {errors.serviceType && <div className="form-error">{errors.serviceType}</div>}
                      </div>

                      {/* Urgency */}
                      <div className="form-group">
                        <label className="form-label">Urgency</label>
                        <div className="urgency-options">
                          {[
                            { value: 'normal', label: 'Normal', desc: 'Within 2-3 days', extra: '' },
                            { value: 'urgent', label: 'Urgent', desc: 'Within 24 hours', extra: '(+50% cost)' },
                            { value: 'emergency', label: 'Emergency', desc: 'ASAP', extra: '(+100% cost)' }
                          ].map(option => (
                            <label key={option.value} className="urgency-option">
                              <input
                                type="radio"
                                name="urgency"
                                value={option.value}
                                checked={formData.urgency === option.value}
                                onChange={handleChange}
                              />
                              <div className="urgency-content">
                                <div className="urgency-label">{option.label}</div>
                                <div className="urgency-desc">{option.desc} {option.extra}</div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      <div className="form-group">
                        <label className="form-label">Describe your requirements *</label>
                        <textarea
                          name="description"
                          className={`form-input ${errors.description ? 'error' : ''}`}
                          rows={4}
                          placeholder="Please provide details about what you need done..."
                          value={formData.description}
                          onChange={handleChange}
                          required
                        />
                        {errors.description && <div className="form-error">{errors.description}</div>}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Schedule */}
                  {currentStep === 2 && (
                    <div className="form-step">
                      <h3>When would you like the service?</h3>
                      
                      <div className="schedule-section">
                        <h4>Preferred Time</h4>
                        <div className="datetime-group">
                          <Input
                            label="Date"
                            type="date"
                            name="preferredDate"
                            min={today}
                            value={formData.preferredDate}
                            onChange={handleChange}
                            error={errors.preferredDate}
                            required
                          />
                          
                          <div className="form-group">
                            <label className="form-label">Time *</label>
                            <select
                              name="preferredTime"
                              className={`form-input ${errors.preferredTime ? 'error' : ''}`}
                              value={formData.preferredTime}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Select time</option>
                              {timeSlots.map(time => (
                                <option key={time} value={time}>
                                  {new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', { 
                                    hour: 'numeric', 
                                    minute: '2-digit', 
                                    hour12: true 
                                  })}
                                </option>
                              ))}
                            </select>
                            {errors.preferredTime && <div className="form-error">{errors.preferredTime}</div>}
                          </div>
                        </div>
                      </div>

                      <div className="schedule-section">
                        <h4>Alternate Time (Optional)</h4>
                        <div className="datetime-group">
                          <Input
                            label="Date"
                            type="date"
                            name="alternateDate"
                            min={today}
                            value={formData.alternateDate}
                            onChange={handleChange}
                          />
                          
                          <div className="form-group">
                            <label className="form-label">Time</label>
                            <select
                              name="alternateTime"
                              className="form-input"
                              value={formData.alternateTime}
                              onChange={handleChange}
                            >
                              <option value="">Select time</option>
                              {timeSlots.map(time => (
                                <option key={time} value={time}>
                                  {new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', { 
                                    hour: 'numeric', 
                                    minute: '2-digit', 
                                    hour12: true 
                                  })}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Location */}
                  {currentStep === 3 && (
                    <div className="form-step">
                      <h3>Where do you need the service?</h3>
                      
                      <Input
                        label="Street Address"
                        name="address"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={handleChange}
                        error={errors.address}
                        required
                      />

                      <Input
                        label="Apartment/Unit (Optional)"
                        name="apartment"
                        placeholder="Apt, suite, floor, etc."
                        value={formData.apartment}
                        onChange={handleChange}
                      />

                      <div className="form-row">
                        <Input
                          label="City"
                          name="city"
                          placeholder="Enter city"
                          value={formData.city}
                          onChange={handleChange}
                          error={errors.city}
                          required
                        />
                        
                        <Input
                          label="PIN Code"
                          name="pincode"
                          placeholder="000000"
                          value={formData.pincode}
                          onChange={handleChange}
                          error={errors.pincode}
                          required
                        />
                      </div>

                      <Input
                        label="Landmark (Optional)"
                        name="landmark"
                        placeholder="Nearby landmark for easy location"
                        value={formData.landmark}
                        onChange={handleChange}
                      />
                    </div>
                  )}

                  {/* Step 4: Contact */}
                  {currentStep === 4 && (
                    <div className="form-step">
                      <h3>Contact Information</h3>
                      
                      <Input
                        label="Full Name"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        error={errors.fullName}
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

                      <div className="form-group">
                        <label className="form-label">Additional Options</label>
                        <div className="checkbox-group">
                          <label className="checkbox">
                            <input
                              type="checkbox"
                              name="provideSupplies"
                              checked={formData.provideSupplies}
                              onChange={handleChange}
                            />
                            <span className="checkmark"></span>
                            I will provide supplies/materials
                          </label>
                          
                          <label className="checkbox">
                            <input
                              type="checkbox"
                              name="needEstimate"
                              checked={formData.needEstimate}
                              onChange={handleChange}
                            />
                            <span className="checkmark"></span>
                            Get detailed estimate before work starts
                          </label>
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Special Instructions (Optional)</label>
                        <textarea
                          name="specialInstructions"
                          className="form-input"
                          rows={3}
                          placeholder="Any special instructions or requirements..."
                          value={formData.specialInstructions}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 5: Review */}
                  {currentStep === 5 && (
                    <div className="form-step">
                      <h3>Review Your Booking</h3>
                      
                      <div className="booking-summary">
                        <div className="summary-section">
                          <h4>Service Details</h4>
                          <div className="summary-item">
                            <span className="summary-label">Service:</span>
                            <span className="summary-value">{selectedService.name}</span>
                          </div>
                          <div className="summary-item">
                            <span className="summary-label">Type:</span>
                            <span className="summary-value">{formData.serviceType}</span>
                          </div>
                          <div className="summary-item">
                            <span className="summary-label">Urgency:</span>
                            <span className="summary-value">{formData.urgency}</span>
                          </div>
                        </div>

                        <div className="summary-section">
                          <h4>Schedule</h4>
                          <div className="summary-item">
                            <span className="summary-label">Date & Time:</span>
                            <span className="summary-value">
                              {new Date(formData.preferredDate).toLocaleDateString()} at{' '}
                              {new Date(`2000-01-01T${formData.preferredTime}`).toLocaleTimeString('en-US', { 
                                hour: 'numeric', 
                                minute: '2-digit', 
                                hour12: true 
                              })}
                            </span>
                          </div>
                        </div>

                        <div className="summary-section">
                          <h4>Location</h4>
                          <div className="summary-item">
                            <span className="summary-label">Address:</span>
                            <span className="summary-value">
                              {formData.address}
                              {formData.apartment && `, ${formData.apartment}`}
                              <br />
                              {formData.city}, {formData.pincode}
                            </span>
                          </div>
                        </div>

                        <div className="summary-section">
                          <h4>Contact</h4>
                          <div className="summary-item">
                            <span className="summary-label">Name:</span>
                            <span className="summary-value">{formData.fullName}</span>
                          </div>
                          <div className="summary-item">
                            <span className="summary-label">Phone:</span>
                            <span className="summary-value">{formData.phone}</span>
                          </div>
                        </div>
                      </div>

                      {errors.submit && (
                        <div className="form-error">{errors.submit}</div>
                      )}
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="form-navigation">
                    {currentStep > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        className="nav-btn"
                      >
                        Previous
                      </Button>
                    )}
                    
                    {currentStep < 5 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="nav-btn"
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="nav-btn submit-btn"
                      >
                        {isLoading ? 'Booking...' : 'Confirm Booking'}
                      </Button>
                    )}
                  </div>
                </form>
              </CardBody>
            </Card>
          </div>

          {/* Price Summary Sidebar */}
          <div className="booking-sidebar">
            <Card className="price-card">
              <CardHeader>
                <h3>Price Estimate</h3>
              </CardHeader>
              <CardBody>
                <div className="selected-service">
                  <div className="service-icon">{selectedService.icon}</div>
                  <div className="service-info">
                    <h4>{selectedService.name}</h4>
                    <p>{formData.serviceType || 'Select service type'}</p>
                  </div>
                </div>

                <div className="price-breakdown">
                  <div className="price-item">
                    <span>Base Price</span>
                    <span>₹{selectedService.price.min}</span>
                  </div>
                  
                  {formData.urgency === 'urgent' && (
                    <div className="price-item">
                      <span>Urgent Service (+50%)</span>
                      <span>₹{Math.round(selectedService.price.min * 0.5)}</span>
                    </div>
                  )}
                  
                  {formData.urgency === 'emergency' && (
                    <div className="price-item">
                      <span>Emergency Service (+100%)</span>
                      <span>₹{selectedService.price.min}</span>
                    </div>
                  )}
                  
                  <div className="price-total">
                    <span>Estimated Total</span>
                    <span>₹{estimatedPrice}</span>
                  </div>
                </div>

                <div className="price-note">
                  <p>
                    💡 This is an estimate. Final price will be confirmed after inspection.
                  </p>
                </div>

                <div className="service-features">
                  <h5>What's Included:</h5>
                  <ul>
                    <li>✅ Professional service</li>
                    <li>✅ Quality assurance</li>
                    <li>✅ Customer support</li>
                    <li>✅ Satisfaction guarantee</li>
                  </ul>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BookingPage;
