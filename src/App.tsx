import { useState, useEffect } from 'react'
import './App.css'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  jobTitle: string
  country: string
  enquiryType: string
  message: string
  consent: boolean
}

interface FormErrors {
  [key: string]: string
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    country: 'India',
    enquiryType: '',
    message: '',
    consent: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showChat, setShowChat] = useState(false)

  const enquiryTypes = [
    'General enquiry',
    'Assurance services',
    'Tax services',
    'Consulting services',
    'Deals',
    'ESG services',
    'Forensics',
    'Legal services',
    'Risk assurance',
    'Technology consulting',
    'Other',
  ]

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[\d\s\+\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number'
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required'
    }

    if (!formData.enquiryType) {
      newErrors.enquiryType = 'Please select an enquiry type'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    if (!formData.consent) {
      newErrors.consent = 'You must agree to the privacy policy'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call with realistic timing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log('Form submitted:', formData)
    setIsSubmitting(false)
    setSubmitSuccess(true)

    // Reset form after success
    setTimeout(() => {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
        country: 'India',
        enquiryType: '',
        message: '',
        consent: false,
      })
      setSubmitSuccess(false)
    }, 3000)
  }

  useEffect(() => {
    // Show live chat after 10 seconds
    const timer = setTimeout(() => setShowChat(true), 10000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <div className="logo">
            <svg width="120" height="48" viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(0, 8)">
                <path d="M0 0h12.5c6.9 0 11.5 4.3 11.5 10.8 0 6.4-4.6 10.8-11.5 10.8H5.2V32H0V0zm5.2 17.2h6.8c4.2 0 6.8-2.4 6.8-6.4 0-4-2.6-6.4-6.8-6.4H5.2v12.8z" fill="#D04A02"/>
                <path d="M28.5 14.5l-4.3 17.5h-5.3L25.8 0h6.4l4.8 19.2L41.8 0h5.3l5.8 19.2L57.7 0h6.4l-6.9 32h-5.3l-5.5-19.5L41.9 32h-5.3l-8.1-17.5z" fill="#D04A02"/>
                <path d="M90.8 16.1c0 9.1-6.4 16.4-15.5 16.4-7.5 0-13.2-5.1-14.8-12.1h6c1.3 4.3 5.1 7.2 9.5 7.2 5.5 0 9.6-4.5 9.6-11.5 0-7-4.1-11.5-9.6-11.5-4.4 0-8.2 2.9-9.5 7.2h-6c1.6-7 7.3-12.1 14.8-12.1 9.1 0 15.5 7.3 15.5 16.4z" fill="#D04A02"/>
              </g>
            </svg>
          </div>
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
            <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="#industries" onClick={() => setMobileMenuOpen(false)}>Industries</a>
            <a href="#insights" onClick={() => setMobileMenuOpen(false)}>Insights</a>
            <a href="#careers" onClick={() => setMobileMenuOpen(false)}>Careers</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About us</a>
          </nav>
        </div>
      </header>

      <main className="main">
        <div className="hero">
          <div className="container">
            <h1>Contact us</h1>
            <p className="subtitle">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
            <div className="response-badge">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>We respond within 24 hours</span>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="content-wrapper">
            <div className="form-section">
              {submitSuccess && (
                <div className="success-message animate-slide-in" role="alert">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">
                      First name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? 'error' : ''}
                      aria-invalid={!!errors.firstName}
                      aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                    />
                    {errors.firstName && (
                      <span id="firstName-error" className="error-message" role="alert">
                        {errors.firstName}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">
                      Last name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? 'error' : ''}
                      aria-invalid={!!errors.lastName}
                      aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                    />
                    {errors.lastName && (
                      <span id="lastName-error" className="error-message" role="alert">
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">
                      Email address <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <span id="email-error" className="error-message" role="alert">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">
                      Phone number <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={errors.phone ? 'error' : ''}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                    />
                    {errors.phone && (
                      <span id="phone-error" className="error-message" role="alert">
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="company">
                      Company name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={errors.company ? 'error' : ''}
                      aria-invalid={!!errors.company}
                      aria-describedby={errors.company ? 'company-error' : undefined}
                    />
                    {errors.company && (
                      <span id="company-error" className="error-message" role="alert">
                        {errors.company}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="jobTitle">Job title</label>
                    <input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Singapore">Singapore</option>
                      <option value="UAE">UAE</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="enquiryType">
                      Type of enquiry <span className="required">*</span>
                    </label>
                    <select
                      id="enquiryType"
                      name="enquiryType"
                      value={formData.enquiryType}
                      onChange={handleChange}
                      className={errors.enquiryType ? 'error' : ''}
                      aria-invalid={!!errors.enquiryType}
                      aria-describedby={errors.enquiryType ? 'enquiryType-error' : undefined}
                    >
                      <option value="">Please select</option>
                      {enquiryTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.enquiryType && (
                      <span id="enquiryType-error" className="error-message" role="alert">
                        {errors.enquiryType}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    Your message <span className="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'error' : ''}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <span id="message-error" className="error-message" role="alert">
                      {errors.message}
                    </span>
                  )}
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      className={errors.consent ? 'error' : ''}
                      aria-invalid={!!errors.consent}
                      aria-describedby={errors.consent ? 'consent-error' : undefined}
                    />
                    <span>
                      I agree to PwC's <a href="#privacy">Privacy Policy</a> and consent to my personal
                      information being used to contact me about services. <span className="required">*</span>
                    </span>
                  </label>
                  {errors.consent && (
                    <span id="consent-error" className="error-message" role="alert">
                      {errors.consent}
                    </span>
                  )}
                </div>

                <button type="submit" className="submit-button" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Sending...
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              </form>
            </div>

            <div className="info-section">
              <div className="info-card trust-badge-card">
                <div className="security-badges">
                  <div className="badge">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#008A00" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                    <span>Secure & Encrypted</span>
                  </div>
                  <div className="badge">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3860BE" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>GDPR Compliant</span>
                  </div>
                </div>
              </div>

              <div className="info-card testimonial-card">
                <h3>What our clients say</h3>
                <blockquote>
                  <p>"PwC's expertise and professionalism helped us navigate complex challenges with confidence."</p>
                  <footer>— Rajesh Kumar, CFO, Tech Solutions Ltd</footer>
                </blockquote>
                <div className="trust-stats">
                  <div className="stat">
                    <strong>10,000+</strong>
                    <span>Clients served</span>
                  </div>
                  <div className="stat">
                    <strong>95%</strong>
                    <span>Client satisfaction</span>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <h2>Other ways to reach us</h2>
                
                <div className="contact-method">
                  <h3>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    Phone
                  </h3>
                  <p>+91 (40) 4424 6000</p>
                </div>

                <div className="contact-method">
                  <h3>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    Office locations
                  </h3>
                  <p>
                    <strong>Hyderabad</strong><br />
                    Plot no. 77/A, 8-2-624/A/1, Road No. 10,<br />
                    Banjara Hills, Hyderabad - 500 034
                  </p>
                  <p style={{ marginTop: '1rem' }}>
                    <strong>Mumbai</strong><br />
                    252 Veer Savarkar Marg, Shivaji Park,<br />
                    Dadar (West), Mumbai - 400 028
                  </p>
                </div>

                <div className="contact-method">
                  <h3>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                    Business hours
                  </h3>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM IST<br />
                  Saturday - Sunday: Closed</p>
                </div>
              </div>

              <div className="info-card cta-card">
                <h3>Join our team</h3>
                <p>Explore career opportunities at PwC India and be part of a diverse, innovative team.</p>
                <a href="#careers" className="cta-link">
                  View open positions
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-links">
              <a href="#privacy">Privacy</a>
              <a href="#cookies">Cookies</a>
              <a href="#terms">Terms of use</a>
              <a href="#accessibility">Accessibility</a>
            </div>
            <p className="copyright">© 2026 PwC. All rights reserved. PwC refers to the PwC network and/or one or more of its member firms.</p>
          </div>
        </div>
      </footer>

      {/* Live Chat Widget */}
      {showChat && (
        <div className={`chat-widget ${showChat ? 'chat-visible' : ''}`}>
          <div className="chat-header">
            <div className="chat-avatar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <strong>Need help?</strong>
              <span>We're online now</span>
            </div>
            <button 
              className="chat-close" 
              onClick={() => setShowChat(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
          <div className="chat-body">
            <div className="chat-message">
              <p>Hi! 👋 How can we help you today?</p>
            </div>
          </div>
          <div className="chat-footer">
            <button className="chat-button" onClick={() => window.location.href = '#message'}>
              Send us a message
            </button>
          </div>
        </div>
      )}

      {/* Chat Trigger Button (when chat is closed) */}
      {!showChat && (
        <button 
          className="chat-trigger" 
          onClick={() => setShowChat(true)}
          aria-label="Open chat"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="chat-badge">1</span>
        </button>
      )}
    </div>
  )
}

export default App
