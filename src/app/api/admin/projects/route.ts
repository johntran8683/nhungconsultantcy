import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const items = await prisma.project.findMany({ 
    orderBy: { sortOrder: 'asc' }
    // Get all projects for admin management
  })
  return NextResponse.json({ items })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email || session.user.email !== 'nhungconsultancy@gmail.com') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const body = await req.json()
  const created = await prisma.project.create({
    data: {
      title: String(body.title ?? ''),
      client: String(body.client ?? ''),
      duration: String(body.duration ?? ''),
      overview: String(body.overview ?? ''),
      role: Array.isArray(body.role) ? body.role : [],
      impact: Array.isArray(body.impact) ? body.impact : [],
      templateId: String(body.templateId ?? 'blue-energy'),
      statsValue: String(body.statsValue ?? ''),
      statsLabel: String(body.statsLabel ?? ''),
      status: String(body.status ?? 'ongoing'),
      progress: body.status === 'ongoing' ? Number(body.progress ?? 0) : null,
      sortOrder: Number(body.sortOrder ?? 0),
      published: Boolean(body.published ?? false),
    },
  })
  
  await prisma.auditLog.create({ 
    data: { 
      userId: 'admin', 
      action: 'create', 
      entity: 'project', 
      entityId: created.id 
    } 
  })
  
  return NextResponse.json({ item: created })
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email || session.user.email !== 'nhungconsultancy@gmail.com') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const body = await req.json()
  const updated = await prisma.project.update({
    where: { id: String(body.id) },
    data: {
      title: body.title,
      client: body.client,
      duration: body.duration,
      overview: body.overview,
      role: Array.isArray(body.role) ? body.role : [],
      impact: Array.isArray(body.impact) ? body.impact : [],
      templateId: body.templateId,
      statsValue: body.statsValue,
      statsLabel: body.statsLabel,
      status: body.status,
      progress: body.status === 'ongoing' ? body.progress : null,
      sortOrder: body.sortOrder,
      published: body.published,
    },
  })
  
  await prisma.auditLog.create({ 
    data: { 
      userId: 'admin', 
      action: 'update', 
      entity: 'project', 
      entityId: updated.id 
    } 
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
  
  await prisma.project.delete({ where: { id } })
  
  await prisma.auditLog.create({ 
    data: { 
      userId: 'admin', 
      action: 'delete', 
      entity: 'project', 
      entityId: id 
    } 
  })
  
  return NextResponse.json({ ok: true })
}
