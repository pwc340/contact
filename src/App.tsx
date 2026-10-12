import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, CheckCircle, Phone, MapPin, Clock, Users, Star, MessageCircle, Send } from 'lucide-react'

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

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
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
    if (!formData.company.trim()) newErrors.company = 'Company name is required'
    if (!formData.enquiryType) newErrors.enquiryType = 'Please select an enquiry type'
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    if (!formData.consent) newErrors.consent = 'You must agree to the privacy policy'

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

    if (!validateForm()) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log('Form submitted:', formData)
    setIsSubmitting(false)
    setSubmitSuccess(true)

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

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="120" height="48" viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(0, 8)">
                <path d="M0 0h12.5c6.9 0 11.5 4.3 11.5 10.8 0 6.4-4.6 10.8-11.5 10.8H5.2V32H0V0zm5.2 17.2h6.8c4.2 0 6.8-2.4 6.8-6.4 0-4-2.6-6.4-6.8-6.4H5.2v12.8z" fill="#D04A02"/>
                <path d="M28.5 14.5l-4.3 17.5h-5.3L25.8 0h6.4l4.8 19.2L41.8 0h5.3l5.8 19.2L57.7 0h6.4l-6.9 32h-5.3l-5.5-19.5L41.9 32h-5.3l-8.1-17.5z" fill="#D04A02"/>
                <path d="M90.8 16.1c0 9.1-6.4 16.4-15.5 16.4-7.5 0-13.2-5.1-14.8-12.1h6c1.3 4.3 5.1 7.2 9.5 7.2 5.5 0 9.6-4.5 9.6-11.5 0-7-4.1-11.5-9.6-11.5-4.4 0-8.2 2.9-9.5 7.2h-6c1.6-7 7.3-12.1 14.8-12.1 9.1 0 15.5 7.3 15.5 16.4z" fill="#D04A02"/>
              </g>
            </svg>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <nav className="hidden lg:flex items-center space-x-6">
            <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">Services</a>
            <a href="#industries" className="text-sm font-medium hover:text-primary transition-colors">Industries</a>
            <a href="#insights" className="text-sm font-medium hover:text-primary transition-colors">Insights</a>
            <a href="#careers" className="text-sm font-medium hover:text-primary transition-colors">Careers</a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">About us</a>
          </nav>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t">
            <nav className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col space-y-3">
              <a href="#services" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Services</a>
              <a href="#industries" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Industries</a>
              <a href="#insights" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Insights</a>
              <a href="#careers" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Careers</a>
              <a href="#about" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>About us</a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-orange-600 py-12 md:py-20 lg:py-24">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Contact us
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-white">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          <Badge variant="secondary" className="text-base px-4 py-2 bg-white/20 hover:bg-white/30 border-white/30 text-white">
            <Clock className="w-4 h-4 mr-2" />
            We respond within 24 hours
          </Badge>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
              <CardHeader className="p-6 pb-4">
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you shortly
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900">Thank you!</p>
                      <p className="text-sm text-green-700">Your message has been sent successfully. We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={errors.firstName ? 'border-destructive' : ''}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-destructive">{errors.firstName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={errors.lastName ? 'border-destructive' : ''}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-destructive">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'border-destructive' : ''}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? 'border-destructive' : ''}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company name *</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={errors.company ? 'border-destructive' : ''}
                      />
                      {errors.company && (
                        <p className="text-sm text-destructive">{errors.company}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job title</Label>
                      <Input
                        id="jobTitle"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select
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
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="enquiryType">Type of enquiry *</Label>
                      <Select
                        id="enquiryType"
                        name="enquiryType"
                        value={formData.enquiryType}
                        onChange={handleChange}
                        className={errors.enquiryType ? 'border-destructive' : ''}
                      >
                        <option value="">Please select</option>
                        {enquiryTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </Select>
                      {errors.enquiryType && (
                        <p className="text-sm text-destructive">{errors.enquiryType}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className={errors.message ? 'border-destructive' : ''}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive">{errors.message}</p>
                    )}
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4"
                    />
                    <Label htmlFor="consent" className="text-sm font-normal leading-relaxed cursor-pointer flex-1">
                      I agree to PwC's <a href="#privacy" className="text-primary hover:underline">Privacy Policy</a> and consent to my personal information being used to contact me about services. *
                    </Label>
                  </div>
                  {errors.consent && (
                    <p className="text-sm text-destructive">{errors.consent}</p>
                  )}

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Security Badges */}
              <Card>
                <CardHeader className="p-6 pb-4">
                  <CardTitle className="text-lg">Security & Privacy</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Secure & Encrypted</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">GDPR Compliant</span>
                </div>
              </CardContent>
            </Card>

              {/* Testimonials */}
              <Card>
                <CardHeader className="p-6 pb-4">
                  <CardTitle className="text-lg">What our clients say</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-4">
                <blockquote className="text-sm italic text-muted-foreground">
                  "PwC's expertise and professionalism helped us navigate complex challenges with confidence."
                </blockquote>
                <cite className="text-xs text-muted-foreground not-italic">
                  — Rajesh Kumar, CFO, Tech Solutions Ltd
                </cite>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <div className="flex items-center gap-1 text-primary mb-1">
                      <Users className="w-4 h-4" />
                      <span className="text-2xl font-bold">10,000+</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Clients served</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-primary mb-1">
                      <Star className="w-4 h-4" />
                      <span className="text-2xl font-bold">95%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Client satisfaction</p>
                  </div>
                </div>
              </CardContent>
            </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader className="p-6 pb-4">
                  <CardTitle className="text-lg">Other ways to reach us</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-5">
                <div>
                  <div className="flex items-center gap-2 font-medium mb-2">
                    <Phone className="w-4 h-4 text-primary" />
                    Phone
                  </div>
                  <p className="text-sm text-muted-foreground">+91 (40) 4424 6000</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 font-medium mb-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Office locations
                  </div>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p><strong>Hyderabad</strong><br />Plot no. 77/A, 8-2-624/A/1, Road No. 10,<br />Banjara Hills, Hyderabad - 500 034</p>
                    <p><strong>Mumbai</strong><br />252 Veer Savarkar Marg, Shivaji Park,<br />Dadar (West), Mumbai - 400 028</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 font-medium mb-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Business hours
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                    <p>Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

              {/* Careers */}
              <Card className="bg-muted">
                <CardHeader className="p-6 pb-4">
                  <CardTitle className="text-lg">Join our team</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                <p className="text-sm text-muted-foreground mb-4">
                  Explore career opportunities at PwC India and be part of a diverse, innovative team.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="#careers">
                    View open positions
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </Button>
              </CardContent>
            </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted border-t mt-12 md:mt-16 lg:mt-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <nav className="flex flex-wrap justify-center gap-6">
              <a href="#privacy" className="text-sm hover:text-primary transition-colors">Privacy</a>
              <a href="#cookies" className="text-sm hover:text-primary transition-colors">Cookies</a>
              <a href="#terms" className="text-sm hover:text-primary transition-colors">Terms of use</a>
              <a href="#accessibility" className="text-sm hover:text-primary transition-colors">Accessibility</a>
            </nav>
            <p className="text-sm text-muted-foreground text-center">
              © 2026 PwC. All rights reserved. PwC refers to the PwC network and/or one or more of its member firms.
            </p>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <Button
        size="icon"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg"
        aria-label="Chat with us"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  )
}

export default App
