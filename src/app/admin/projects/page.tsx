'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import UserMenu from '@/components/UserMenu'
import { 
  Briefcase, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Save,
  X,
  CheckCircle,
  Clock,
  Search,
  Filter,
  MoreVertical,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Building2,
  BarChart3,
  TrendingUp,
  Globe,
  GraduationCap,
  Users,
  FileText
} from 'lucide-react'

// Project templates
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

// Icon mapping for dynamic icons
const iconMap = {
  Building: Building2,
  TrendingUp,
  Globe,
  GraduationCap,
  BarChart3,
  Users,
  FileText
}

interface Project {
  id: string
  title: string
  client: string
  duration: string
  overview: string
  role: string[]
  impact: string[]
  templateId: string
  statsValue: string
  statsLabel: string
  status: string
  progress: number | null
  sortOrder: number
  published: boolean
  createdAt: string
  updatedAt: string
}

export default function ProjectsAdmin() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Compact Header */}
      <div className="bg-white/5 backdrop-blur-md border-b border-white/10 pt-[60px]">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">Project Portfolio Management</h1>
                <p className="text-xs text-purple-200">
                  <Link href="/admin" className="hover:text-purple-100">Dashboard</Link>
                  <span className="mx-2">•</span>
                  <span>Featured Projects & Case Studies</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/admin" className="hidden sm:inline-flex items-center gap-2 text-xs text-purple-200 hover:text-white transition-colors">
                ← Back to Dashboard
              </Link>
              <UserMenu email="admin@example.com" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-8">
          <ProjectsSection />
        </div>
      </div>
    </div>
  )
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-purple-200">{subtitle}</p>
    </div>
  )
}

function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [sort, setSort] = useState<'newest' | 'oldest' | 'title'>('newest')
  const [showForm, setShowForm] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [viewingProject, setViewingProject] = useState<Project | null>(null)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    duration: '',
    overview: '',
    role: [''],
    impact: [''],
    templateId: 'blue-energy',
    statsValue: '',
    statsLabel: '',
    status: 'ongoing',
    progress: 0,
    sortOrder: 0
  })

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const refresh = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/admin/projects', { cache: 'no-store' })
      if (!res.ok) throw new Error('Failed to load projects')
      const data = await res.json()
      setProjects(data.items || [])
    } catch (e: any) {
      setError(e?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refresh() }, [])

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown) {
        const target = event.target as Element
        // Check if click is outside any dropdown container
        if (!target.closest('[data-dropdown-container]')) {
          closeDropdown()
        }
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && activeDropdown) {
        closeDropdown()
      }
    }

    if (activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [activeDropdown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingProject ? '/api/admin/projects' : '/api/admin/projects'
      const method = editingProject ? 'PUT' : 'POST'
      
      const payload = {
        ...formData,
        ...(editingProject && { id: editingProject.id })
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        await refresh()
        setShowForm(false)
        setEditingProject(null)
        resetForm()
      }
    } catch (error) {
      console.error('Error saving project:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const response = await fetch(`/api/admin/projects?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        await refresh()
      }
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  const handleTogglePublished = async (project: Project, event?: React.MouseEvent) => {
    event?.stopPropagation()
    try {
      const response = await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...project,
          published: !project.published
        })
      })

      if (response.ok) {
        await refresh()
        setTimeout(() => closeDropdown(), 100) // Small delay to ensure action completes first
      }
    } catch (error) {
      console.error('Error toggling published status:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      client: '',
      duration: '',
      overview: '',
      role: [''],
      impact: [''],
      templateId: 'blue-energy',
      statsValue: '',
      statsLabel: '',
      status: 'ongoing',
      progress: 0,
      sortOrder: 0
    })
  }

  const toggleDropdown = (projectId: string) => {
    setActiveDropdown(activeDropdown === projectId ? null : projectId)
  }

  const closeDropdown = () => {
    setActiveDropdown(null)
  }

  const startView = (project: Project, event?: React.MouseEvent) => {
    event?.stopPropagation()
    setViewingProject(project)
    setShowViewModal(true)
    setTimeout(() => closeDropdown(), 100) // Small delay to ensure modal opens first
  }

  const startEdit = (project: Project, event?: React.MouseEvent) => {
    event?.stopPropagation()
    setEditingProject(project)
    setFormData({
      title: project.title,
      client: project.client,
      duration: project.duration,
      overview: project.overview,
      role: project.role.length > 0 ? project.role : [''],
      impact: project.impact.length > 0 ? project.impact : [''],
      templateId: project.templateId,
      statsValue: project.statsValue,
      statsLabel: project.statsLabel,
      status: project.status,
      progress: project.progress || 0,
      sortOrder: project.sortOrder
    })
    setShowForm(true)
    setTimeout(() => closeDropdown(), 100) // Small delay to ensure modal opens first
  }

  const addRoleItem = () => {
    setFormData(prev => ({ ...prev, role: [...prev.role, ''] }))
  }

  const removeRoleItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      role: prev.role.filter((_, i) => i !== index)
    }))
  }

  const updateRoleItem = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      role: prev.role.map((item, i) => i === index ? value : item)
    }))
  }

  const addImpactItem = () => {
    setFormData(prev => ({ ...prev, impact: [...prev.impact, ''] }))
  }

  const removeImpactItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      impact: prev.impact.filter((_, i) => i !== index)
    }))
  }

  const updateImpactItem = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      impact: prev.impact.map((item, i) => i === index ? value : item)
    }))
  }

  const normalized = (v: string) => (v || '').toLowerCase().trim()
  const filtered = useMemo(() => {
    const q = normalized(search)
    let list = [...projects]
    
    // Filter by publication status
    if (statusFilter === 'published') list = list.filter(p => p.published)
    if (statusFilter === 'draft') list = list.filter(p => !p.published)
    
    // Search filter
    if (q) {
      list = list.filter(p => 
        [p.title, p.client, p.overview, p.statsValue, p.statsLabel].some(f => 
          normalized(f).includes(q)
        )
      )
    }
    
    // Sort
    list.sort((a, b) => {
      if (sort === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      if (sort === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      if (sort === 'title') return a.title.localeCompare(b.title)
      return 0
    })
    
    return list
  }, [projects, search, statusFilter, sort])

  // Pagination calculations
  const total = projects.length
  const totalFiltered = filtered.length
  const totalPages = Math.ceil(totalFiltered / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedItems = filtered.slice(startIndex, endIndex)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [search, statusFilter, sort])

  const publishedCount = projects.filter(p => p.published).length
  const draftCount = projects.filter(p => !p.published).length
  const ongoingCount = projects.filter(p => p.status === 'ongoing').length
  const completedCount = projects.filter(p => p.status === 'completed').length

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-white text-xl">Loading projects...</div>
      </div>
    )
  }

  return (
    <div>
      <SectionHeader 
        title="Projects" 
        subtitle="Manage your featured projects and case studies with customizable templates." 
      />
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Projects</p>
              <p className="text-3xl font-bold text-blue-900">{total}</p>
              {totalFiltered !== total && (
                <p className="text-xs text-blue-600 mt-1">{totalFiltered} filtered</p>
              )}
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Published</p>
              <p className="text-3xl font-bold text-green-900">{publishedCount}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">Draft</p>
              <p className="text-3xl font-bold text-orange-900">{draftCount}</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Ongoing</p>
              <p className="text-3xl font-bold text-purple-900">{ongoingCount}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/10 rounded-2xl p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-300" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, client, overview, or stats..."
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white placeholder-purple-300"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-300" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="pl-10 pr-8 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none text-white"
              >
                <option value="all">All Projects</option>
                <option value="published">Published Only</option>
                <option value="draft">Draft Only</option>
              </select>
            </div>
            
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title A-Z</option>
            </select>
            
            <button 
              onClick={refresh}
              className="flex items-center gap-2 px-4 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-white"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Project</span>
            </button>
          </div>
        </div>
        
        {loading && (
          <div className="mt-4 flex items-center gap-2 text-purple-600">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span className="text-sm">Loading projects...</span>
          </div>
        )}
        
        {error && (
          <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <span className="text-sm">{error}</span>
          </div>
        )}
      </div>

      {/* Projects Table */}
      <div className="bg-white/10 rounded-2xl border border-white/20 shadow-sm overflow-hidden">
        {totalFiltered === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-purple-300" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No projects found</h3>
            <p className="text-purple-200">Try adjusting your search or filter criteria, or create your first project.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-white/10 border-b border-white/20">
                  <tr>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-purple-200 uppercase tracking-wider">Actions</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Project</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Client</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Template</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Stats</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Created</th>
                  </tr>
                </thead>
                <tbody className="bg-white/5 divide-y divide-white/10">
                  {paginatedItems.map((project, idx) => {
                    const template = PROJECT_TEMPLATES.find(t => t.id === project.templateId) || PROJECT_TEMPLATES[0]
                    const IconComponent = iconMap[template.icon as keyof typeof iconMap] || Building2
                    
                    return (
                      <tr key={project.id} className={`hover:bg-white/15 transition-colors ${idx % 2 === 0 ? 'bg-white/5' : 'bg-white/8'}`}>
                        {/* Actions Column - First */}
                        <td className="px-6 py-4 text-center">
                          <div className="relative" data-dropdown-container>
                            <button
                              onClick={() => toggleDropdown(project.id)}
                              className="flex items-center justify-center w-10 h-10 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 hover:scale-105 mx-auto"
                              title="Project Actions"
                            >
                              <MoreVertical className="w-5 h-5" />
                            </button>
                            
                            {/* Dropdown Menu */}
                            {activeDropdown === project.id && (
                              <div 
                                className="absolute left-0 top-12 z-50 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="py-2">
                                  <button
                                    onClick={(e) => startView(project, e)}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                  >
                                    <Eye className="w-4 h-4" />
                                    <span>View Details</span>
                                  </button>
                                  <button
                                    onClick={(e) => startEdit(project, e)}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                                  >
                                    <Edit className="w-4 h-4" />
                                    <span>Edit Project</span>
                                  </button>
                                  <div className="border-t border-gray-100 my-1"></div>
                                  <button
                                    onClick={(e) => handleTogglePublished(project, e)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                                      project.published 
                                        ? 'text-orange-600 hover:bg-orange-50 hover:text-orange-700' 
                                        : 'text-green-600 hover:bg-green-50 hover:text-green-700'
                                    }`}
                                  >
                                    {project.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    <span>{project.published ? 'Unpublish' : 'Publish'}</span>
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                        
                        {/* Project Column - Second */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 bg-gradient-to-br ${template.gradient} rounded-xl flex items-center justify-center`}>
                              <IconComponent className="w-5 h-5 text-white" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="font-semibold text-white truncate">{project.title}</div>
                              <div className="text-sm text-purple-200 truncate">{project.duration}</div>
                              <div className="text-xs text-purple-300 flex items-center gap-1 mt-1">
                                <Calendar className="w-3 h-3" />
                                Order #{project.sortOrder}
                              </div>
                            </div>
                          </div>
                        </td>
                        
                        {/* Client Column - Third */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-purple-300" />
                            <span className="text-white">{project.client}</span>
                          </div>
                        </td>
                        
                        {/* Template Column - Fourth */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 bg-gradient-to-br ${template.gradient} rounded-full`}></div>
                            <span className="text-white text-sm">{template.name}</span>
                          </div>
                        </td>
                        
                        {/* Status Column - Fifth */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                              project.published 
                                ? 'bg-green-100 text-green-800 border border-green-200' 
                                : 'bg-orange-100 text-orange-800 border border-orange-200'
                            }`}>
                              {project.published ? (
                                <>
                                  <CheckCircle className="w-3 h-3" />
                                  Published
                                </>
                              ) : (
                                <>
                                  <Clock className="w-3 h-3" />
                                  Draft
                                </>
                              )}
                            </span>
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                              project.status === 'ongoing'
                                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                : 'bg-gray-100 text-gray-800 border border-gray-200'
                            }`}>
                              {project.status === 'ongoing' ? (
                                <>
                                  <TrendingUp className="w-3 h-3" />
                                  Ongoing ({project.progress}%)
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="w-3 h-3" />
                                  Completed
                                </>
                              )}
                            </span>
                          </div>
                        </td>
                        
                        {/* Stats Column - Sixth */}
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="font-semibold text-white">{project.statsValue}</div>
                            <div className="text-purple-200 text-xs">{project.statsLabel}</div>
                          </div>
                        </td>
                        
                        {/* Created Column - Seventh */}
                        <td className="px-6 py-4">
                          <div className="text-sm text-white">
                            {new Date(project.createdAt).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-purple-300">
                            {new Date(project.createdAt).toLocaleTimeString()}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white/10 px-6 py-4 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-purple-200">
                    Showing {startIndex + 1} to {Math.min(endIndex, totalFiltered)} of {totalFiltered} projects
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="flex items-center gap-1 px-3 py-2 text-sm text-purple-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                              currentPage === pageNum
                                ? 'bg-purple-600 text-white'
                                : 'text-purple-200 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-1 px-3 py-2 text-sm text-purple-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" role="dialog" aria-modal="true">
          <div className="w-full max-w-4xl max-h-[95vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 px-8 py-6 text-white">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-blue-600/90 to-purple-600/90"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-1">
                      {editingProject ? 'Edit Project' : 'Create New Project'}
                    </h2>
                    <p className="text-purple-100 text-sm">Manage your featured project details</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowForm(false)
                    setEditingProject(null)
                    resetForm()
                  }}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 border border-white/30"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(95vh-200px)] bg-gray-50/30 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter project title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
                    <input
                      type="text"
                      value={formData.client}
                      onChange={(e) => setFormData(prev => ({ ...prev, client: e.target.value }))}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter client name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., July 2024 - Present"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Overview</label>
                  <textarea
                    value={formData.overview}
                    onChange={(e) => setFormData(prev => ({ ...prev, overview: e.target.value }))}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Describe the project challenge and context"
                    rows={3}
                    required
                  />
                </div>

                {/* Template Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Project Template</label>
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {PROJECT_TEMPLATES.map((template) => (
                      <div
                        key={template.id}
                        onClick={() => setFormData(prev => ({ ...prev, templateId: template.id }))}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.templateId === template.id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-8 h-8 bg-gradient-to-br ${template.gradient} rounded-lg mb-2`}></div>
                        <h4 className="font-medium text-gray-900 text-sm">{template.name}</h4>
                        <p className="text-xs text-gray-600 mt-1">{template.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Role Items */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">My Role & Actions</label>
                  {formData.role.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateRoleItem(index, e.target.value)}
                        className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter role item"
                      />
                      <button
                        type="button"
                        onClick={() => removeRoleItem(index)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addRoleItem}
                    className="text-purple-600 hover:text-purple-700 text-sm flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Role Item
                  </button>
                </div>

                {/* Impact Items */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Key Impact</label>
                  {formData.impact.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateImpactItem(index, e.target.value)}
                        className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter impact item"
                      />
                      <button
                        type="button"
                        onClick={() => removeImpactItem(index)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addImpactItem}
                    className="text-purple-600 hover:text-purple-700 text-sm flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Impact Item
                  </button>
                </div>

                {/* Stats and Status */}
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stats Value</label>
                    <input
                      type="text"
                      value={formData.statsValue}
                      onChange={(e) => setFormData(prev => ({ ...prev, statsValue: e.target.value }))}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g., $30M+"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stats Label</label>
                    <input
                      type="text"
                      value={formData.statsLabel}
                      onChange={(e) => setFormData(prev => ({ ...prev, statsLabel: e.target.value }))}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g., Portfolio Value"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>

                {formData.status === 'ongoing' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Progress (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.progress}
                      onChange={(e) => setFormData(prev => ({ ...prev, progress: parseInt(e.target.value) || 0 }))}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort Order</label>
                  <input
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData(prev => ({ ...prev, sortOrder: parseInt(e.target.value) || 0 }))}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false)
                      setEditingProject(null)
                      resetForm()
                    }}
                    className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
                  >
                    <Save className="w-4 h-4" />
                    {editingProject ? 'Update Project' : 'Create Project'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && viewingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" role="dialog" aria-modal="true">
          <div className="w-full max-w-5xl max-h-[95vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 px-8 py-6 text-white">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-blue-600/90 to-purple-600/90"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {(() => {
                    const template = PROJECT_TEMPLATES.find(t => t.id === viewingProject.templateId) || PROJECT_TEMPLATES[0]
                    const IconComponent = iconMap[template.icon as keyof typeof iconMap] || Building2
                    return (
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                        <IconComponent className="w-6 h-6" />
                      </div>
                    )
                  })()}
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{viewingProject.title}</h2>
                    <p className="text-purple-100 text-sm">{viewingProject.client}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2 text-xs">
                        <Calendar className="w-3 h-3" />
                        <span>{viewingProject.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2 py-1 bg-white/20 rounded-full">
                          Order #{viewingProject.sortOrder}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 border border-white/30"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(95vh-200px)] bg-gray-50/30">
              {/* Project Status Bar */}
              <div className="bg-white border-b border-gray-100 px-8 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
                      viewingProject.published 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-orange-100 text-orange-800 border border-orange-200'
                    }`}>
                      {viewingProject.published ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Published
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4" />
                          Draft
                        </>
                      )}
                    </span>
                    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
                      viewingProject.status === 'ongoing'
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-gray-100 text-gray-800 border border-gray-200'
                    }`}>
                      {viewingProject.status === 'ongoing' ? (
                        <>
                          <TrendingUp className="w-4 h-4" />
                          Ongoing ({viewingProject.progress}%)
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Completed
                        </>
                      )}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Created: {new Date(viewingProject.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-8 space-y-8">
                {/* Template & Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Template & Design</h3>
                    {(() => {
                      const template = PROJECT_TEMPLATES.find(t => t.id === viewingProject.templateId) || PROJECT_TEMPLATES[0]
                      const IconComponent = iconMap[template.icon as keyof typeof iconMap] || Building2
                      return (
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${template.gradient} rounded-xl flex items-center justify-center`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{template.name}</h4>
                            <p className="text-sm text-gray-600">{template.description}</p>
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                  
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Stats</h3>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-1">{viewingProject.statsValue}</div>
                      <div className="text-gray-600">{viewingProject.statsLabel}</div>
                    </div>
                  </div>
                </div>

                {/* Project Overview */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Overview</h3>
                  <p className="text-gray-700 leading-relaxed">{viewingProject.overview}</p>
                </div>

                {/* Role & Impact Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* My Role & Actions */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">My Role & Actions</h3>
                    <ul className="space-y-3">
                      {viewingProject.role.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Key Impact */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Impact</h3>
                    <ul className="space-y-3">
                      {viewingProject.impact.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Progress Bar (if ongoing) */}
                {viewingProject.status === 'ongoing' && (
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Progress</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Progress</span>
                        <span>{viewingProject.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-1000"
                          style={{width: `${viewingProject.progress}%`}}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-white px-8 py-6 border-t border-gray-100 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Project ID: {viewingProject.id.slice(-8)}
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      setShowViewModal(false)
                      startEdit(viewingProject)
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Project
                  </button>
                  <button 
                    onClick={() => setShowViewModal(false)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
                  >
                    <span>×</span>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}