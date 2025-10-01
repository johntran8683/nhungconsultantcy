import { 
  ClipboardCheck, 
  Users, 
  Lightbulb, 
  BarChart3,
  Target,
  Users as UsersIcon,
  Settings,
  Award,
  CheckCircle,
  Star,
  ArrowRight
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'Expertise & Approach - Nhung Nguyen',
  description: 'Comprehensive M&E and gender inclusion expertise with proven methodologies for international development organizations.',
}

export default function ExpertisePage() {
  const principles = [
    {
      icon: BarChart3,
      title: 'Analytically Grounded',
      description: 'Data-driven decision making with robust measurement frameworks',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      iconBg: 'bg-blue-100'
    },
    {
      icon: Users,
      title: 'Gender-Responsive',
      description: 'Systematic integration of gender perspectives throughout project lifecycle',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      iconBg: 'bg-purple-100'
    },
    {
      icon: UsersIcon,
      title: 'Stakeholder-Centered',
      description: 'Collaborative approach with local partners and beneficiaries',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      iconBg: 'bg-green-100'
    },
    {
      icon: Settings,
      title: 'Capacity Building',
      description: 'Empowering teams with sustainable M&E skills and systems',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      iconBg: 'bg-orange-100'
    }
  ]

  const expertiseAreas = [
    {
      icon: ClipboardCheck,
      title: 'Monitoring & Evaluation',
      description: 'Comprehensive M&E frameworks that generate measurable impact',
      skills: [
        'Designing result-based frameworks',
        'Leading data collection and validation',
        'Donor reporting and compliance',
        'Impact assessment and evaluation',
        'Theory of Change development'
      ],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      iconBg: 'bg-blue-100'
    },
    {
      icon: Users,
      title: 'Gender & Economic Inclusion',
      description: 'Advancing gender equality through data-driven approaches',
      skills: [
        'Conducting gender gap analyses',
        'Creating data-informed action plans',
        'Measuring inclusion impacts',
        'Workplace gender equality assessments',
        'Gender-responsive programming'
      ],
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      iconBg: 'bg-purple-100'
    },
    {
      icon: Lightbulb,
      title: 'Strategic Advisory & Capacity Building',
      description: 'Empowering organizations with sustainable M&E capabilities',
      skills: [
        'Advising on project design',
        'Training teams on M&E systems',
        'Mentoring staff and consultants',
        'Quality assurance and compliance',
        'Strategy development and implementation'
      ],
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      iconBg: 'bg-green-100'
    },
    {
      icon: BarChart3,
      title: 'Data Analytics & Visualization',
      description: 'Converting complex data into actionable insights',
      skills: [
        'Advanced statistical analysis',
        'Data visualization and reporting',
        'Survey design and management',
        'Impact measurement tools',
        'Performance dashboards'
      ],
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      iconBg: 'bg-orange-100'
    }
  ]

  const skills = [
    { name: 'STATA', level: 95 },
    { name: 'Microsoft Office', level: 90 },
    { name: 'Survey Design', level: 95 },
    { name: 'Data Visualization', level: 85 },
    { name: 'International Development', level: 95 },
    { name: 'Gender Equality', level: 95 },
    { name: 'Private Sector Development', level: 90 },
    { name: 'Energy Transition', level: 85 },
  ]

  const methodologySteps = [
    {
      number: 1,
      title: 'Assessment & Planning',
      description: 'Comprehensive analysis of project context, stakeholder mapping, and development of tailored M&E frameworks'
    },
    {
      number: 2,
      title: 'Framework Design',
      description: 'Creation of gender-responsive monitoring systems, data collection tools, and performance indicators'
    },
    {
      number: 3,
      title: 'Implementation Support',
      description: 'Capacity building, training delivery, and ongoing technical assistance throughout project lifecycle'
    },
    {
      number: 4,
      title: 'Analysis & Reporting',
      description: 'Data analysis, impact assessment, and comprehensive reporting with actionable recommendations'
    }
  ]

  const clients = [
    { name: 'UNOPS', description: 'Southeast Asia Energy Transition Partnership' },
    { name: 'IFC', description: 'Gender & Economic Inclusion Division' },
    { name: 'ADB', description: 'Pacific Private Sector Development Initiative' },
    { name: 'UNICEF', description: 'Impact Evaluation Projects' },
    { name: 'World Bank', description: 'Development Impact Assessments' },
    { name: 'GIZ', description: 'Monitoring & Evaluation Advisory' },
  ]

  const clientLogos: Record<string, string> = {
    'UNOPS': '/images/logos/unops.svg',
    'IFC': '/images/logos/ifc.svg',
    'ADB': '/images/logos/adb.svg',
    'UNICEF': '/images/logos/unicef.svg',
    'World Bank': '/images/logos/worldbank.svg',
    'GIZ': '/images/logos/giz.svg',
  }

  return (
    <>
      {/* Page Header */}
      <section className="min-h-[80vh] flex items-start lg:items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-4 lg:pt-6 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14 items-center">
            {/* Left Content */}
            <div className="space-y-8 order-2 lg:order-2">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                  Professional Expertise
                </div>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="text-gray-900">My Expertise &</span><br />
                  <span className="text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                    Approach
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Combining systematic monitoring and evaluation with a deep commitment to gender equality and sustainable development. 
                  My data-driven approach generates measurable impact across international development programs.
                </p>
                {/* Capability Badges */}
                <div className="flex flex-wrap gap-3 pt-2" aria-label="Key capabilities">
                  {[
                    { label: 'M&E Frameworks', color: 'bg-blue-100 text-blue-700' },
                    { label: 'Gender Inclusion', color: 'bg-purple-100 text-purple-700' },
                    { label: 'Impact Measurement', color: 'bg-emerald-100 text-emerald-700' },
                    { label: 'Capacity Building', color: 'bg-orange-100 text-orange-700' },
                  ].map((chip) => (
                    <span key={chip.label} className={`px-3 py-1 rounded-full text-sm font-medium ${chip.color}`}>{chip.label}</span>
                  ))}
                </div>
              </div>
              
              {/* Buttons will be placed in second row to the right */}
            </div>
            
            {/* Left Professional Image (on desktop) */}
            <div className="flex justify-center lg:justify-start order-1 lg:order-1">
              <div className="relative -ml-2 md:-ml-4 xl:-ml-8">
                {/* Circular portrait with gradient ring */}
                <div className="relative w-80 h-80 md:w-[26rem] md:h-[26rem] xl:w-[28rem] xl:h-[28rem]">
                  <div className="absolute inset-0 rounded-full p-[6px] bg-gradient-to-tr from-blue-600 via-purple-500 to-emerald-400">
                    <div className="w-full h-full rounded-full bg-white" />
                  </div>
                  <div className="absolute inset-[6px] rounded-full overflow-hidden shadow-2xl">
                    <Image
                      src="/images/nhung-expertise.png"
                      alt="Portrait of Nhung Nguyen"
                      width={512}
                      height={512}
                      className="w-full h-full object-cover"
                      priority
                    />
                    {/* Gloss overlay */}
                    <div className="pointer-events-none absolute -top-1/4 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row: stats left, buttons right */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 items-center">
            {/* Stats Left */}
            <div className="order-2 lg:order-1 mt-6 lg:mt-0">
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">50+</div>
                  <div className="text-sm text-gray-600">Projects Led</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Buttons Right */}
            <div className="order-1 lg:order-2 flex justify-start lg:justify-end">
              <div className="flex flex-col sm:flex-row gap-4" role="group" aria-label="Primary actions">
                <Link href="/contact" className="btn btn-primary group">
                  Start a Project 
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/portfolio" className="btn btn-secondary">
                  View My Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Approach */}
      <section className="section-padding bg-white relative">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
                My Approach
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Data-Driven <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Methodology</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                I believe in using systematic monitoring and evaluation frameworks to advance gender equality and 
                sustainable development. My approach combines data-driven methodologies with deep understanding 
                of local contexts, ensuring that programs not only measure impact but also generate meaningful change 
                for women and marginalized communities.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {principles.map((principle, index) => (
                <div key={index} className="group h-full">
                  <div className={`text-center p-8 ${principle.bgColor} rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 h-full flex flex-col`}>
                    <div className={`w-20 h-20 ${principle.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                      <principle.icon className={`h-10 w-10 ${principle.color.replace('from-', 'text-').replace(' to-', '-')}`} />
                    </div>
                    <h3 className={`text-xl font-semibold ${principle.textColor} mb-4`}>{principle.title}</h3>
                    <p className="text-gray-600 leading-relaxed flex-grow">{principle.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Expertise */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white text-gray-700 text-sm font-medium mb-6 shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Core Expertise
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Specialized <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Areas of Focus</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Deep expertise across key areas of international development, with proven track record of delivering measurable impact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {expertiseAreas.map((area, index) => (
              <div key={index} className="group h-full">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                  <div className="flex items-start mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${area.color} rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform`}>
                      <area.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{area.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{area.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 flex-grow">
                    <h4 className="font-semibold text-gray-800 mb-3">Key Capabilities:</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {area.skills.map((skill, skillIndex) => (
                        <div key={skillIndex} className="flex items-center text-gray-600 group-hover:text-gray-800 transition-colors">
                          <div className={`w-2 h-2 bg-gradient-to-r ${area.color} rounded-full mr-3 flex-shrink-0`}></div>
                          <span className="text-sm">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Experience Level</span>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-2 h-2 rounded-full ${i < 5 ? `bg-gradient-to-r ${area.color}` : 'bg-gray-200'}`}></div>
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

      {/* Skills Matrix */}
      <section className="section-padding bg-white relative">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
              Technical Skills
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Skills & <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Tools</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced proficiency in data analysis, M&E frameworks, and development tools that support data-driven decision making.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Technical Skills */}
              <div className="group h-full">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl border border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <BarChart3 className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Technical Skills</h3>
                  </div>
                  <div className="space-y-6 flex-grow">
                    {skills.slice(0, 4).map((skill, index) => (
                      <div key={index} className="group/skill">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-gray-700 group-hover/skill:text-gray-900 transition-colors">{skill.name}</span>
                          <span className="text-sm font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000 ease-out group-hover/skill:shadow-lg"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Industry Knowledge */}
              <div className="group h-full">
                <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-8 rounded-2xl border border-purple-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Industry Knowledge</h3>
                  </div>
                  <div className="space-y-6 flex-grow">
                    {skills.slice(4).map((skill, index) => (
                      <div key={index} className="group/skill">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-gray-700 group-hover/skill:text-gray-900 transition-colors">{skill.name}</span>
                          <span className="text-sm font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out group-hover/skill:shadow-lg"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="group h-full">
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl border border-green-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Languages</h3>
                  </div>
                  <div className="space-y-4 flex-grow">
                    <div className="text-center p-4 bg-white rounded-xl">
                      <div className="text-2xl font-bold text-green-600 mb-2">English</div>
                      <div className="text-sm text-gray-600 mb-2">Advanced</div>
                      <div className="text-xs text-gray-500">IELTS: 8.0/9.0</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl">
                      <div className="text-2xl font-bold text-green-600 mb-2">Vietnamese</div>
                      <div className="text-sm text-gray-600">Native</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional Capabilities */}
            <div className="mt-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Additional Capabilities</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Project Management', 'Stakeholder Engagement', 'Report Writing', 'Training Delivery', 'Quality Assurance', 'Strategic Planning', 'Data Visualization', 'Impact Assessment'].map((capability, index) => (
                  <div key={index} className="text-center p-4 bg-white rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100">
                    <div className="text-sm font-medium text-gray-700">{capability}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
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
              My Process
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Proven <span className="text-yellow-300">Methodology</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              A systematic approach that ensures every project delivers measurable impact and sustainable change.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {methodologySteps.map((step, index) => (
              <div key={index} className="group text-center">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    {step.number}
                  </div>
                  {index < methodologySteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-yellow-400 to-transparent transform translate-x-4"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-yellow-300 transition-colors">{step.title}</h3>
                <p className="text-blue-100 leading-relaxed group-hover:text-white transition-colors">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Clients */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white text-gray-700 text-sm font-medium mb-6 shadow-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Trusted Partners
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Selected <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Clients & Partners</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Partnering with leading international organizations to advance sustainable development and gender equality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clients.map((client, index) => (
              <div key={index} className="group">
                <div className="text-center p-8 bg-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                  <div className="mx-auto mb-6 w-40 h-16 flex items-center justify-center">
                    <Image
                      src={clientLogos[client.name] || '/images/logos/placeholder.svg'}
                      alt={`${client.name} logo`}
                      width={200}
                      height={80}
                      className="max-h-16 w-auto object-contain transition duration-300"
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{client.name}</h4>
                  <p className="text-gray-600 leading-relaxed">{client.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              <a href="/contact" className="group bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg">
                Start a Conversation
              </a>
              <a href="/portfolio" className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 hover:scale-105 transition-all duration-300">
                View My Work
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