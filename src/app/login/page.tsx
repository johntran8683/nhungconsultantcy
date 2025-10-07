'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff, Loader2, Shield } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')
    
    // Client-side validation
    if (!email.trim()) {
      setError('Please enter your email address')
      setLoading(false)
      return
    }
    
    if (!password.trim()) {
      setError('Please enter your password')
      setLoading(false)
      return
    }
    
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }
    
    // Check if it's the admin email
    if (email.toLowerCase() !== 'nhungconsultancy@gmail.com') {
      setError('Access denied. Only the admin account can sign in.')
      setLoading(false)
      return
    }
    
    try {
      const res = await signIn('credentials', { 
        email: email.toLowerCase().trim(), 
        password, 
        redirect: false,
        callbackUrl: '/admin' 
      })
      
      if ((res as any)?.error) {
        if ((res as any).error === 'CredentialsSignin') {
          setError('Incorrect password. Please try again.')
        } else if ((res as any).error === 'AccessDenied') {
          setError('Access denied. Only the admin account can sign in.')
        } else {
          setError('Login failed. Please check your credentials and try again.')
        }
      } else if (res?.ok) {
        // Successful login - show success message briefly then redirect
        setSuccess('Login successful! Redirecting to admin dashboard...')
        setTimeout(() => {
          window.location.href = '/admin'
        }, 1500)
        return
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
    }
    
    setLoading(false)
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-16 relative overflow-hidden">
      {/* Background accents for subtle brand feel */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-10 -left-10 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Admin Sign In</h1>
            <p className="text-gray-600 mt-2">Access the Nhung Consultancy dashboard</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${error && !email.trim() ? 'text-red-400' : 'text-gray-400'}`} />
                <input
                  id="email"
                  className={`w-full border rounded-xl pl-10 pr-3 py-3 outline-none transition ${
                    error && !email.trim() 
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                      : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                  }`}
                  type="email"
                  placeholder="nhungconsultancy@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError('') // Clear error when user starts typing
                  }}
                  required
                  autoComplete="email"
                />
              </div>
              {email && email.toLowerCase() !== 'nhungconsultancy@gmail.com' && (
                <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="text-amber-600 text-xs">!</span>
                  </span>
                  Only the admin email can access this system
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${error && !password.trim() ? 'text-red-400' : 'text-gray-400'}`} />
                <input
                  id="password"
                  className={`w-full border rounded-xl pl-10 pr-12 py-3 outline-none transition ${
                    error && !password.trim() 
                      ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
                      : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                  }`}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (error) setError('') // Clear error when user starts typing
                  }}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {password && password.length < 6 && (
                <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="text-amber-600 text-xs">!</span>
                  </span>
                  Password should be at least 6 characters long
                </p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm p-4 animate-in slide-in-from-top-2 duration-200">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 text-xs font-bold">!</span>
                  </div>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="rounded-xl border border-green-200 bg-green-50 text-green-700 text-sm p-4 animate-in slide-in-from-top-2 duration-200">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-medium">{success}</span>
                </div>
              </div>
            )}

            <button
              className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-600/20 transition disabled:opacity-60"
              disabled={loading}
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />} Sign in
            </button>
          </form>

          <div className="mt-4 flex items-center justify-between text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">← Back to site</Link>
            <Link href="/forgot-password" className="text-blue-600 hover:text-blue-700 font-medium">Forgot password?</Link>
          </div>

          <div className="text-xs text-gray-500 mt-6 text-center space-y-1">
            <p>🔒 Secure admin access only</p>
            <p>Contact the system administrator if you need access</p>
          </div>
        </div>
      </div>
    </section>
  )
}


