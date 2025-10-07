'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Mail, ArrowLeft, Search, Filter, Download, Eye, CheckCircle, Clock, User, Building2, Phone, Calendar, MessageSquare, MoreVertical, RefreshCw, ChevronLeft, ChevronRight as ChevronRightIcon, Type } from 'lucide-react'
import UserMenu from '@/components/UserMenu'

export default function AdminMessagesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Compact Header */}
      <div className="bg-white/5 backdrop-blur-md border-b border-white/10 pt-[60px]">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Mail className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">Message Center</h1>
                <p className="text-xs text-blue-200">
                  <Link href="/admin" className="hover:text-blue-100">Dashboard</Link>
                  <span className="mx-2">•</span>
                  <span>Contact Form Management</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/admin" className="hidden sm:inline-flex items-center gap-2 text-xs text-blue-200 hover:text-white transition-colors">
                ← Back to Dashboard
              </Link>
              <UserMenu />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-8">
          <MessagesSection />
        </div>
      </div>
    </div>
  )
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-blue-200">{subtitle}</p>
    </div>
  )
}

function MessagesSection() {
  const [items, setItems] = useState<any[]>([])
  const [unread, setUnread] = useState(0)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'read'>('all')
  const [sort, setSort] = useState<'newest' | 'oldest'>('newest')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<any | null>(null)
  const [markReadLoading, setMarkReadLoading] = useState(false)
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const refresh = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/admin/messages', { cache: 'no-store' })
      if (!res.ok) throw new Error('Failed to load messages')
      const data = await res.json()
      setItems(data.items || [])
      setUnread(data.unread || 0)
    } catch (e: any) {
      setError(e?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { refresh() }, [])

  const markRead = async (id: string) => {
    await fetch('/api/admin/messages', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status: 'read' }) })
    await refresh()
  }

  const normalized = (v: string) => (v || '').toLowerCase().trim()
  const filtered = useMemo(() => {
    const q = normalized(search)
    let list = [...items]
    if (statusFilter !== 'all') list = list.filter(m => m.status === statusFilter)
    if (q) {
      list = list.filter(m => [m.name, m.email, m.organization, m.projectType, m.subject, m.message].some((f: string) => normalized(f).includes(q)))
    }
    list.sort((a, b) => sort === 'newest' ? (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) : (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))
    return list
  }, [items, search, statusFilter, sort])

  // Pagination calculations
  const total = items.length
  const totalFiltered = filtered.length
  const totalPages = Math.ceil(totalFiltered / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedItems = filtered.slice(startIndex, endIndex)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [search, statusFilter, sort])

  const exportCSV = () => {
    const headers = ['Name','Email','Organization','Phone','ProjectType','Timeline','Subject','Message','Status','CreatedAt']
    const rows = filtered.map((m) => [
      m.name || '',
      m.email || '',
      m.organization || '',
      m.phone || '',
      m.projectType || '',
      m.timeline || '',
      (m.subject || '').replace(/\n/g,' '),
      (m.message || '').replace(/\n/g,' ').slice(0, 5000),
      m.status,
      new Date(m.createdAt).toISOString(),
    ])
    const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g,'""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'messages.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <SectionHeader title="Messages" subtitle="Contact submissions from your site." />
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Messages</p>
              <p className="text-3xl font-bold text-blue-900">{total}</p>
              {totalFiltered !== total && (
                <p className="text-xs text-blue-600 mt-1">{totalFiltered} filtered</p>
              )}
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">Unread</p>
              <p className="text-3xl font-bold text-orange-900">{unread}</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Read</p>
              <p className="text-3xl font-bold text-green-900">{total - unread}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/10 rounded-2xl p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-300" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, organization, subject, or message..."
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-blue-300"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-300" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="pl-10 pr-8 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none text-white"
              >
                <option value="all">All Status</option>
                <option value="new">New Only</option>
                <option value="read">Read Only</option>
              </select>
            </div>
            
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white"
              >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            
            <button 
              onClick={refresh}
              className="flex items-center gap-2 px-4 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            
            <button 
              onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
        
        {loading && (
          <div className="mt-4 flex items-center gap-2 text-blue-600">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span className="text-sm">Loading messages...</span>
          </div>
        )}
        
        {error && (
          <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <span className="text-sm">{error}</span>
          </div>
        )}
      </div>

      {/* Messages Table */}
      <div className="bg-white/10 rounded-2xl border border-white/20 shadow-sm overflow-hidden">
        {totalFiltered === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-blue-300" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No messages found</h3>
            <p className="text-blue-200">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-white/10 border-b border-white/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-200 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-200 uppercase tracking-wider">Organization</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-200 uppercase tracking-wider">Project</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-200 uppercase tracking-wider">Message</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-200 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-blue-200 uppercase tracking-wider">Received</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-blue-200 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white/5 divide-y divide-white/10">
                  {paginatedItems.map((m, idx) => (
                  <tr key={m.id} className={`hover:bg-white/15 transition-colors ${idx % 2 === 0 ? 'bg-white/5' : 'bg-white/8'}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {(m.name?.[0] || 'U').toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-white truncate">{m.name}</div>
                          <div className="text-sm text-blue-200 truncate">{m.email}</div>
                          {m.phone && (
                            <div className="text-xs text-blue-300 flex items-center gap-1 mt-1">
                              <Phone className="w-3 h-3" />
                              {m.phone}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-blue-300" />
                        <span className="text-white">{m.organization || '—'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-white">{m.projectType || '—'}</div>
                        {m.timeline && (
                          <div className="text-xs text-blue-300 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {m.timeline}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <div className="space-y-1">
                        {m.subject && (
                          <div className="font-medium text-white truncate">{m.subject}</div>
                        )}
                        <div className="text-sm text-blue-200 line-clamp-2">{m.message}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                        m.status === 'new' 
                          ? 'bg-orange-100 text-orange-800 border border-orange-200' 
                          : 'bg-green-100 text-green-800 border border-green-200'
                      }`}>
                        {m.status === 'new' ? (
                          <>
                            <Clock className="w-3 h-3" />
                            New
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-3 h-3" />
                            Read
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-white">
                        {new Date(m.createdAt).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-blue-300">
                        {new Date(m.createdAt).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <button 
                          onClick={() => setSelected(m)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          <span className="hidden sm:inline">View</span>
                        </button>
                        {m.status === 'new' && (
                          <button 
                            onClick={() => markRead(m.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span className="hidden sm:inline">Mark Read</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="bg-white/10 px-6 py-4 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-blue-200">
                    Showing {startIndex + 1} to {Math.min(endIndex, totalFiltered)} of {totalFiltered} messages
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="flex items-center gap-1 px-3 py-2 text-sm text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                                ? 'bg-blue-600 text-white'
                                : 'text-blue-200 hover:text-white hover:bg-white/10'
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
                      className="flex items-center gap-1 px-3 py-2 text-sm text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                      <ChevronRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Enhanced Message Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200" role="dialog" aria-modal="true">
          <div className="w-full max-w-5xl max-h-[95vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Enhanced Modal Header */}
            <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 px-8 py-8 text-white">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-blue-600/90"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                    <User className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-1">{selected.name}</h2>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 opacity-80" />
                      <p className="text-indigo-100 text-lg">{selected.email}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="w-4 h-4 opacity-80" />
                      <p className="text-indigo-200 text-sm">
                        {new Date(selected.createdAt).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelected(null)}
                  className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 border border-white/30"
                  aria-label="Close modal"
                >
                  <span className="text-white text-2xl font-light">×</span>
                </button>
              </div>
            </div>

            {/* Enhanced Modal Content - Message-Focused Layout */}
            <div className="overflow-y-auto max-h-[calc(95vh-280px)] bg-gray-50/30">
              {/* Compact Info Bar */}
              <div className="bg-white border-b border-gray-100 px-8 py-4">
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
                    selected.status === 'new' 
                      ? 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 border border-orange-200 shadow-sm' 
                      : 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 shadow-sm'
                  }`}>
                    {selected.status === 'new' ? (
                      <>
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                        New Message
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Read
                      </>
                    )}
                  </span>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      <span className="font-medium">{selected.organization || 'No organization'}</span>
                    </div>
                    {selected.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span className="font-medium">{selected.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{selected.timeline || 'No timeline'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-semibold text-gray-700">Project Type:</span>
                    <span className="text-sm text-gray-900 font-medium">{selected.projectType || 'Not specified'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>ID: {selected.id.slice(-8)}</span>
                  </div>
                </div>
              </div>

              {/* Subject Section (Compact) */}
              {selected.subject && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 px-8 py-4">
                  <div className="flex items-center gap-3">
                    <Type className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-800 uppercase tracking-wider">Subject:</span>
                    <span className="text-blue-900 font-semibold">{selected.subject}</span>
                  </div>
                </div>
              )}

              {/* Message Content - Takes Most Space */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-bold text-gray-800">Message Content</h3>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-8 min-h-[400px]">
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-lg font-medium">
                        {selected.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Modal Footer */}
            <div className="bg-white px-8 py-6 border-t border-gray-100 shadow-lg">
              <div className="flex items-center justify-end gap-4">
                {selected.status === 'new' && (
                  <button 
                    onClick={async () => { 
                      await markRead(selected.id); 
                      setSelected({ ...selected, status: 'read' }) 
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Mark as Read
                  </button>
                )}
                <button 
                  onClick={() => setSelected(null)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
                >
                  <span>×</span>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
