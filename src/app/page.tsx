'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Building, Globe, TrendingUp, Heart, GraduationCap, Users } from 'lucide-react'
import MetricsSection from '@/components/MetricsSection'
import TestimonialSection from '@/components/TestimonialSection'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                  Available for 2025 Projects
                </div>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="text-gray-900">Senior</span><br />
                  <span className="text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                    M&E & Gender Inclusion
                  </span><br />
                  <span className="text-gray-900">Consultant</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Enhancing program effectiveness for international development organizations through systematic monitoring, evaluation, and gender-responsive programming.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/expertise" className="btn btn-primary group">
                  Explore My Expertise 
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/contact" className="btn btn-secondary">
                  Start a Project
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center space-x-8 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50+</div>
                  <div className="text-sm text-gray-600">Projects Led</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">15+</div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-96 h-96 rounded-3xl overflow-hidden border-4 border-white shadow-2xl relative">
                  {/* Professional Headshot Image */}
        <Image
                    src="/images/portfolio.png"
                    alt="Nhung Nguyen - Senior M&E & Gender Inclusion Consultant"
                    width={384}
                    height={384}
                    className="w-full h-full object-cover"
          priority
        />
                  
                  {/* Professional Badge Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Nhung Nguyen</h3>
                    <p className="text-sm text-gray-600 mb-2">Senior M&E & Gender Inclusion Consultant</p>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-white text-lg">✓</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <MetricsSection />

      {/* About Summary */}
      <section className="section-padding bg-white relative">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                About Me
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Advancing Development Through 
                <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Measurable Impact</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-xl text-gray-600 leading-relaxed">
                  With over <span className="font-semibold text-gray-900">15 years of experience</span> in international development, I specialize in designing and implementing monitoring & evaluation frameworks that advance gender equality and sustainable development.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  My work spans across <span className="font-semibold text-gray-900">Southeast Asia, Pacific Islands, and beyond</span>, helping organizations like UNOPS, IFC, and ADB achieve measurable impact through data-driven programming.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">Gender Expert</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-full">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">M&E Specialist</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-full">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">International Consultant</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 border border-blue-200">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                        <div className="text-white text-xl">🎯</div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Mission-Driven</h3>
                        <p className="text-sm text-gray-600">Advancing gender equality through systematic M&E</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                        <div className="text-white text-xl">📊</div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Data-Driven</h3>
                        <p className="text-sm text-gray-600">Data-driven decision making and impact measurement</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                        <div className="text-white text-xl">🌍</div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Global Reach</h3>
                        <p className="text-sm text-gray-600">Experience across 15+ countries and multiple sectors</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white text-gray-700 text-sm font-medium mb-6 shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Trusted Partners
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Working with <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Global Leaders</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Partnering with international organizations to advance sustainable development and gender equality across the globe.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="group">
              <div className="flex flex-col items-center p-8 bg-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <span className="font-semibold text-gray-800 text-center">UNOPS</span>
                <span className="text-xs text-gray-500 text-center mt-1">Energy Transition</span>
              </div>
            </div>
            
            <div className="group">
              <div className="flex flex-col items-center p-8 bg-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <span className="font-semibold text-gray-800 text-center">IFC</span>
                <span className="text-xs text-gray-500 text-center mt-1">Gender Inclusion</span>
              </div>
            </div>
            
            <div className="group">
              <div className="flex flex-col items-center p-8 bg-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <span className="font-semibold text-gray-800 text-center">ADB</span>
                <span className="text-xs text-gray-500 text-center mt-1">Private Sector</span>
              </div>
            </div>
            
            <div className="group">
              <div className="flex flex-col items-center p-8 bg-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <span className="font-semibold text-gray-800 text-center">UNICEF</span>
                <span className="text-xs text-gray-500 text-center mt-1">Child Welfare</span>
              </div>
            </div>
            
            <div className="group">
              <div className="flex flex-col items-center p-8 bg-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <span className="font-semibold text-gray-800 text-center">World Bank</span>
                <span className="text-xs text-gray-500 text-center mt-1">Development</span>
              </div>
            </div>
            
            <div className="group">
              <div className="flex flex-col items-center p-8 bg-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <span className="font-semibold text-gray-800 text-center">GIZ</span>
                <span className="text-xs text-gray-500 text-center mt-1">Cooperation</span>
              </div>
            </div>
          </div>
          
          {/* Stats Bar */}
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">$30M+</div>
                <div className="text-sm text-gray-600">Portfolio Value</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                <div className="text-sm text-gray-600">Projects Led</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">15+</div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <TestimonialSection />

      {/* Call to Action */}
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
              Ready to Partner?
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Let&apos;s Advance <span className="text-yellow-300">Measurable Impact</span> Together
            </h2>
            
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Enhance your development programs with systematic M&E frameworks and gender-responsive approaches that deliver measurable results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Link href="/contact" className="group bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg">
                Start Your Project
                <ArrowRight className="inline ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/portfolio" className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 hover:scale-105 transition-all duration-300">
                View My Work
              </Link>
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