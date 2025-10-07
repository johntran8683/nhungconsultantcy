import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function POST() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email || session.user.email !== 'nhungconsultancy@gmail.com') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const items = await prisma.partnerDraft.findMany({ where: { hidden: false }, orderBy: { sortOrder: 'asc' } })
  await prisma.$transaction([
    prisma.partnerPublished.deleteMany({}),
    prisma.partnerPublished.createMany({ data: items.map((i) => ({ name: i.name, url: i.url ?? undefined, logoPath: i.logoPath ?? undefined, sortOrder: i.sortOrder })) }),
  ])
  await prisma.auditLog.create({ data: { userId: 'admin', action: 'publish', entity: 'partners' } })
  return NextResponse.json({ ok: true })
}


