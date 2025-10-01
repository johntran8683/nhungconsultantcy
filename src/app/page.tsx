'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Building, Globe, TrendingUp, Heart, GraduationCap, Users, Target, BarChart3, Award, CheckCircle, MapPin, Clock, Star, Shield, Zap } from 'lucide-react'
import MetricsSection from '@/components/MetricsSection'
import TestimonialSection from '@/components/TestimonialSection'

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-start lg:items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-12 md:pt-16 relative overflow-hidden">
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
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium ring-1 ring-blue-200/60">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                  Available for 2025 Projects
                </div>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                  <span className="text-gray-900">Senior</span><br />
                  <span className="text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                    M&E & Gender Inclusion
                  </span><br />
                  <span className="text-gray-900">Consultant</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
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
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Framed Portrait with subtle gradient ring */}
                <div className="relative w-96 h-96">
                  <div className="absolute inset-0 rounded-3xl p-[6px] bg-gradient-to-tr from-blue-600 via-purple-500 to-emerald-400">
                    <div className="w-full h-full rounded-3xl bg-white"></div>
                  </div>
                  <div className="absolute inset-[6px] rounded-3xl overflow-hidden border border-gray-100 shadow-2xl">
                    {/* Professional Headshot Image */}
                    <Image
                      src="/images/Nhung-portfolio.png"
                      alt="Nhung Nguyen - Senior M&E & Gender Inclusion Consultant"
                      width={512}
                      height={512}
                      className="w-full h-full object-cover object-center brightness-105 contrast-110"
                      priority
                      quality={95}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
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
                </div>

                {/* Subtle floating accents (no animations for professional tone) */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg opacity-90">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div className="absolute top-1/2 -right-6 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center shadow-lg opacity-90">
                  <Target className="w-5 h-5 text-white" />
                </div>

                {/* Stats under image in a clean card, aligned with buttons */}
                <div className="mt-6 lg:mt-8">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm px-6 py-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center group">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-200 transition-colors">
                          <Award className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="text-xl font-bold text-gray-900">15+</div>
                        <div className="text-xs text-gray-600">Years Experience</div>
                      </div>
                      <div className="text-center group">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-green-200 transition-colors">
                          <BarChart3 className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="text-xl font-bold text-gray-900">50+</div>
                        <div className="text-xs text-gray-600">Projects Led</div>
                      </div>
                      <div className="text-center group">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-purple-200 transition-colors">
                          <MapPin className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="text-xl font-bold text-gray-900">15+</div>
                        <div className="text-xs text-gray-600">Countries</div>
                      </div>
                    </div>
                  </div>
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
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-full hover:bg-green-50 transition-colors">
                    <Users className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">Gender Expert</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-full hover:bg-blue-50 transition-colors">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">M&E Specialist</span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-full hover:bg-purple-50 transition-colors">
                    <Globe className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-gray-700">International Consultant</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 border border-blue-200">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Mission-Driven</h3>
                        <p className="text-sm text-gray-600">Advancing gender equality through systematic M&E</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Data-Driven</h3>
                        <p className="text-sm text-gray-600">Data-driven decision making and impact measurement</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                        <Globe className="w-6 h-6 text-white" />
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
            <div className="group h-full">
              <div className="p-6 md:p-7 bg-white rounded-2xl border border-gray-200/60 hover:border-gray-300 hover:shadow-md transition-all duration-300 h-full flex flex-col items-center justify-center text-center">
                <div className="w-full h-12 md:h-14 flex items-center justify-center mb-3 md:mb-4">
                  <Image src="/images/logos/unops.svg" alt="UNOPS logo" width={160} height={56} className="max-h-12 md:max-h-14 max-w-[140px] w-auto object-contain" />
                </div>
                <div>
                  <div className="text-sm md:text-base font-semibold text-gray-900 leading-none">UNOPS</div>
                  <div className="text-[11px] md:text-sm text-gray-500 leading-snug">Energy Transition</div>
                </div>
              </div>
            </div>

            <div className="group h-full">
              <div className="p-6 md:p-7 bg-white rounded-2xl border border-gray-200/60 hover:border-gray-300 hover:shadow-md transition-all duration-300 h-full flex flex-col items-center justify-center text-center">
                <div className="w-full h-12 md:h-14 flex items-center justify-center mb-3 md:mb-4">
                  <Image src="/images/logos/ifc.svg" alt="IFC logo" width={160} height={56} className="max-h-12 md:max-h-14 max-w-[140px] w-auto object-contain" />
                </div>
                <div>
                  <div className="text-sm md:text-base font-semibold text-gray-900 leading-none">IFC</div>
                  <div className="text-[11px] md:text-sm text-gray-500 leading-snug">Gender Inclusion</div>
                </div>
              </div>
            </div>

            <div className="group h-full">
              <div className="p-6 md:p-7 bg-white rounded-2xl border border-gray-200/60 hover:border-gray-300 hover:shadow-md transition-all duration-300 h-full flex flex-col items-center justify-center text-center">
                <div className="w-full h-12 md:h-14 flex items-center justify-center mb-3 md:mb-4">
                  <Image src="/images/logos/adb.svg" alt="ADB logo" width={160} height={56} className="max-h-12 md:max-h-14 max-w-[140px] w-auto object-contain" />
                </div>
                <div>
                  <div className="text-sm md:text-base font-semibold text-gray-900 leading-none">ADB</div>
                  <div className="text-[11px] md:text-sm text-gray-500 leading-snug">Private Sector Development</div>
                </div>
              </div>
            </div>

            <div className="group h-full">
              <div className="p-6 md:p-7 bg-white rounded-2xl border border-gray-200/60 hover:border-gray-300 hover:shadow-md transition-all duration-300 h-full flex flex-col items-center justify-center text-center">
                <div className="w-full h-12 md:h-14 flex items-center justify-center mb-3 md:mb-4">
                  <Image src="/images/logos/unicef.svg" alt="UNICEF logo" width={160} height={56} className="max-h-12 md:max-h-14 max-w-[140px] w-auto object-contain" />
                </div>
                <div>
                  <div className="text-sm md:text-base font-semibold text-gray-900 leading-none">UNICEF</div>
                  <div className="text-[11px] md:text-sm text-gray-500 leading-snug">Child Welfare</div>
                </div>
              </div>
            </div>

            <div className="group h-full">
              <div className="p-6 md:p-7 bg-white rounded-2xl border border-gray-200/60 hover:border-gray-300 hover:shadow-md transition-all duration-300 h-full flex flex-col items-center justify-center text-center">
                <div className="w-full h-12 md:h-14 flex items-center justify-center mb-3 md:mb-4">
                  <Image src="/images/logos/worldbank.svg" alt="World Bank logo" width={160} height={56} className="max-h-12 md:max-h-14 max-w-[140px] w-auto object-contain" />
                </div>
                <div>
                  <div className="text-sm md:text-base font-semibold text-gray-900 leading-none">World Bank</div>
                  <div className="text-[11px] md:text-sm text-gray-500 leading-snug">Development Finance</div>
                </div>
              </div>
            </div>

            <div className="group h-full">
              <div className="p-6 md:p-7 bg-white rounded-2xl border border-gray-200/60 hover:border-gray-300 hover:shadow-md transition-all duration-300 h-full flex flex-col items-center justify-center text-center">
                <div className="w-full h-12 md:h-14 flex items-center justify-center mb-3 md:mb-4">
                  <Image src="/images/logos/giz.svg" alt="GIZ logo" width={160} height={56} className="max-h-12 md:max-h-14 max-w-[140px] w-auto object-contain" />
                </div>
                <div>
                  <div className="text-sm md:text-base font-semibold text-gray-900 leading-none">GIZ</div>
                  <div className="text-[11px] md:text-sm text-gray-500 leading-snug">International Cooperation</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats Bar */}
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-purple-50/30 to-green-50/30 opacity-50"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
              <div className="group">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">$30M+</div>
                <div className="text-sm text-gray-600">Portfolio Value</div>
              </div>
              <div className="group">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                  <BarChart3 className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                <div className="text-sm text-gray-600">Projects Led</div>
              </div>
              <div className="group">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <MapPin className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-green-600 mb-2">15+</div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
              <div className="group">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                  <Star className="w-8 h-8 text-orange-600" />
                </div>
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
              <div className="text-center group">
                <div className="w-16 h-16 bg-yellow-300/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-300/30 transition-colors">
                  <Clock className="w-8 h-8 text-yellow-300" />
                </div>
                <div className="text-3xl font-bold text-yellow-300 mb-2">24h</div>
                <div className="text-blue-100 text-sm">Response Time</div>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-yellow-300/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-300/30 transition-colors">
                  <Star className="w-8 h-8 text-yellow-300" />
                </div>
                <div className="text-3xl font-bold text-yellow-300 mb-2">100%</div>
                <div className="text-blue-100 text-sm">Client Satisfaction</div>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-yellow-300/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-300/30 transition-colors">
                  <Award className="w-8 h-8 text-yellow-300" />
                </div>
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