import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Predefined project templates
const PROJECT_TEMPLATES = [
  {
    id: 'blue-energy',
    name: 'Energy & Infrastructure',
    icon: 'Building',
    gradient: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    iconBg: 'bg-blue-100',
    description: 'Energy, infrastructure, and development projects'
  },
  {
    id: 'purple-innovation',
    name: 'Innovation & Technology', 
    icon: 'TrendingUp',
    gradient: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    iconBg: 'bg-purple-100',
    description: 'Tech, innovation, and research projects'
  },
  {
    id: 'green-sustainability',
    name: 'Sustainability & Environment',
    icon: 'Globe',
    gradient: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    iconBg: 'bg-green-100',
    description: 'Environmental and sustainability initiatives'
  },
  {
    id: 'orange-social',
    name: 'Social Impact & Community',
    icon: 'GraduationCap',
    gradient: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    iconBg: 'bg-orange-100',
    description: 'Social impact and community development'
  },
  {
    id: 'teal-evaluation',
    name: 'Research & Evaluation',
    icon: 'BarChart3',
    gradient: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-700',
    iconBg: 'bg-teal-100',
    description: 'Research, evaluation, and assessment projects'
  },
  {
    id: 'indigo-gender',
    name: 'Gender & Inclusion',
    icon: 'Users',
    gradient: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    iconBg: 'bg-indigo-100',
    description: 'Gender equality and inclusion initiatives'
  }
]

export async function GET() {
  try {
    // Get published projects ordered by sortOrder
    const projects = await prisma.project.findMany({ 
      where: { published: true },
      orderBy: { sortOrder: 'asc' }
    })

    // Transform projects to include template data
    const projectsWithTemplates = projects.map(project => {
      const template = PROJECT_TEMPLATES.find(t => t.id === project.templateId) || PROJECT_TEMPLATES[0]
      
      return {
        id: project.id,
        title: project.title,
        client: project.client,
        duration: project.duration,
        challenge: project.overview, // Map overview to challenge for frontend compatibility
        role: project.role,
        impact: project.impact,
        color: template.gradient,
        bgColor: template.bgColor,
        textColor: template.textColor,
        iconBg: template.iconBg,
        icon: template.icon,
        stats: { 
          value: project.statsValue, 
          label: project.statsLabel 
        },
        status: project.status,
        progress: project.status === 'ongoing' ? project.progress : 100
      }
    })

    return NextResponse.json({ projects: projectsWithTemplates })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}
