import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { v4 as uuidv4 } from 'uuid'
import { sendPasswordResetEmail } from '@/lib/email'

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  console.log('Password reset request for email:', email)
  
  if (email !== 'contact@nhungconsultancy.com') {
    // Avoid user enumeration; respond success regardless
    console.log('Email does not match admin email, returning success without action')
    return NextResponse.json({ ok: true })
  }

  const user = await prisma.user.findUnique({ where: { email } })
  console.log('User found:', user ? 'Yes' : 'No')
  if (!user) {
    console.log('User not found in database, returning success')
    return NextResponse.json({ ok: true })
  }

  const token = uuidv4()
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000)
  console.log('Generated token:', token.substring(0, 8) + '...')

  await prisma.passwordResetToken.create({
    data: { token, userId: user.id, expiresAt },
  })
  console.log('Created password reset token in database')

  const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_APP_URL || ''
  const resetUrl = `${baseUrl}/reset-password?token=${encodeURIComponent(token)}`
  console.log('Reset URL:', resetUrl)

  console.log('Sending password reset email...')
  try {
    await sendPasswordResetEmail(email, resetUrl)
    console.log('Password reset email sent successfully')
  } catch (error) {
    console.error('Error sending password reset email:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
  
  return NextResponse.json({ ok: true })
}


