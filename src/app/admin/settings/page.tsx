'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { User, Shield, Phone, PaintBucket, Home, BarChart3, Building2, Quote, Mail, Settings, Cog, ChevronRight } from 'lucide-react'
import UserMenu from '@/components/UserMenu'

type TabKey = 'profile' | 'security' | 'contact' | 'branding' | 'homepage' | 'metrics' | 'partners' | 'testimonials' | 'email' | 'advanced'

const tabs: { key: TabKey; label: string; icon: any }[] = [
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'security', label: 'Security', icon: Shield },
  { key: 'contact', label: 'Contact', icon: Phone },
  { key: 'branding', label: 'Branding', icon: PaintBucket },
  { key: 'homepage', label: 'Homepage', icon: Home },
  { key: 'metrics', label: 'Metrics', icon: BarChart3 },
  { key: 'partners', label: 'Partners', icon: Building2 },
  { key: 'testimonials', label: 'Testimonials', icon: Quote },
  { key: 'email', label: 'Email', icon: Mail },
  { key: 'advanced', label: 'Advanced', icon: Settings },
]

export default function AdminSettingsPage() {
  const [active, setActive] = useState<TabKey>('profile')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Compact Header */}
      <div className="bg-white/5 backdrop-blur-md border-b border-white/10 pt-[60px]">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Cog className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">Settings</h1>
                <p className="text-xs text-blue-200">
                  <Link href="/admin" className="hover:text-blue-100">Dashboard</Link>
                  <span className="mx-2">•</span>
                  <span>Website Configuration</span>
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

        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="col-span-12 md:col-span-3">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg">
              <nav className="p-2">
                {tabs.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActive(key)}
                    aria-current={active === key}
                    className={`w-full relative flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all group focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                      active === key 
                        ? 'bg-white/20 text-white shadow-lg' 
                        : 'text-blue-200 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {/* Active accent bar */}
                    <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r ${active === key ? 'bg-white' : 'bg-transparent'} `} />
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <section className="col-span-12 md:col-span-9">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-8">
                  {active === 'profile' && <ProfileSection />}
                  {active === 'security' && <SecuritySection />}
                  {active === 'contact' && <ContactSection />}
                  {active === 'branding' && <BrandingSection />}
                  {active === 'homepage' && <HomepageSection />}
                  {active === 'metrics' && <MetricsSection />}
                  {active === 'partners' && <PartnersSection />}
                  {active === 'testimonials' && <TestimonialsSection />}
                  {active === 'email' && <EmailSection />}
                  {active === 'advanced' && <AdvancedSection />}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      {subtitle && <p className="text-sm text-blue-200 mt-1">{subtitle}</p>}
    </div>
  )
}

function Actions() {
  return (
    <div className="mt-6 flex items-center gap-3">
      <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">Save changes</button>
      <button className="px-6 py-3 bg-white/10 text-blue-200 rounded-xl hover:bg-white/20 hover:text-white transition-colors font-medium">Cancel</button>
    </div>
  )
}

function Input({ label, ...props }: any) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-blue-200 mb-1">{label}</span>
      <input {...props} className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white placeholder-blue-300" />
    </label>
  )
}

function Textarea({ label, ...props }: any) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-blue-200 mb-1">{label}</span>
      <textarea {...props} className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white placeholder-blue-300" />
    </label>
  )
}

function ProfileSection() {
  const [displayName, setDisplayName] = useState('')
  const [role, setRole] = useState('')
  const [bio, setBio] = useState('')
  const [avatarPath, setAvatarPath] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    ;(async () => {
      const res = await fetch('/api/admin/settings')
      const data = await res.json()
      const s = data?.settings || {}
      setDisplayName(s.displayName || '')
      setRole(s.role || '')
      setBio(s.bio || '')
      setAvatarPath(s.avatarPath || '')
    })()
  }, [])

  const upload = async (file: File): Promise<string> => {
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const data = await res.json()
    return data.path as string
  }

  const onAvatarChange = async (e: any) => {
    if (!e.target.files?.[0]) return
    const path = await upload(e.target.files[0])
    setAvatarPath(path)
  }

  const save = async () => {
    setSaving(true)
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ displayName, role, bio, avatarPath }),
    })
    setSaving(false)
  }
  
  return (
    <div>
      <SectionHeader title="Profile" subtitle="Your public-facing profile information." />
      
      {/* Profile Form */}
      <div className="bg-white/5 rounded-2xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Display Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-blue-200">Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Nhung Nguyen"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white placeholder-blue-300"
            />
          </div>

          {/* Role / Tagline */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-blue-200">Role / Tagline</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Senior M&E & Gender Inclusion Consultant"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white placeholder-blue-300"
            />
          </div>

          {/* Short Bio */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-blue-200">Short Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Brief professional bio shown on site..."
              rows={4}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white placeholder-blue-300 resize-none"
            />
            <p className="text-xs text-blue-300">Keep it concise and professional</p>
          </div>

          {/* Avatar Upload */}
          <div className="md:col-span-2 space-y-2">
            <label className="block text-sm font-medium text-blue-200">Profile Avatar</label>
            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={onAvatarChange}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              <p className="text-xs text-blue-300">PNG/JPG up to 2MB. Recommended: 300x300px square image</p>
              
              {avatarPath && (
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img src={avatarPath} alt="Avatar preview" className="h-16 w-16 object-cover rounded-full" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-blue-300">Current: {avatarPath.split('/').pop()}</p>
                    <p className="text-xs text-blue-400">This image will be displayed on your public profile</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Preview */}
      <div className="bg-white/5 rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Profile Preview</h3>
        <div className="bg-white/10 rounded-xl p-6 border border-white/20">
          <div className="flex items-start gap-4">
            {avatarPath ? (
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                <img src={avatarPath} alt="Profile preview" className="h-14 w-14 object-cover rounded-full" />
              </div>
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">{(displayName?.[0] || 'N').toUpperCase()}</span>
              </div>
            )}
            <div className="flex-1">
              <h4 className="text-xl font-bold text-white mb-1">
                {displayName || 'Your Name'}
              </h4>
              <p className="text-blue-200 mb-3">
                {role || 'Your Role / Tagline'}
              </p>
              <p className="text-blue-100 leading-relaxed">
                {bio || 'Your professional bio will appear here...'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Saving...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Save Profile
            </>
          )}
        </button>
        
        <button
          onClick={() => {
            setDisplayName('')
            setRole('')
            setBio('')
            setAvatarPath('')
          }}
          className="flex items-center gap-2 px-6 py-3 bg-white/10 text-blue-200 border border-white/20 rounded-xl hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset
        </button>
      </div>
    </div>
  )
}

function SecuritySection() {
  return (
    <div>
      <SectionHeader title="Security" subtitle="Manage password and sessions." />
      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Current password" type="password" placeholder="••••••••" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="New password" type="password" placeholder="••••••••" />
          <Input label="Confirm new password" type="password" placeholder="••••••••" />
        </div>
      </div>
      <Actions />
      <div className="mt-6 border-t pt-6">
        <button className="btn btn-secondary">Force sign out other sessions</button>
      </div>
    </div>
  )
}

function ContactSection() {
  const [publicEmail, setPublicEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [website, setWebsite] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    ;(async () => {
      const res = await fetch('/api/admin/settings')
      const data = await res.json()
      const s = data?.settings || {}
      setPublicEmail(s.publicEmail || '')
      setPhone(s.phone || '')
      setLocation(s.location || '')
      setLinkedin(s.linkedinUrl || '')
      setWebsite(s.websiteUrl || '')
    })()
  }, [])

  const save = async () => {
    setSaving(true)
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publicEmail, phone, location, linkedinUrl: linkedin, websiteUrl: website }),
    })
    setSaving(false)
  }
  return (
    <div>
      <SectionHeader title="Contact" subtitle="Public contact information." />
      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Public email" type="email" placeholder="contact@..." value={publicEmail} onChange={(e: any) => setPublicEmail(e.target.value)} />
        <Input label="Phone (optional)" placeholder="+1 555 000 000" value={phone} onChange={(e: any) => setPhone(e.target.value)} />
        <Input label="Location / Country" placeholder="Ho Chi Minh City, Vietnam" value={location} onChange={(e: any) => setLocation(e.target.value)} />
        <Input label="LinkedIn URL" placeholder="https://www.linkedin.com/in/..." value={linkedin} onChange={(e: any) => setLinkedin(e.target.value)} />
        <div className="md:col-span-2">
          <Input label="Website" placeholder="https://..." value={website} onChange={(e: any) => setWebsite(e.target.value)} />
        </div>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
        <button className="btn btn-secondary">Cancel</button>
      </div>
    </div>
  )
}

function BrandingSection() {
  const [siteTitle, setSiteTitle] = useState('')
  const [primaryColor, setPrimaryColor] = useState('#2563eb')
  const [logoPath, setLogoPath] = useState('')
  const [faviconPath, setFaviconPath] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    ;(async () => {
      const res = await fetch('/api/admin/settings')
      const data = await res.json()
      const s = data?.settings || {}
      setSiteTitle(s.siteTitle || '')
      setPrimaryColor(s.primaryColor || '#2563eb')
      setLogoPath(s.logoPath || '')
      setFaviconPath(s.faviconPath || '')
    })()
  }, [])

  const upload = async (file: File): Promise<string> => {
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const data = await res.json()
    return data.path as string
  }

  const onLogoChange = async (e: any) => {
    if (!e.target.files?.[0]) return
    const path = await upload(e.target.files[0])
    setLogoPath(path)
  }

  const onFaviconChange = async (e: any) => {
    if (!e.target.files?.[0]) return
    const path = await upload(e.target.files[0])
    setFaviconPath(path)
  }

  const save = async () => {
    setSaving(true)
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ siteTitle, primaryColor, logoPath, faviconPath }),
    })
    setSaving(false)
  }
  
  return (
    <div>
      <SectionHeader title="Branding" subtitle="Site identity and colors." />
      
      {/* Branding Form */}
      <div className="bg-white/5 rounded-2xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Site Title */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-blue-200">Site Title</label>
            <input
              type="text"
              value={siteTitle}
              onChange={(e: any) => setSiteTitle(e.target.value)}
              placeholder="Nhung Consultancy"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white placeholder-blue-300"
            />
          </div>

          {/* Primary Color */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-blue-200">Primary Color</label>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor((e.target as any).value)}
                  className="w-16 h-12 bg-white/10 border border-white/20 rounded-xl cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  placeholder="#2563eb"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white placeholder-blue-300 font-mono text-sm"
                />
              </div>
            </div>
            <p className="text-xs text-blue-300">Choose your brand's primary color</p>
          </div>

          {/* Logo Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-blue-200">Logo</label>
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={onLogoChange}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              {logoPath && (
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden">
                    <img src={logoPath} alt="Logo preview" className="h-8 w-auto object-contain" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-blue-300">Current: {logoPath.split('/').pop()}</p>
                    <p className="text-xs text-blue-400">Recommended: 200x80px or similar aspect ratio</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Favicon Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-blue-200">Favicon</label>
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={onFaviconChange}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              {faviconPath && (
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden">
                    <img src={faviconPath} alt="Favicon preview" className="h-6 w-6 object-contain" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-blue-300">Current: {faviconPath.split('/').pop()}</p>
                    <p className="text-xs text-blue-400">Recommended: 32x32px or 16x16px square image</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Color Preview */}
      <div className="bg-white/5 rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Color Preview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="w-full h-16 rounded-xl" style={{ backgroundColor: primaryColor }}></div>
            <p className="text-sm text-blue-200 text-center">Primary Color</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-16 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 border border-white/20"></div>
            <p className="text-sm text-blue-200 text-center">Background</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-16 rounded-xl bg-white/10 border border-white/20"></div>
            <p className="text-sm text-blue-200 text-center">Surface</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Saving...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Save Changes
            </>
          )}
        </button>
        
        <button
          onClick={() => {
            setSiteTitle('')
            setPrimaryColor('#2563eb')
            setLogoPath('')
            setFaviconPath('')
          }}
          className="flex items-center gap-2 px-6 py-3 bg-white/10 text-blue-200 border border-white/20 rounded-xl hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset
        </button>
      </div>
    </div>
  )
}

function HomepageSection() {
  const [headline, setHeadline] = useState('')
  const [subheadline, setSubheadline] = useState('')
  const [primaryText, setPrimaryText] = useState('')
  const [primaryUrl, setPrimaryUrl] = useState('')
  const [secondaryText, setSecondaryText] = useState('')
  const [secondaryUrl, setSecondaryUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)

  useEffect(() => {
    ;(async () => {
      const res = await fetch('/api/admin/homepage/draft')
      const data = await res.json()
      if (data?.draft) {
        setHeadline(data.draft.headline || '')
        setSubheadline(data.draft.subheadline || '')
        setPrimaryText(data.draft.primaryCtaText || '')
        setPrimaryUrl(data.draft.primaryCtaUrl || '')
        setSecondaryText(data.draft.secondaryCtaText || '')
        setSecondaryUrl(data.draft.secondaryCtaUrl || '')
      }
    })()
  }, [])

  const save = async () => {
    setSaving(true)
    await fetch('/api/admin/homepage/draft', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        headline,
        subheadline,
        primaryCtaText: primaryText,
        primaryCtaUrl: primaryUrl,
        secondaryCtaText: secondaryText,
        secondaryCtaUrl: secondaryUrl,
      }),
    })
    setSaving(false)
  }

  const publish = async () => {
    setPublishing(true)
    await fetch('/api/admin/homepage/publish', { method: 'POST' })
    setPublishing(false)
  }
  return (
    <div>
      <SectionHeader title="Homepage (Draft)" subtitle="Edit hero copy and CTAs. Publish when ready." />
      <div className="grid gap-4">
        <Input label="Hero headline" placeholder="Senior M&E & Gender Inclusion Consultant" value={headline} onChange={(e: any) => setHeadline(e.target.value)} />
        <Textarea label="Subheadline" placeholder="Enhancing program effectiveness..." rows={3} value={subheadline} onChange={(e: any) => setSubheadline(e.target.value)} />
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Primary CTA text" placeholder="Explore My Expertise" value={primaryText} onChange={(e: any) => setPrimaryText(e.target.value)} />
          <Input label="Primary CTA link" placeholder="/expertise" value={primaryUrl} onChange={(e: any) => setPrimaryUrl(e.target.value)} />
          <Input label="Secondary CTA text" placeholder="Start a Project" value={secondaryText} onChange={(e: any) => setSecondaryText(e.target.value)} />
          <Input label="Secondary CTA link" placeholder="/contact" value={secondaryUrl} onChange={(e: any) => setSecondaryUrl(e.target.value)} />
        </div>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save draft'}</button>
        <button className="btn btn-secondary" onClick={publish} disabled={publishing}>{publishing ? 'Publishing...' : 'Publish'}</button>
        <span className="text-sm text-gray-500">Last published: —</span>
      </div>
    </div>
  )
}

function MetricsSection() {
  const [years, setYears] = useState<number | ''>('' as any)
  const [projects, setProjects] = useState<number | ''>('' as any)
  const [countries, setCountries] = useState<number | ''>('' as any)
  const [currency, setCurrency] = useState('USD')
  const [value, setValue] = useState<number | ''>('' as any)
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)

  useEffect(() => {
    ;(async () => {
      const res = await fetch('/api/admin/metrics/draft')
      const data = await res.json()
      if (data?.draft) {
        setYears(data.draft.yearsExperience ?? '')
        setProjects(data.draft.projectsLed ?? '')
        setCountries(data.draft.countries ?? '')
        setCurrency(data.draft.portfolioCurrency ?? 'USD')
        setValue(Number(data.draft.portfolioValue ?? 0))
      }
    })()
  }, [])

  const save = async () => {
    setSaving(true)
    await fetch('/api/admin/metrics/draft', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        yearsExperience: years || 0,
        projectsLed: projects || 0,
        countries: countries || 0,
        portfolioCurrency: currency,
        portfolioValue: value || 0,
      }),
    })
    setSaving(false)
  }

  const publish = async () => {
    setPublishing(true)
    await fetch('/api/admin/metrics/publish', { method: 'POST' })
    setPublishing(false)
  }
  
  return (
    <div>
      <SectionHeader title="Metrics (Draft)" subtitle="Edit metrics; publish when ready." />
      
      {/* Metrics Grid */}
      <div className="bg-white/5 rounded-2xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {/* Years Experience */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-blue-200">Years Experience</label>
            <div className="relative">
              <input
                type="number"
                value={years}
                onChange={(e: any) => setYears(Number(e.target.value))}
                placeholder="15"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white placeholder-blue-300 text-center text-2xl font-bold"
              />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-blue-300">Years</div>
            </div>
          </div>

          {/* Projects Led */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-blue-200">Projects Led</label>
            <div className="relative">
              <input
                type="number"
                value={projects}
                onChange={(e: any) => setProjects(Number(e.target.value))}
                placeholder="50"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white placeholder-blue-300 text-center text-2xl font-bold"
              />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-blue-300">Projects</div>
            </div>
          </div>

          {/* Countries */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-blue-200">Countries</label>
            <div className="relative">
              <input
                type="number"
                value={countries}
                onChange={(e: any) => setCountries(Number(e.target.value))}
                placeholder="15"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white placeholder-blue-300 text-center text-2xl font-bold"
              />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-blue-300">Countries</div>
            </div>
          </div>

          {/* Currency */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-blue-200">Currency</label>
            <div className="relative">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white appearance-none text-center text-2xl font-bold"
              >
                <option value="USD" className="bg-slate-800">USD</option>
                <option value="EUR" className="bg-slate-800">EUR</option>
                <option value="GBP" className="bg-slate-800">GBP</option>
                <option value="CAD" className="bg-slate-800">CAD</option>
                <option value="AUD" className="bg-slate-800">AUD</option>
              </select>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-blue-300">Currency</div>
            </div>
          </div>

          {/* Portfolio Value */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-blue-200">Portfolio Value</label>
            <div className="relative">
              <input
                type="number"
                value={value}
                onChange={(e: any) => setValue(Number(e.target.value))}
                placeholder="30000000"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white placeholder-blue-300 text-center text-2xl font-bold"
              />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-blue-300">Value</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <button 
          onClick={save} 
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Saving...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Save Draft
            </>
          )}
        </button>
        
        <button 
          onClick={publish} 
          disabled={publishing}
          className="flex items-center gap-2 px-6 py-3 bg-white/10 text-blue-200 border border-white/20 rounded-xl hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {publishing ? (
            <>
              <div className="w-4 h-4 border-2 border-blue-200/30 border-t-blue-200 rounded-full animate-spin"></div>
              Publishing...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Publish
            </>
          )}
        </button>
      </div>
    </div>
  )
}

function PartnersSection() {
  const [items, setItems] = useState<any[]>([])
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [sortOrder, setSortOrder] = useState<number | ''>('' as any)
  const [logoPath, setLogoPath] = useState('')
  const [hidden, setHidden] = useState(false)
  const [loading, setLoading] = useState(false)
  const [publishing, setPublishing] = useState(false)

  const refresh = async () => {
    const res = await fetch('/api/admin/partners/draft')
    const data = await res.json()
    setItems(data.items || [])
  }

  useEffect(() => { refresh() }, [])

  const upload = async (file: File) => {
    const fd = new FormData(); fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const data = await res.json(); return data.path as string
  }

  const add = async () => {
    setLoading(true)
    await fetch('/api/admin/partners/draft', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, url, sortOrder: sortOrder || 0, logoPath, hidden }) })
    setName(''); setUrl(''); setSortOrder('' as any); setLogoPath(''); setHidden(false)
    await refresh(); setLoading(false)
  }

  const remove = async (id: string) => {
    await fetch(`/api/admin/partners/draft?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
    await refresh()
  }

  const publish = async () => {
    setPublishing(true)
    await fetch('/api/admin/partners/publish', { method: 'POST' })
    setPublishing(false)
  }
  
  return (
    <div>
      <SectionHeader title="Partners (Draft)" subtitle="Manage partners. Use hidden to keep in draft only." />
      
      {/* Add Partner Form */}
      <div className="bg-white/5 rounded-2xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-blue-200">Partner Name</label>
            <input
              type="text"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              placeholder="UNOPS"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white placeholder-blue-300"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-blue-200">Website URL</label>
            <input
              type="url"
              value={url}
              onChange={(e: any) => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white placeholder-blue-300"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-blue-200">Sort Order</label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e: any) => setSortOrder(Number(e.target.value))}
              placeholder="1"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white placeholder-blue-300"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-blue-200">Logo</label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={async (e: any) => { if (e.target.files?.[0]) setLogoPath(await upload(e.target.files[0])) }}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              {logoPath && (
                <div className="mt-2 p-2 bg-white/5 rounded-lg">
                  <p className="text-xs text-blue-300">Selected: {logoPath.split('/').pop()}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hidden Checkbox */}
        <div className="mt-4 flex items-center gap-3">
          <input
            id="hidden-partner"
            type="checkbox"
            checked={hidden}
            onChange={(e) => setHidden((e.target as any).checked)}
            className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label htmlFor="hidden-partner" className="text-sm text-blue-200">
            Hidden (draft only)
          </label>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={add}
            disabled={loading || !name.trim()}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Adding...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Partner
              </>
            )}
          </button>

          <button
            onClick={publish}
            disabled={publishing || items.length === 0}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 text-blue-200 border border-white/20 rounded-xl hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {publishing ? (
              <>
                <div className="w-4 h-4 border-2 border-blue-200/30 border-t-blue-200 rounded-full animate-spin"></div>
                Publishing...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Publish ({items.length} partners)
              </>
            )}
          </button>
        </div>
      </div>

      {/* Partners List */}
      <div className="bg-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Current Partners ({items.length})</h3>
          <button
            onClick={refresh}
            className="flex items-center gap-2 px-3 py-2 text-sm text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No partners yet</h3>
            <p className="text-blue-200">Add your first partner to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((i) => (
              <div key={i.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex items-center gap-4">
                  {i.logoPath ? (
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src={i.logoPath} alt={i.name} className="h-8 w-auto object-contain" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{(i.name?.[0] || 'P').toUpperCase()}</span>
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-white">{i.name}</div>
                    <div className="text-sm text-blue-200">
                      {i.url ? (
                        <a href={i.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                          {i.url}
                        </a>
                      ) : (
                        'No website'
                      )}
                    </div>
                    <div className="text-xs text-blue-300 mt-1">
                      Order: {i.sortOrder}
                      {i.hidden && <span className="ml-2 px-2 py-0.5 bg-orange-500/20 text-orange-300 rounded-full">Hidden</span>}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => remove(i.id)}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function TestimonialsSection() {
  const [items, setItems] = useState<any[]>([])
  const [quote, setQuote] = useState('')
  const [author, setAuthor] = useState('')
  const [role, setRole] = useState('')
  const [avatarPath, setAvatarPath] = useState('')
  const [sortOrder, setSortOrder] = useState<number | ''>('' as any)
  const [hidden, setHidden] = useState(false)
  const [loading, setLoading] = useState(false)
  const [publishing, setPublishing] = useState(false)

  const refresh = async () => {
    const res = await fetch('/api/admin/testimonials/draft')
    const data = await res.json(); setItems(data.items || [])
  }

  useEffect(() => { refresh() }, [])

  const upload = async (file: File) => {
    const fd = new FormData(); fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const data = await res.json(); return data.path as string
  }

  const add = async () => {
    setLoading(true)
    await fetch('/api/admin/testimonials/draft', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ quote, author, role, avatarPath, sortOrder: sortOrder || 0, hidden }) })
    setQuote(''); setAuthor(''); setRole(''); setAvatarPath(''); setSortOrder('' as any); setHidden(false)
    await refresh()
    setLoading(false)
  }

  const remove = async (id: string) => {
    await fetch(`/api/admin/testimonials/draft?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
    await refresh()
  }

  const publish = async () => {
    setPublishing(true)
    await fetch('/api/admin/testimonials/publish', { method: 'POST' })
    setPublishing(false)
  }
  
  return (
    <div>
      <SectionHeader title="Testimonials (Draft)" subtitle="Manage testimonials. Use hidden to keep in draft only." />
      
      {/* Add Testimonial Form */}
      <div className="bg-white/5 rounded-2xl p-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quote */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-blue-200">Testimonial Quote</label>
            <textarea
              value={quote}
              onChange={(e: any) => setQuote(e.target.value)}
              placeholder="A concise, impactful quote..."
              rows={4}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white placeholder-blue-300 resize-none"
            />
            <p className="text-xs text-blue-300">Keep it concise and impactful</p>
          </div>

          {/* Author & Role */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-200">Author Name</label>
              <input
                type="text"
                value={author}
                onChange={(e: any) => setAuthor(e.target.value)}
                placeholder="Jane Doe"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white placeholder-blue-300"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-200">Role / Organization</label>
              <input
                type="text"
                value={role}
                onChange={(e: any) => setRole(e.target.value)}
                placeholder="Director, XYZ Organization"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white placeholder-blue-300"
              />
            </div>
          </div>

          {/* Avatar Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-blue-200">Author Avatar</label>
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={async (e: any) => { if (e.target.files?.[0]) setAvatarPath(await upload(e.target.files[0])) }}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
              {avatarPath && (
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center overflow-hidden">
                    <img src={avatarPath} alt="Avatar preview" className="h-10 w-10 object-cover rounded-full" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-blue-300">Selected: {avatarPath.split('/').pop()}</p>
                    <p className="text-xs text-blue-400">Recommended: 150x150px square image</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sort Order & Hidden */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-blue-200">Sort Order</label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e: any) => setSortOrder(Number(e.target.value))}
                placeholder="1"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-white placeholder-blue-300"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                id="hidden-testimonial"
                type="checkbox"
                checked={hidden}
                onChange={(e) => setHidden((e.target as any).checked)}
                className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="hidden-testimonial" className="text-sm text-blue-200">
                Hidden (draft only)
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={add}
            disabled={loading || !quote.trim() || !author.trim()}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Adding...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Testimonial
              </>
            )}
          </button>

          <button
            onClick={publish}
            disabled={publishing || items.length === 0}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 text-blue-200 border border-white/20 rounded-xl hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {publishing ? (
              <>
                <div className="w-4 h-4 border-2 border-blue-200/30 border-t-blue-200 rounded-full animate-spin"></div>
                Publishing...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Publish ({items.length} testimonials)
              </>
            )}
          </button>
        </div>
      </div>

      {/* Testimonials List */}
      <div className="bg-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Current Testimonials ({items.length})</h3>
          <button
            onClick={refresh}
            className="flex items-center gap-2 px-3 py-2 text-sm text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No testimonials yet</h3>
            <p className="text-blue-200">Add your first testimonial to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((i) => (
              <div key={i.id} className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    {i.avatarPath ? (
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                        <img src={i.avatarPath} alt={i.author} className="h-10 w-10 object-cover rounded-full" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">{(i.author?.[0] || 'T').toUpperCase()}</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="font-semibold text-white">{i.author}</div>
                        {i.role && (
                          <>
                            <span className="text-blue-300">•</span>
                            <span className="text-sm text-blue-200">{i.role}</span>
                          </>
                        )}
                      </div>
                      <div className="text-blue-100 leading-relaxed mb-2 italic">"{i.quote}"</div>
                      <div className="text-xs text-blue-300">
                        Order: {i.sortOrder}
                        {i.hidden && <span className="ml-2 px-2 py-0.5 bg-orange-500/20 text-orange-300 rounded-full">Hidden</span>}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => remove(i.id)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all flex-shrink-0"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function EmailSection() {
  const [senderName, setSenderName] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    ;(async () => {
      const res = await fetch('/api/admin/settings')
      const data = await res.json()
      const s = data?.settings || {}
      setSenderName(s.senderName || '')
      setSenderEmail(s.senderEmail || '')
    })()
  }, [])

  const save = async () => {
    setSaving(true)
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ senderName, senderEmail }),
    })
    setSaving(false)
  }
  return (
    <div>
      <SectionHeader title="Email" subtitle="Sender identity for outgoing emails." />
      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Sender name" placeholder="Nhung Consultancy" value={senderName} onChange={(e: any) => setSenderName(e.target.value)} />
        <Input label="Sender email" type="email" placeholder="no-reply@your-domain.com" value={senderEmail} onChange={(e: any) => setSenderEmail(e.target.value)} />
      </div>
      <div className="mt-6 flex items-center gap-3">
        <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
        <button className="btn btn-secondary">Send test email</button>
      </div>
    </div>
  )
}

function AdvancedSection() {
  return (
    <div>
      <SectionHeader title="Advanced" subtitle="Export content and review changes." />
      <div className="flex items-center gap-3">
        <button className="btn btn-secondary">Export JSON</button>
        <button className="btn btn-secondary">View audit log</button>
      </div>
      <p className="text-xs text-gray-500 mt-4">Maintenance mode will be added later.</p>
    </div>
  )
}




