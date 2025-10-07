import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function POST() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email || session.user.email !== 'nhungconsultancy@gmail.com') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const draft = await prisma.metricsDraft.findUnique({ where: { id: 'singleton' } })
  if (!draft) return NextResponse.json({ error: 'No draft' }, { status: 400 })
  await prisma.metricsPublished.upsert({
    where: { id: 'singleton' },
    update: {
      yearsExperience: draft.yearsExperience,
      projectsLed: draft.projectsLed,
      countries: draft.countries,
      portfolioCurrency: draft.portfolioCurrency,
      portfolioValue: draft.portfolioValue,
    },
    create: {
      id: 'singleton',
      yearsExperience: draft.yearsExperience,
      projectsLed: draft.projectsLed,
      countries: draft.countries,
      portfolioCurrency: draft.portfolioCurrency,
      portfolioValue: draft.portfolioValue,
    },
  })
  await prisma.auditLog.create({ data: { userId: 'admin', action: 'publish', entity: 'metrics', entityId: 'singleton' } })
  return NextResponse.json({ ok: true })
}


