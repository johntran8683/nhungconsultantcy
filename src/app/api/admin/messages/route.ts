import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email || session.user.email !== 'nhungconsultancy@gmail.com') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const items = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 200 })
  const unread = await prisma.contactMessage.count({ where: { status: 'new' } })
  const res = NextResponse.json({ items, unread })
  res.headers.set('Cache-Control', 'no-store')
  return res
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email || session.user.email !== 'nhungconsultancy@gmail.com') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json()
  const { id, status } = body || {}
  if (!id || !['new', 'read'].includes(status)) return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  const updated = await prisma.contactMessage.update({ where: { id }, data: { status } })
  return NextResponse.json({ item: updated })
}


