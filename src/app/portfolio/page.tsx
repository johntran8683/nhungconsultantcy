'use client'

import { useState, useEffect } from 'react'
import { 
  Building, 
  TrendingUp, 
  Globe, 
  GraduationCap,
  FileText,
  BarChart3,
  Users,
  Book,
  Shield
} from 'lucide-react'

// Icon mapping for dynamic icons
const iconMap = {
  Building,
  TrendingUp,
  Globe,
  GraduationCap,
  FileText,
  BarChart3,
  Users,
  Book,
  Shield
}

interface Project {
  id: string
  title: string
  client: string
  duration: string
  challenge: string
  role: string[]
  impact: string[]
  color: string
  bgColor: string
  textColor: string
  iconBg: string
  icon: string
  stats: { value: string; label: string }
  status: string
  progress: number
}

export default function PortfolioPage() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/portfolio/projects')
        const data = await response.json()
        setFeaturedProjects(data.projects || [])
      } catch (error) {
        console.error('Error fetching projects:', error)
        // Fallback to empty array if API fails
        setFeaturedProjects([])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const publications = [
    {
      icon: FileText,
      type: 'Institutional Report',
      downloads: '5,500+ downloads',
      title: 'A Retrospective of IFC\'s Implementation of the World Bank Group Gender Strategy',
      description: 'Lead author for context section and all results, data visualization and case studies. Widely used for the World Bank Group strategy development.',
      impact: 'Adopted as standard guidance for IFC upstream operations',
      featured: true
    },
    {
      icon: BarChart3,
      type: 'Impact Assessment',
      downloads: '600+ downloads',
      title: 'Tackling Childcare: The Business Case for Employer-Supported Childcare in Fiji',
      description: 'Lead author of the report and data analysis. Report drove policy and practice changes across 15 large firms in Fiji.',
      featured: false
    },
    {
      icon: Users,
      type: 'Impact Assessment',
      downloads: '800+ downloads',
      title: 'Waka Mere Commitment to Action: Improving Business Outcomes in Solomon Islands',
      description: 'Lead author of the report and data analysis. Report contributed to IFC Corporate Award Fy19 for Waka Mere Commitment to Action Project.',
      featured: false
    },
    {
      icon: Book,
      type: 'Peer-Reviewed Research',
      citations: '152 citations',
      title: 'Determinants of Financing Pattern and Access to Formal-Informal Credit: The Case of Small and Medium-Sized Enterprises in Viet Nam',
      description: 'Published in Journal of Management Research. Comprehensive analysis of SME financing patterns in Vietnam.',
      featured: false
    },
    {
      icon: Book,
      type: 'Peer-Reviewed Research',
      citations: '54 citations',
      title: 'An empirical Analysis of Credit Accessibility of Small and Medium Sized Enterprises in Vietnam',
      description: 'Published in Banks and Bank Systems. Analysis of credit accessibility challenges for Vietnamese SMEs.',
      featured: false
    },
    {
      icon: Shield,
      type: 'Impact Assessment',
      downloads: '500+ downloads',
      title: 'The Impact of Domestic and Sexual Violence on the Workplace in Solomon Islands',
      description: 'Led data analysis and report visualization. Comprehensive assessment of workplace impacts of gender-based violence.',
      featured: false
    }
  ]

  const impactMetrics = [
    { number: '100+', label: 'Projects Managed' },
    { number: '15+', label: 'Countries Reached' },
    { number: '200+', label: 'Publications Cited' },
    { number: '100%', label: 'Client Satisfaction' }
  ]

  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left column: keep existing content as-is (centered copy) */}
            <div>
              <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Portfolio & Impact
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
              <span className="text-gray-900">Work &</span><br />
              <span className="text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Impact
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12">
              Featured projects, case studies, and publications showcasing measurable impact in international development and gender inclusion. 
              Each engagement demonstrates data-driven approaches that generate sustainable change.
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
                <div className="text-sm text-gray-600">Projects Managed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
                <div className="text-sm text-gray-600">Countries Reached</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">200+</div>
                <div className="text-sm text-gray-600">Publications Cited</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
                <div className="text-sm text-gray-600">Client Satisfaction</div>
              </div>
            </div>
              </div>
            </div>

            {/* Right column: editorial framed image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-72 sm:w-80 md:w-96 aspect-[4/5] bg-white rounded-[20px] border border-gray-200 shadow-2xl overflow-hidden motion-safe:transition-transform motion-safe:duration-300 motion-safe:will-change-transform hover:-translate-y-1">
                <div className="absolute inset-0">
                  {/* decorative inner frame */}
                  <div className="absolute inset-0 m-3 rounded-[16px] bg-gray-50"></div>
                </div>
                <div className="absolute inset-0 m-3 rounded-[16px] overflow-hidden">
                  <img
                    src="/images/nhung-workexperience.jpg"
                    alt="Nhung Nguyen presenting portfolio work highlights"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  {/* soft gloss */}
                  <div className="pointer-events-none absolute -top-1/3 left-0 right-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent" />
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Engagements */}
      <section className="section-padding bg-white relative">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
              Featured Projects
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Engagements</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key projects that demonstrate measurable impact and data-driven approaches to international development and gender inclusion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {loading ? (
              // Loading skeleton
              <>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="group h-full">
                    <div className="bg-white rounded-3xl border border-gray-200 h-full flex flex-col overflow-hidden animate-pulse">
                      <div className="bg-gray-300 h-48"></div>
                      <div className="p-8 space-y-4">
                        <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                        <div className="bg-gray-300 h-4 rounded w-1/2"></div>
                        <div className="bg-gray-300 h-20 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : featuredProjects.length === 0 ? (
              // Empty state
              <div className="col-span-2 text-center py-16">
                <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Projects Available</h3>
                <p className="text-gray-500">Featured projects will appear here once they are published.</p>
              </div>
            ) : (
              featuredProjects.map((project, index) => {
                const IconComponent = iconMap[project.icon as keyof typeof iconMap] || Building
                return (
                  <div key={project.id || index} className="group h-full">
                <div className={`bg-white rounded-3xl border border-gray-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 h-full flex flex-col overflow-hidden`}>
                  
                  {/* Enhanced Header with Gradient */}
                  <div className={`bg-gradient-to-br ${project.color} p-8 text-white relative overflow-hidden`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 right-4 w-20 h-20 bg-white rounded-full"></div>
                      <div className="absolute bottom-4 left-4 w-16 h-16 bg-white rounded-full"></div>
                    </div>
                    
                    <div className="relative z-10">
                      {/* Client & Duration */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-white/90 text-sm font-medium">{project.client}</p>
                            <p className="text-white/70 text-xs">{project.duration}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-white mb-1">{project.stats.value}</div>
                          <div className="text-white/80 text-xs">{project.stats.label}</div>
                        </div>
                      </div>
                      
                      {/* Project Title */}
                      <h3 className="text-2xl font-bold text-white mb-3 leading-tight">{project.title}</h3>
                    </div>
                  </div>
                  
                  {/* Project Description Section */}
                  <div className="px-8 py-6 bg-gray-50 border-b border-gray-100">
                    <div className="flex items-start">
                      <div className={`w-8 h-8 bg-gradient-to-br ${project.color} rounded-lg flex items-center justify-center mr-4 flex-shrink-0`}>
                        <BarChart3 className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Project Overview</h4>
                        <p className="text-gray-600 leading-relaxed text-sm">{project.challenge}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Content */}
                  <div className="p-8 flex-grow">
                    <div className="space-y-6">
                      {/* My Role Section */}
                      <div>
                        <div className="flex items-center mb-4">
                          <div className={`w-8 h-8 bg-gradient-to-br ${project.color} rounded-lg flex items-center justify-center mr-3`}>
                            <Users className="h-4 w-4 text-white" />
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900">My Role & Actions</h4>
                        </div>
                        <div className="space-y-3">
                          {project.role.map((item, roleIndex) => (
                            <div key={roleIndex} className="flex items-start">
                              <div className={`w-1.5 h-1.5 bg-gradient-to-r ${project.color} rounded-full mr-3 mt-2 flex-shrink-0`}></div>
                              <span className="text-sm text-gray-600 leading-relaxed">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Impact Section */}
                      <div>
                        <div className="flex items-center mb-4">
                          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                            <TrendingUp className="h-4 w-4 text-white" />
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900">Key Impact</h4>
                        </div>
                        <div className="space-y-3">
                          {project.impact.map((item, impactIndex) => (
                            <div key={impactIndex} className="flex items-start">
                              <div className="w-1.5 h-1.5 bg-gradient-to-r from-green-500 to-green-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-600 leading-relaxed">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Footer */}
                  <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${project.status === 'ongoing' ? 'bg-green-500 animate-pulse' : 'bg-blue-500'}`}></div>
                        <span className="text-sm font-medium text-gray-700">
                          {project.status === 'ongoing' ? 'Active Project' : 'Completed Project'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-xs text-gray-500">M&E Focus</span>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-2">
                        <span>Project Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className={`bg-gradient-to-r ${project.color} h-2 rounded-full transition-all duration-1000`} style={{width: `${project.progress}%`}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                )
              })
            )}
          </div>
        </div>
      </section>

      {/* Publications & Reports */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white text-gray-700 text-sm font-medium mb-6 shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Research & Publications
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Publications & <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Reports</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Influential research and reports that have shaped policy and practice in international development and gender inclusion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publications.map((publication, index) => (
              <div key={index} className="group h-full">
                <div className={`bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${publication.featured ? 'border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100' : ''} h-full flex flex-col`}>
                  {/* Publication Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 ${publication.featured ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-gray-500 to-gray-600'} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform`}>
                        <publication.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <span className={`text-xs font-semibold ${publication.featured ? 'text-blue-700 bg-blue-200' : 'text-gray-700 bg-gray-200'} px-3 py-1 rounded-full`}>
                          {publication.type}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{publication.downloads || publication.citations}</p>
                      </div>
                    </div>
                    {publication.featured && (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-xs font-medium text-yellow-700">Featured</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Publication Content */}
                  <div className="space-y-4 flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-800 transition-colors leading-tight">
                      {publication.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {publication.description}
                    </p>
                    
                    {publication.impact && (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                        <div className="flex items-start">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <p className="text-green-800 text-sm font-medium">{publication.impact}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Publication Footer */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Impact Level</span>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-2 h-2 rounded-full ${i < (publication.featured ? 5 : 3) ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gray-200'}`}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="section-padding bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full mix-blend-overlay filter blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full mix-blend-overlay filter blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white rounded-full mix-blend-overlay filter blur-xl"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
              Measurable Impact
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Overall <span className="text-yellow-300">Impact</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Quantifiable results that demonstrate the effectiveness of data-driven approaches to international development.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {impactMetrics.map((metric, index) => (
              <div key={index} className="group text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 border border-white/20">
                  <div className="text-4xl font-bold text-yellow-300 mb-2 group-hover:scale-110 transition-transform">{metric.number}</div>
                  <div className="text-blue-100 font-medium group-hover:text-white transition-colors">{metric.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Ready to Partner?
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Let&apos;s Create <span className="text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">Impact Together</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Enhance your development programs with proven methodologies and data-driven approaches that deliver measurable results and sustainable change.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <a href="/contact" className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all duration-300 shadow-lg">
                Start a Project
              </a>
              <a href="/expertise" className="group bg-transparent border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-600 hover:text-white hover:scale-105 transition-all duration-300">
                Learn More
              </a>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">24h</div>
                <div className="text-sm text-gray-600">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
                <div className="text-sm text-gray-600">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}