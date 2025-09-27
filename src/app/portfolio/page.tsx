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

export const metadata = {
  title: 'Work & Impact - Nhung Nguyen',
  description: 'Featured projects, case studies, and publications showcasing measurable impact in international development and gender inclusion.',
}

export default function PortfolioPage() {
  const featuredProjects = [
    {
      icon: Building,
      title: 'Southeast Asia Energy Transition Partnership',
      client: 'UNOPS',
      duration: 'July 2024 - Present',
      challenge: 'Lead M&E activities for 50+ energy transition programs across Southeast Asia with $30M+ in funding, ensuring gender-responsive monitoring and data-driven programming.',
      role: [
        'Designed and implemented gender-responsive monitoring frameworks',
        'Led data collection and validation of 50 result-based monitoring frameworks quarterly',
        'Collaborated with multiple stakeholders to strengthen data-driven programming',
        'Produced annual/semiannual reports and data visualization for 12 funders'
      ],
      impact: [
        '100% compliance with donor reporting requirements',
        'Enhanced gender integration across all 50+ programs',
        'Improved data quality and data-driven decision making',
        'Strengthened stakeholder engagement and collaboration'
      ],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      iconBg: 'bg-blue-100',
      stats: { value: '$30M+', label: 'Portfolio Value' }
    },
    {
      icon: TrendingUp,
      title: 'Pacific Private Sector Development Initiative',
      client: 'Asian Development Bank',
      duration: 'August 2024 - Present',
      challenge: 'Lead multiple evaluations of women&apos;s economic empowerment initiatives across 14 Pacific countries for an 18-year, $88M technical assistance program.',
      role: [
        'Developed comprehensive evaluation tools and methodologies',
        'Collected and analyzed data from multiple Pacific countries',
        'Drafted detailed case studies and evaluation reports',
        'Presented findings and recommendations to senior management'
      ],
      impact: [
        'Informed strategic decisions for PSDI Phase V development',
        'Enhanced understanding of women&apos;s economic empowerment impacts',
        'Strengthened evidence base for future programming',
        'Improved program effectiveness across 14 countries'
      ],
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      iconBg: 'bg-purple-100',
      stats: { value: '$88M', label: 'Program Value' }
    },
    {
      icon: Globe,
      title: 'IFC Gender Strategy Implementation',
      client: 'International Finance Corporation',
      duration: 'July 2018 - June 2024',
      challenge: 'Ensure 100% quality compliance with World Bank Group standards across 100-120 gender-flagged advisory projects annually, spanning multiple industries and regions.',
      role: [
        'Advised operational teams on project design and M&E frameworks',
        'Conducted quality assurance reviews of project governance documents',
        'Delivered capacity building training for clients and staff',
        'Managed global data collection platform serving 100+ surveys'
      ],
      impact: [
        '100% quality compliance rate maintained consistently',
        'Enhanced project governance across 30+ gender advisory programs',
        'Improved client satisfaction and program effectiveness',
        'Strengthened IFC&apos;s gender inclusion capabilities globally'
      ],
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      iconBg: 'bg-green-100',
      stats: { value: '100%', label: 'Compliance Rate' }
    },
    {
      icon: GraduationCap,
      title: 'Vietnam Development Impact Evaluations',
      client: 'Mekong Development Research Institute',
      duration: 'April 2014 - May 2018',
      challenge: 'Lead 6-9 donor-funded impact evaluation projects annually on diverse development topics including poverty reduction, education, agriculture, and gender.',
      role: [
        'Managed 20+ large-scale surveys with sample sizes up to 30,000',
        'Developed technical and financial proposals for competitive bidding',
        'Led impact evaluation projects with budgets up to $2.5M',
        'Managed partnerships with donors, NGOs, and government agencies'
      ],
      impact: [
        'Won 8-10 new projects annually worth over $2M total',
        'Achieved excellent performance ratings from all clients',
        'Enhanced evidence base for development policy in Vietnam',
        'Strengthened local research capacity and partnerships'
      ],
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      iconBg: 'bg-orange-100',
      stats: { value: '30K+', label: 'Survey Sample' }
    }
  ]

  const publications = [
    {
      icon: FileText,
      type: 'Institutional Report',
      downloads: '5,500+ downloads',
      title: 'A Retrospective of IFC&apos;s Implementation of the World Bank Group Gender Strategy',
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
            {featuredProjects.map((project, index) => (
              <div key={index} className="group">
                <div className={`bg-gradient-to-br ${project.bgColor} rounded-2xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}>
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center">
                      <div className={`w-16 h-16 bg-gradient-to-br ${project.color} rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform shadow-lg`}>
                        <project.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">{project.title}</h3>
                        <p className={`font-semibold text-sm ${project.textColor}`}>{project.client}</p>
                        <p className="text-gray-500 text-sm">{project.duration}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${project.textColor} mb-1`}>{project.stats.value}</div>
                      <div className="text-xs text-gray-500">{project.stats.label}</div>
                    </div>
                  </div>
                  
                  {/* Project Content */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <div className={`w-2 h-2 bg-gradient-to-r ${project.color} rounded-full mr-3`}></div>
                        The Challenge
                      </h4>
                      <p className="text-gray-600 leading-relaxed">{project.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <div className={`w-2 h-2 bg-gradient-to-r ${project.color} rounded-full mr-3`}></div>
                        My Role & Action
                      </h4>
                      <ul className="space-y-3">
                        {project.role.map((item, roleIndex) => (
                          <li key={roleIndex} className="flex items-start text-gray-600 group-hover:text-gray-800 transition-colors">
                            <div className={`w-2 h-2 bg-gradient-to-r ${project.color} rounded-full mr-3 mt-2 flex-shrink-0`}></div>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <div className={`w-2 h-2 bg-gradient-to-r ${project.color} rounded-full mr-3`}></div>
                        The Impact
                      </h4>
                      <ul className="space-y-3">
                        {project.impact.map((item, impactIndex) => (
                          <li key={impactIndex} className="flex items-start text-gray-600 group-hover:text-gray-800 transition-colors">
                            <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Project Footer */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Project Status</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-700">Active/Completed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
              <div key={index} className="group">
                <div className={`bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${publication.featured ? 'border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100' : ''}`}>
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
                  <div className="space-y-4">
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