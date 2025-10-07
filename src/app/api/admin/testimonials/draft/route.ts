import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const items = await prisma.testimonialDraft.findMany({ orderBy: { sortOrder: 'asc' } })
  return NextResponse.json({ items })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email || session.user.email !== 'nhungconsultancy@gmail.com') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json()
  const created = await prisma.testimonialDraft.create({
    data: {
      quote: String(body.quote ?? ''),
      author: String(body.author ?? ''),
      role: body.role ?? null,
      avatarPath: body.avatarPath ?? null,
      sortOrder: Number(body.sortOrder ?? 0),
      hidden: Boolean(body.hidden ?? false),
    },
  })
  return NextResponse.json({ item: created })
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email || session.user.email !== 'nhungconsultancy@gmail.com') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json()
  const updated = await prisma.testimonialDraft.update({
    where: { id: String(body.id) },
    data: {
      quote: body.quote,
      author: body.author,
      role: body.role,
      avatarPath: body.avatarPath,
      sortOrder: body.sortOrder,
      hidden: body.hidden,
    },
  })
  return NextResponse.json({ item: updated })
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email || session.user.email !== 'nhungconsultancy@gmail.com') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  await prisma.testimonialDraft.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}


