'use client'

import { useState, useEffect } from 'react'
import { 
  Mail, 
  MapPin, 
  Linkedin,
  Calendar,
  CheckCircle,
  Users,
  FileText,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  User as UserIcon,
  Briefcase,
  Phone,
  ListChecks,
  Clock,
  Type as TypeIcon,
  MessageSquare,
  Copy,
  Check
} from 'lucide-react'

import Image from 'next/image'

// TypeScript declaration for reCAPTCHA
declare global {
  interface Window {
    grecaptcha: {
      reset: () => void;
    };
    onRecaptchaSuccess: (token: string) => void;
  }
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    projectType: '',
    timeline: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [recaptchaToken, setRecaptchaToken] = useState<string>('')
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastType, setToastType] = useState<'success' | 'error'>('success')
  const [toastMessage, setToastMessage] = useState<string>('')
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Load reCAPTCHA script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js'
    script.async = true
    script.defer = true
    script.onload = () => setRecaptchaLoaded(true)
    document.head.appendChild(script)

    // Set up global callback for reCAPTCHA
    window.onRecaptchaSuccess = (token: string) => {
      setRecaptchaToken(token)
    }

    return () => {
      const existingScript = document.querySelector('script[src="https://www.google.com/recaptcha/api.js"]')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
      // Clean up global callback
      delete (window as any).onRecaptchaSuccess
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          organization: formData.organization,
          email: formData.email,
          phone: formData.phone,
          projectType: formData.projectType,
          timeline: formData.timeline,
          subject: formData.subject,
          message: formData.message,
          token: recaptchaToken
        }),
      })

      const result = await response.json()
      
      if (response.ok && result.ok) {
        setSubmitStatus('success')
        setToastType('success')
        setToastMessage('Message sent successfully!')
        setShowToast(true)
        setTimeout(() => setShowToast(false), 3000)
        setFormData({
          name: '',
          organization: '',
          email: '',
          phone: '',
          projectType: '',
          timeline: '',
          subject: '',
          message: ''
        })
        setRecaptchaToken('')
        // Reset reCAPTCHA
        if (window.grecaptcha) {
          window.grecaptcha.reset()
        }
      } else {
        console.error('Form submission failed:', result)
        setSubmitStatus('error')
        setToastType('error')
        
        // Handle rate limiting specifically
        if (response.status === 429) {
          const retryAfter = result.retryAfter || 15
          setToastMessage(`Too many requests. Please wait ${retryAfter} minutes before trying again.`)
        } else {
          setToastMessage(result.error || 'Failed to send message. Please try again.')
        }
        
        setShowToast(true)
        setTimeout(() => setShowToast(false), 5000) // Show longer for rate limit errors
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setToastType('error')
      setToastMessage('Network error. Please check your connection and try again.')
      setShowToast(true)
      setTimeout(() => setShowToast(false), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@nhungconsultancy.com',
      description: 'Response within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Vancouver, Canada',
      description: 'Available for international assignments'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'Connect with me',
      description: 'Professional networking and updates'
    }
  ]

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 1500)
    } catch (e) {
      // No-op if clipboard not available
    }
  }

  const processSteps = [
    {
      icon: Calendar,
      title: 'Initial Consultation',
      description: '30-minute discovery call to understand your needs, objectives, and project scope'
    },
    {
      icon: FileText,
      title: 'Proposal Development',
      description: 'Detailed proposal with methodology, timeline, deliverables, and investment'
    },
    {
      icon: Users,
      title: 'Project Execution',
      description: 'Collaborative implementation with regular check-ins and progress updates'
    },
    {
      icon: CheckCircle,
      title: 'Follow-up Support',
      description: 'Ongoing support and capacity building to ensure sustainable impact'
    }
  ]

  const faqs = [
    {
      question: 'What is your typical project duration?',
      answer: 'Project durations vary based on scope and complexity. Most M&E framework designs take 2-4 months, while comprehensive impact evaluations can span 6-12 months. I work flexibly to meet your timeline requirements.'
    },
    {
      question: 'Do you work remotely or on-site?',
      answer: 'I offer both remote and on-site consulting services. Remote work is available for most projects, with on-site visits arranged as needed for stakeholder engagement, training delivery, or data collection.'
    },
    {
      question: 'What is your pricing structure?',
      answer: 'Pricing is project-based and depends on scope, complexity, and duration. I provide transparent, detailed proposals with clear deliverables and investment breakdowns. Contact me for a customized quote.'
    },
    {
      question: 'How quickly do you respond to inquiries?',
      answer: 'I typically respond to all inquiries within 24 hours. For urgent projects, I can arrange same-day consultation calls to discuss your immediate needs.'
    },
    {
      question: 'What industries do you serve?',
      answer: 'I work across multiple sectors including energy transition, private sector development, education, agriculture, and gender equality. My experience spans international development, government, and corporate clients.'
    },
    {
      question: 'Do you provide training and capacity building?',
      answer: 'Yes, capacity building is a core part of my services. I offer training on M&E systems, gender-responsive programming, data analysis, and project management to ensure sustainable impact.'
    }
  ]

  return (
    <>
      {/* Hero Section with Left Image */}
      <section className="pt-28 md:pt-32 pb-16 md:pb-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            {/* Left: Image */}
            <div className="order-1 lg:order-none">
              <div className="relative max-w-xl mx-auto">
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-blue-800/20 rounded-3xl blur-2xl"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 bg-white">
                  <Image
                    src="/images/nhung-contact.png"
                    alt="Nhung Nguyen portrait for contact page"
                    width={1000}
                    height={1200}
                    sizes="(max-width: 1024px) 90vw, 42vw"
                    priority
                    quality={95}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxAAPwCdABmX/9k="
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="text-center lg:text-left space-y-8 self-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                  Get In Touch
                </div>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                  <span className="text-gray-900">Let&apos;s Create</span><br />
                  <span className="text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                    Impact Together
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-xl lg:max-w-none">
                  Ready to enhance your development programs with data-driven M&E frameworks and gender-responsive approaches? Let&apos;s discuss how we can achieve measurable impact together.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
                <a href="#contact-form" className="btn btn-primary">
                  Start a Conversation
                </a>
                <a href="mailto:contact@nhungconsultancy.com" className="btn btn-secondary">
                  Email Me
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-6 max-w-md sm:max-w-lg lg:max-w-none">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">24h</div>
                  <div className="text-sm text-gray-600">Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">100%</div>
                  <div className="text-sm text-gray-600">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section id="contact-form" className="section-padding bg-white relative">
        {/* Floating Toast */}
        {showToast && (
          <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-full px-5 py-3 shadow-lg backdrop-blur-md border ${toastType === 'success' ? 'bg-green-600/90 border-green-500 text-white' : 'bg-red-600/90 border-red-500 text-white'}`}>
            {toastMessage || (toastType === 'success' ? 'Message sent. I\'ll reply within 24 hours.' : 'Something went wrong. Please try again.')}
          </div>
        )}
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
              Contact Information
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get In <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              I&apos;m currently accepting consulting projects for 2025. Whether you need M&E framework design, 
              gender-responsive programming, or capacity building support, I&apos;m here to help.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-12 items-stretch">
            {/* Contact Methods - Horizontal cards */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Contact Methods</h3>
                <span className="hidden sm:inline text-xs text-gray-500">Typical response within 24 hours</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="group h-full">
                    <div className="relative h-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                      <div className="flex items-start gap-5">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow">
                          <method.icon className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <h4 className="text-base font-semibold text-gray-900">{method.title}</h4>
                          </div>
                          <div className="mt-1 truncate text-blue-600 font-medium">
                            {method.title === 'Email' ? (
                              <a href={`mailto:${method.value}`} className="hover:underline">{method.value}</a>
                            ) : (
                              <span>{method.value}</span>
                            )}
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{method.description}</p>
                        </div>
                      </div>
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100 ring-1 ring-black/5">
              <div className="mb-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">Send a Message</h2>
                    <p className="text-gray-600 mt-1">I typically reply within one business day.</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Online
                  </div>
                </div>
              </div>


              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="mb-6 p-6 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center">
                    <AlertCircle className="h-6 w-6 text-red-600 mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-red-800">Something went wrong</h3>
                      <p className="text-red-700">Please try again or email me directly at contact@nhungconsultancy.com</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Details Section */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                      <UserIcon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 tracking-wide uppercase">Your Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition-all duration-300 hover:border-gray-300 shadow-sm"
                        placeholder="Your full name"
                        />
                      </div>
                  </div>
                  
                  <div>
                    <label htmlFor="organization" className="block text-sm font-semibold text-gray-700 mb-2">
                      Organization <span className="text-red-500">*</span>
                    </label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                      type="text"
                      id="organization"
                      name="organization"
                      required
                      value={formData.organization}
                      onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition-all duration-300 hover:border-gray-300 shadow-sm"
                        placeholder="Your organization / company"
                        />
                      </div>
                  </div>
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition-all duration-300 hover:border-gray-300 shadow-sm"
                        placeholder="your.email@example.com"
                        />
                      </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition-all duration-300 hover:border-gray-300 shadow-sm"
                        placeholder="Optional phone number"
                        />
                      </div>
                  </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-semibold text-gray-700 mb-2">
                      Project Type *
                    </label>
                    <div className="relative">
                      <ListChecks className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <select
                      id="projectType"
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                    >
                      <option value="">Select a project type</option>
                      <option value="m&e-framework">M&E Framework Design</option>
                      <option value="gender-inclusion">Gender & Economic Inclusion</option>
                      <option value="capacity-building">Capacity Building & Training</option>
                      <option value="impact-evaluation">Impact Evaluation</option>
                      <option value="strategic-advisory">Strategic Advisory</option>
                      <option value="data-analysis">Data Analytics & Visualization</option>
                      <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-semibold text-gray-700 mb-2">
                      Project Timeline
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition-all duration-300 hover:border-gray-300 shadow-sm"
                    >
                      <option value="">Select timeline</option>
                      <option value="asap">ASAP</option>
                      <option value="1-3-months">1-3 months</option>
                      <option value="3-6-months">3-6 months</option>
                      <option value="6-12-months">6-12 months</option>
                      <option value="over-12-months">Over 12 months</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject
                  </label>
                  <div className="relative">
                    <TypeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition-all duration-300 hover:border-gray-300 shadow-sm"
                    placeholder="Brief description of your inquiry"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 h-4 w-4 text-gray-400" />
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please describe your project needs, objectives, and any specific requirements..."
                      className="w-full pl-10 pr-12 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition-all duration-300 hover:border-gray-300 shadow-sm resize-vertical"
                    />
                    <div className="absolute right-3 bottom-3 text-xs text-gray-400">{formData.message.length}/1000</div>
                  </div>
                </div>

                {/* reCAPTCHA */}
                {recaptchaLoaded && (
                  <div className="flex justify-center">
                    <div 
                      className="g-recaptcha" 
                      data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
                      data-callback="onRecaptchaSuccess"
                    ></div>
                  </div>
                )}
                
                <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-7 rounded-full font-semibold text-base sm:text-lg hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  By submitting this form, you agree to our privacy policy. Your information will be kept confidential.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Process */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white text-gray-700 text-sm font-medium mb-6 shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              How We Work Together
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Consultation <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A structured approach that ensures your project gets the attention and expertise it deserves, 
              from initial consultation to successful completion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="group text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <step.icon className="h-10 w-10" />
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent transform translate-x-4"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white relative">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
              Common Questions
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get answers to the most common questions about my consulting services, process, and availability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="group h-full">
                <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors flex-grow">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Availability Status */}
      <section className="section-padding bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full mix-blend-overlay filter blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full mix-blend-overlay filter blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white rounded-full mix-blend-overlay filter blur-xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
              Current Availability
            </div>
            
            <div className="flex flex-col lg:flex-row items-center justify-center mb-12">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mr-8 mb-6 lg:mb-0 shadow-lg">
                <Calendar className="h-12 w-12 text-white" />
              </div>
              <div className="text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  Currently Accepting <span className="text-yellow-300">Projects for 2025</span>
                </h2>
                <p className="text-xl text-blue-100 leading-relaxed max-w-2xl">
                  I&apos;m available for new consulting engagements starting January 2025. Book a consultation call to discuss your project needs and secure your preferred timeline.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <a href="#contact-form" className="group bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg">
                Schedule Consultation
              </a>
              <a href="mailto:contact@nhungconsultancy.com" className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 hover:scale-105 transition-all duration-300">
                Send Email
              </a>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300 mb-2">24h</div>
                <div className="text-blue-100 text-sm">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300 mb-2">100%</div>
                <div className="text-blue-100 text-sm">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300 mb-2">15+</div>
                <div className="text-blue-100 text-sm">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}