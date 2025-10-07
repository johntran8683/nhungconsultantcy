import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import UserMenu from '@/components/UserMenu'
import { Settings, Mail, ArrowRight, Shield, Clock, Briefcase } from 'lucide-react'
import { prisma } from '@/lib/prisma'

export default async function AdminHome() {
  const session = await getServerSession(authOptions)
  
  // Get essential statistics
  const [unreadCount, totalMessages, totalProjects, publishedProjects] = await Promise.all([
    prisma.contactMessage.count({ where: { status: 'new' } }),
    prisma.contactMessage.count(),
    prisma.project.count(),
    prisma.project.count({ where: { published: true } })
  ])
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Compact Header */}
      <div className="bg-white/5 backdrop-blur-md border-b border-white/10 pt-[60px]">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">Admin Dashboard</h1>
                <p className="text-xs text-blue-200">Welcome back, {session?.user?.email?.split('@')[0] || 'Admin'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-blue-200">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Online</span>
              </div>
              <UserMenu email={session?.user?.email} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        {/* Stats Bar */}
        <div className="mb-12">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-blue-300 mb-1">{totalMessages}</p>
                <p className="text-sm text-blue-200">Total Messages</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-orange-300 mb-1">{unreadCount}</p>
                <p className="text-sm text-orange-200">Unread Messages</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-300 mb-1">{totalProjects}</p>
                <p className="text-sm text-purple-200">Total Projects</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-300 mb-1">{publishedProjects}</p>
                <p className="text-sm text-green-200">Published Projects</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Action Cards */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Management Center</h2>
            <p className="text-blue-200">Choose an area to manage your website</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <CardAction
              href="/admin/settings"
              icon={<Settings className="w-16 h-16" />}
              title="Website Settings"
              desc="Manage homepage content, metrics, partners, testimonials, branding, and email configurations"
              gradient="from-blue-500 to-blue-600"
              bgGradient="from-blue-500/10 to-blue-600/10"
              stats={`${totalMessages} total messages`}
            />
            <CardAction
              href="/admin/projects"
              icon={<Briefcase className="w-16 h-16" />}
              title="Project Portfolio"
              desc="Manage featured projects, case studies, and portfolio content with customizable templates"
              gradient="from-purple-500 to-purple-600"
              bgGradient="from-purple-500/10 to-purple-600/10"
              stats={`${publishedProjects}/${totalProjects} published`}
            />
            <CardAction
              href="/admin/messages"
              icon={<Mail className="w-16 h-16" />}
              title="Message Center"
              desc="Review and manage contact form submissions, respond to inquiries, and track communication"
              gradient="from-rose-500 to-rose-600"
              bgGradient="from-rose-500/10 to-rose-600/10"
              badge={unreadCount > 0 ? unreadCount : undefined}
              stats={`${unreadCount} unread messages`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function CardAction({ 
  href, 
  icon, 
  title, 
  desc, 
  badge, 
  gradient, 
  bgGradient,
  stats
}: { 
  href: string; 
  icon: React.ReactNode; 
  title: string; 
  desc: string; 
  badge?: number;
  gradient?: string;
  bgGradient?: string;
  stats?: string;
}) {
  return (
    <Link href={href} className="group relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient || 'from-blue-500/10 to-blue-600/10'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      
      {/* Content */}
      <div className="relative z-10 text-center">
        <div className="relative w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
          <div className={`text-white ${gradient ? `bg-gradient-to-br ${gradient} bg-clip-text text-transparent` : ''}`}>
            {icon}
          </div>
          {badge && (
            <span className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm rounded-full h-8 w-8 flex items-center justify-center font-bold shadow-lg animate-pulse">
              {badge > 99 ? '99+' : badge}
            </span>
          )}
        </div>
        
        <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-blue-100 leading-relaxed mb-6 text-base">
          {desc}
        </p>
        
        {stats && (
          <div className="mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm text-blue-200">
              {stats}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-center text-white/80 group-hover:text-white transition-all duration-300">
          <span className="font-semibold text-lg">Access Panel</span>
          <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
        </div>
      </div>
      
      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </Link>
  )
}


