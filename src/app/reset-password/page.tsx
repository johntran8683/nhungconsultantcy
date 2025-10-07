'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, Loader2, Shield } from 'lucide-react'

export default function ResetPasswordPage() {
  const params = useSearchParams()
  const router = useRouter()
  const token = params.get('token') || ''
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [ok, setOk] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    if (!token) setError('Missing token')
  }, [token])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password.length < 8) return setError('Password must be at least 8 characters')
    if (password !== confirm) return setError('Passwords do not match')
    setLoading(true)
    const res = await fetch('/api/auth/reset-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token, newPassword: password }) })
    if (!res.ok) {
      const data = await res.json()
      setError(data.error || 'Reset failed')
    } else {
      setOk(true)
      setTimeout(() => router.push('/login'), 1500)
    }
    setLoading(false)
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-16 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-10 -left-10 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-8">
          {/* Header */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
              <Lock className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h1>
            <p className="text-gray-600">Create a strong password to secure your account</p>
          </div>

          {ok ? (
            <div className="text-center space-y-6">
              <div className="mx-auto w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <p className="text-gray-900 font-medium">Password updated</p>
                <p className="text-gray-600 text-sm mt-1">Redirecting you to login…</p>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5" aria-describedby={error ? 'form-error' : undefined}>
              {/* New Password */}
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">New password</label>
                <div className="relative">
                  <input
                    id="new-password"
                    className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg py-3 px-4 pr-11 outline-none transition"
                    type={showPw ? 'text' : 'password'}
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-invalid={!!error}
                    aria-required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                  >
                    {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {/* Strength Indicator */}
                <PasswordStrength value={password} />
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Confirm password</label>
                <div className="relative">
                  <input
                    id="confirm-password"
                    className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg py-3 px-4 pr-11 outline-none transition"
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Re-enter password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    aria-invalid={!!error}
                    aria-required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-2 text-red-700 bg-red-50 border border-red-200 rounded-lg p-3" role="alert" id="form-error">
                  <AlertCircle className="w-5 h-5 mt-0.5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium rounded-lg py-3 transition shadow-sm"
                disabled={loading || !token}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Updating…
                  </>
                ) : (
                  'Update password'
                )}
              </button>

              {/* Help */}
              <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
                <Shield className="w-4 h-4" />
                <span>Use at least 8 characters, including numbers and symbols.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}



// Lightweight strength component
function PasswordStrength({ value }: { value: string }) {
  const score = getStrengthScore(value)
  const colors = ['bg-gray-200', 'bg-red-400', 'bg-yellow-400', 'bg-emerald-500']
  const labels = ['Too weak', 'Weak', 'Fair', 'Strong']

  return (
    <div className="mt-2" aria-live="polite">
      <div className="flex gap-1" aria-hidden>
        {[0,1,2].map((i) => (
          <div key={i} className={`h-1.5 flex-1 rounded ${i < score ? colors[Math.max(1, score)-1] : 'bg-gray-200'}`} />
        ))}
      </div>
      <p className="mt-1 text-xs text-gray-500">{labels[Math.min(score, 3)]}</p>
    </div>
  )
}

function getStrengthScore(pw: string): number {
  let s = 0
  if (pw.length >= 8) s++
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++
  if (/[0-9]/.test(pw) || /[^A-Za-z0-9]/.test(pw)) s++
  return s
}
