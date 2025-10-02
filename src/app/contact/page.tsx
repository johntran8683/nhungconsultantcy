'use client'

import { useState } from 'react'
import { 
  Mail, 
  MapPin, 
  Linkedin,
  Calendar,
  CheckCircle,
  Users,
  FileText
} from 'lucide-react'

import Image from 'next/image'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! I will get back to you within 24 hours.')
      setFormData({
        name: '',
        organization: '',
        email: '',
        phone: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: ''
      })
      setIsSubmitting(false)
    }, 2000)
  }

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'nhungconsultancy@gmail.com',
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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
                    quality={85}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="text-center lg:text-left space-y-8">
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
                <a href="mailto:nhungconsultancy@gmail.com" className="btn btn-secondary">
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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div className="h-full flex flex-col space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 border border-blue-200 flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Methods</h3>
                <div className="space-y-6">
                  {contactMethods.map((method, index) => (
                    <div key={index} className="group">
                      <div className="flex items-center p-6 bg-white rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                          <method.icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-gray-800 transition-colors">{method.title}</h4>
                          <p className="text-blue-600 font-semibold mb-1">{method.value}</p>
                          <span className="text-gray-500 text-sm">{method.description}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Availability Status */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 border border-green-200 flex-grow">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                  <h3 className="text-xl font-bold text-gray-900">Current Availability</h3>
                </div>
                <p className="text-gray-600 mb-4">Available for new projects starting Q1 2025</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-semibold text-green-600">Within 24 hours</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Project Capacity</span>
                    <span className="font-semibold text-green-600">2-3 concurrent projects</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Travel Availability</span>
                    <span className="font-semibold text-green-600">International assignments</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-2xl shadow-xl border border-gray-200">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Send a Message</h2>
                <p className="text-gray-600">Fill out the form below and I&apos;ll get back to you within 24 hours</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition-all duration-300 hover:border-gray-300 shadow-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="organization" className="block text-sm font-semibold text-gray-700 mb-2">
                      Organization *
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      required
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition-all duration-300 hover:border-gray-300 shadow-sm"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition-all duration-300 hover:border-gray-300 shadow-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition-all duration-300 hover:border-gray-300 shadow-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="projectType" className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Type *
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    required
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
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
                
                <div>
                  <label htmlFor="timeline" className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition-all duration-300 hover:border-gray-300 shadow-sm"
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-3-months">1-3 months</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="6-12-months">6-12 months</option>
                    <option value="over-12-months">Over 12 months</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please describe your project needs, objectives, and any specific requirements..."
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition-all duration-300 hover:border-gray-300 shadow-sm resize-vertical"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
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
              <a href="mailto:nhungconsultancy@gmail.com" className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 hover:scale-105 transition-all duration-300">
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