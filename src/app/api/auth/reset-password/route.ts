import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function POST(req: NextRequest) {
  const { token, newPassword } = await req.json()
  if (!token || !newPassword || newPassword.length < 8) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const record = await prisma.passwordResetToken.findUnique({ where: { token } })
  if (!record || record.used || record.expiresAt < new Date()) {
    return NextResponse.json({ error: 'Token invalid or expired' }, { status: 400 })
  }

  const passwordHash = await bcrypt.hash(newPassword, 12)
  await prisma.$transaction([
    prisma.user.update({ where: { id: record.userId }, data: { passwordHash, mustChangePassword: false } }),
    prisma.passwordResetToken.update({ where: { token }, data: { used: true } }),
  ])

  return NextResponse.json({ ok: true })
}


