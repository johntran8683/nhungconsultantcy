'use client'

import { useState, useEffect, useRef } from 'react'
import { signOut } from 'next-auth/react'
import { LogOut, ChevronDown, User, Shield } from 'lucide-react'
import { createPortal } from 'react-dom'

export default function UserMenu({ email }: { email?: string | null }) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const initials = (email?.[0] || 'A').toUpperCase()
  const displayName = email?.split('@')[0] || 'Admin'

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  // Handle mounting for portal
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && 
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  // Calculate dropdown position
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        right: window.innerWidth - rect.right - window.scrollX
      })
    }
  }, [open])

  const dropdownContent = open && mounted ? (
    <div
      ref={menuRef}
      className="fixed w-64 bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl overflow-hidden z-[9999] animate-in slide-in-from-top-2 duration-200"
      style={{
        top: dropdownPosition.top,
        right: dropdownPosition.right
      }}
      role="menu"
    >
      {/* Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">{initials}</span>
          </div>
          <div>
            <div className="text-gray-900 font-semibold">{displayName}</div>
            <div className="text-gray-500 text-sm flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Administrator
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu Items */}
      <div className="py-2">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 group"
          role="menuitem"
        >
          <div className="w-8 h-8 rounded-lg bg-red-100 group-hover:bg-red-200 flex items-center justify-center transition-colors">
            <LogOut className="w-4 h-4 text-red-600" />
          </div>
          <div>
            <div className="font-medium">Sign out</div>
            <div className="text-xs text-gray-500">End your session</div>
          </div>
        </button>
      </div>
    </div>
  ) : null

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setOpen((o) => !o)}
        className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 shadow-lg hover:bg-white/20 transition-all duration-300 hover:scale-105"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
            <span className="text-white font-bold text-lg">{initials}</span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-white font-semibold text-sm">{displayName}</div>
          <div className="text-blue-200 text-xs">Administrator</div>
        </div>
        <ChevronDown className={`w-5 h-5 text-white/70 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      
      {mounted && createPortal(dropdownContent, document.body)}
    </>
  )
}


