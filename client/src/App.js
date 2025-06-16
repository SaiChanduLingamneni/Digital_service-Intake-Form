import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    description: '',
    urgency: '',
    budget: '',
    timeline: ''
  });

  const [errors, setErrors] = useState({});
  const [prefillData, setPrefillData] = useState([]);
  const [selectedPrefill, setSelectedPrefill] = useState('');

  useEffect(() => {
    // Fetch prefill data from backend
    fetch('http://localhost:5000/api/prefill')
      .then(response => response.json())
      .then(data => setPrefillData(data))
      .catch(error => console.error('Error fetching prefill data:', error));
  }, []);

  const validateEmail = (email) => {
    const canadianEmailRegex = /^[^\s@]+@[^\s@]+\.(ca|com)$/i;
    return canadianEmailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const canadianPhoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    return canadianPhoneRegex.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid Canadian email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter phone in format: (123) 456-7890';
    }

    if (!formData.serviceType) {
      newErrors.serviceType = 'Service type is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
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

  const handlePrefillSelect = (e) => {
    const selectedId = e.target.value;
    setSelectedPrefill(selectedId);
    
    if (selectedId) {
      const selectedData = prefillData.find(item => item.id.toString() === selectedId);
      if (selectedData) {
        setFormData(prev => ({
          ...prev,
          name: selectedData.name,
          email: selectedData.email,
          phone: selectedData.phone,
          serviceType: selectedData.serviceType,
          description: selectedData.description
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Submit to backend
      fetch('http://localhost:5000/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then(response => response.text())
      .then(data => {
        alert('Form submitted successfully!');
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error submitting form');
      });
    }
  };

  const getConditionalFields = () => {
    switch (formData.serviceType) {
      case 'Consultation':
        return (
          <>
            <div className="form-group">
              <label htmlFor="urgency">Urgency Level:</label>
              <select
                id="urgency"
                name="urgency"
                value={formData.urgency}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="">Select urgency</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </>
        );
      case 'Support':
        return (
          <>
            <div className="form-group">
              <label htmlFor="urgency">Issue Priority:</label>
              <select
                id="urgency"
                name="urgency"
                value={formData.urgency}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="">Select priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </>
        );
      case 'Development':
        return (
          <>
            <div className="form-group">
              <label htmlFor="budget">Budget Range:</label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="">Select budget range</option>
                <option value="Under $5,000">Under $5,000</option>
                <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                <option value="$15,000 - $50,000">$15,000 - $50,000</option>
                <option value="Over $50,000">Over $50,000</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="timeline">Project Timeline:</label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="">Select timeline</option>
                <option value="1-2 weeks">1-2 weeks</option>
                <option value="1-2 months">1-2 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="6+ months">6+ months</option>
              </select>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Digital Service Intake Form</h1>
        
        <div className="prefill-section">
          <label htmlFor="prefill">Quick Fill (Demo):</label>
          <select
            id="prefill"
            value={selectedPrefill}
            onChange={handlePrefillSelect}
            className="form-control"
          >
            <option value="">Select a demo user...</option>
            {prefillData.map(item => (
              <option key={item.id} value={item.id}>
                {item.name} - {item.serviceType}
              </option>
            ))}
          </select>
        </div>

        <form onSubmit={handleSubmit} className="intake-form">
          <div className="form-group">
            <label htmlFor="name">Full Name: *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`form-control ${errors.name ? 'error' : ''}`}
              placeholder="Enter your full name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address: *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`form-control ${errors.email ? 'error' : ''}`}
              placeholder="example@domain.ca"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number: *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`form-control ${errors.phone ? 'error' : ''}`}
              placeholder="(123) 456-7890"
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="serviceType">Service Type: *</label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleInputChange}
              className={`form-control ${errors.serviceType ? 'error' : ''}`}
            >
              <option value="">Select a service</option>
              <option value="Consultation">Consultation</option>
              <option value="Support">Support</option>
              <option value="Development">Development</option>
            </select>
            {errors.serviceType && <span className="error-message">{errors.serviceType}</span>}
          </div>

          {getConditionalFields()}

          <div className="form-group">
            <label htmlFor="description">Description: *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`form-control ${errors.description ? 'error' : ''}`}
              placeholder="Please describe your requirements..."
              rows="4"
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <button type="submit" className="submit-btn">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;

