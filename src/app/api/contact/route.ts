import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { sendNotificationEmail } from '@/lib/email'

// Simple in-memory rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function getRateLimitKey(req: NextRequest): string {
  // Use IP address for rate limiting
  const forwarded = req.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : req.ip || 'unknown'
  return `contact:${ip}`
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 5 // Max 5 submissions per 15 minutes
  
  const current = rateLimitStore.get(key)
  
  if (!current || now > current.resetTime) {
    // Reset or create new entry
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1, resetTime: now + windowMs }
  }
  
  if (current.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetTime: current.resetTime }
  }
  
  // Increment count
  current.count++
  rateLimitStore.set(key, current)
  return { allowed: true, remaining: maxRequests - current.count, resetTime: current.resetTime }
}

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  organization: z.string().min(1),
  phone: z.string().optional(),
  projectType: z.string().min(1),
  timeline: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10),
  token: z.string().optional(), // reCAPTCHA token (optional for now)
})

async function verifyRecaptcha(token?: string): Promise<boolean> {
  if (!process.env.RECAPTCHA_SECRET || !token) return true
  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(process.env.RECAPTCHA_SECRET)}&response=${encodeURIComponent(token)}`,
    })
    const data = await res.json()
    return !!data.success
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  try {
    // Check rate limit first
    const rateLimitKey = getRateLimitKey(req)
    const rateLimit = checkRateLimit(rateLimitKey)
    
    if (!rateLimit.allowed) {
      const resetTimeSeconds = Math.ceil((rateLimit.resetTime - Date.now()) / 1000)
      return NextResponse.json({ 
        ok: false, 
        error: 'Too many requests. Please try again later.',
        retryAfter: resetTimeSeconds
      }, { 
        status: 429,
        headers: {
          'Retry-After': resetTimeSeconds.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimit.resetTime.toString()
        }
      })
    }

    const json = await req.json().catch(() => null)
    if (!json) {
      return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
    }

    const parsed = schema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'Validation failed', details: parsed.error.issues }, { status: 400 })
    }

    const { name, email, organization, phone, projectType, timeline, subject, message, token } = parsed.data
    const human = await verifyRecaptcha(token)
    if (!human) {
      return NextResponse.json({ ok: false, error: 'reCAPTCHA verification failed' }, { status: 400 })
    }

    const msg = await prisma.contactMessage.create({ data: { name, email, organization, phone, projectType, timeline, subject, message, status: 'new' } })

    // Send admin notification via centralized email service
    try {
      const title = `New contact message from ${name}${organization ? ' — ' + organization : ''}`
      const lines = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Organization: ${organization}`,
        `Phone: ${phone || '—'}`,
        `Project Type: ${projectType}`,
        `Timeline: ${timeline || '—'}`,
        `Subject: ${subject || '—'}`
      ]
      const details = lines.map(l => `• ${l}`).join('<br>')
      const adminMessage = `${details}<br><br><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}`
      await sendNotificationEmail('contact@nhungconsultancy.com', title, adminMessage, `mailto:${email}`, 'Reply')
    } catch (e) {
      console.error('Failed to send admin notification email:', e)
      // Do not fail the request; logging is sufficient for follow-up.
    }

    return NextResponse.json({ ok: true }, {
      headers: {
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        'X-RateLimit-Reset': rateLimit.resetTime.toString()
      }
    })
  } catch (error) {
    console.error('Contact form submission error:', error)
    return NextResponse.json({ ok: false, error: 'Internal server error' }, { status: 500 })
  }
}


