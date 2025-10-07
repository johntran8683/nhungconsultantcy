'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowLeft, Shield, CheckCircle, Loader2, KeyRound, AlertCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    // Client-side validation
    if (!email.trim()) {
      setError('Please enter your email address')
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
    if (email.toLowerCase() !== 'contact@nhungconsultancy.com') {
      setError('Password reset is only available for the admin account.')
      setLoading(false)
      return
    }
    
    try {
      const response = await fetch('/api/auth/request-reset', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ email: email.toLowerCase().trim() }) 
      })
      
      if (response.ok) {
        setSent(true)
      } else {
        setError('Failed to send reset email. Please try again.')
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
          {/* Header */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
              <KeyRound className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h1>
            <p className="text-gray-600">Enter your admin email to receive a password reset link</p>
          </div>

          {sent ? (
            /* Success State */
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-900">Reset Link Sent!</h2>
                <p className="text-gray-600">
                  If the email <span className="font-semibold text-gray-900">{email}</span> is registered, 
                  you'll receive a password reset link shortly.
                </p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Check your email inbox</p>
                    <p className="text-blue-700">
                      The reset link will expire in 24 hours. If you don't see the email, 
                      check your spam folder.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setSent(false)
                    setEmail('')
                    setError('')
                  }}
                  className="w-full text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                >
                  Try a different email address
                </button>
                
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <ArrowLeft className="w-4 h-4" />
                  <Link href="/login" className="hover:text-gray-700 transition-colors">
                    Back to sign in
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* Form State */
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Admin Email Address
                </label>
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
                    placeholder="contact@nhungconsultancy.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (error) setError('')
                    }}
                    required
                    autoComplete="email"
                    autoFocus
                  />
                </div>
                {email && email.toLowerCase() !== 'contact@nhungconsultancy.com' && (
                  <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-amber-100 flex items-center justify-center">
                      <span className="text-amber-600 text-xs">!</span>
                    </span>
                    Password reset is only available for the admin account
                  </p>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm p-4 animate-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <span className="font-medium">{error}</span>
                  </div>
                </div>
              )}

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Security Notice</p>
                    <p className="text-blue-700">
                      Password reset links are only sent to verified admin accounts. 
                      The link will expire in 24 hours for security.
                    </p>
                  </div>
                </div>
              </div>

              <button
                className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-600/20 transition disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={loading}
                type="submit"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending reset link...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    Send reset link
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <Link href="/login" className="text-gray-500 hover:text-gray-700 flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" />
                Back to sign in
              </Link>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                ← Back to site
              </Link>
            </div>
            
            <div className="text-xs text-gray-500 mt-4 text-center space-y-1">
              <p>🔒 Secure password reset</p>
              <p>Only the admin account can reset passwords</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


