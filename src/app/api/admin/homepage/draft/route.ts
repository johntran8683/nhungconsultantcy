import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email || session.user.email !== 'nhungconsultancy@gmail.com') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json()
  const data = {
    headline: String(body.headline ?? ''),
    subheadline: body.subheadline ?? null,
    primaryCtaText: body.primaryCtaText ?? null,
    primaryCtaUrl: body.primaryCtaUrl ?? null,
    secondaryCtaText: body.secondaryCtaText ?? null,
    secondaryCtaUrl: body.secondaryCtaUrl ?? null,
  }
  if (!data.headline || data.headline.length < 3) {
    return NextResponse.json({ error: 'Headline too short' }, { status: 400 })
  }
  await prisma.homepageDraft.upsert({
    where: { id: 'singleton' },
    update: data,
    create: { id: 'singleton', ...data },
  })
  await prisma.auditLog.create({ data: { userId: 'admin', action: 'save_draft', entity: 'homepage', entityId: 'singleton' } })
  return NextResponse.json({ ok: true })
}

export async function GET() {
  const draft = await prisma.homepageDraft.findUnique({ where: { id: 'singleton' } })
  return NextResponse.json({ draft })
}


