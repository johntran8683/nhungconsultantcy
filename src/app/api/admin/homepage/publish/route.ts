import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function POST() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email || session.user.email !== 'nhungconsultancy@gmail.com') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const draft = await prisma.homepageDraft.findUnique({ where: { id: 'singleton' } })
  if (!draft) return NextResponse.json({ error: 'No draft' }, { status: 400 })
  await prisma.homepagePublished.upsert({
    where: { id: 'singleton' },
    update: {
      headline: draft.headline,
      subheadline: draft.subheadline,
      primaryCtaText: draft.primaryCtaText,
      primaryCtaUrl: draft.primaryCtaUrl,
      secondaryCtaText: draft.secondaryCtaText,
      secondaryCtaUrl: draft.secondaryCtaUrl,
    },
    create: {
      id: 'singleton',
      headline: draft.headline,
      subheadline: draft.subheadline,
      primaryCtaText: draft.primaryCtaText,
      primaryCtaUrl: draft.primaryCtaUrl,
      secondaryCtaText: draft.secondaryCtaText,
      secondaryCtaUrl: draft.secondaryCtaUrl,
    },
  })
  await prisma.auditLog.create({ data: { userId: 'admin', action: 'publish', entity: 'homepage', entityId: 'singleton' } })
  return NextResponse.json({ ok: true })
}


