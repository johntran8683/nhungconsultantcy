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
    yearsExperience: Number(body.yearsExperience ?? 0),
    projectsLed: Number(body.projectsLed ?? 0),
    countries: Number(body.countries ?? 0),
    portfolioCurrency: String(body.portfolioCurrency ?? 'USD'),
    portfolioValue: BigInt(body.portfolioValue ?? 0),
  }
  await prisma.metricsDraft.upsert({
    where: { id: 'singleton' },
    update: data,
    create: { id: 'singleton', ...data },
  })
  await prisma.auditLog.create({ data: { userId: 'admin', action: 'save_draft', entity: 'metrics', entityId: 'singleton' } })
  return NextResponse.json({ ok: true })
}

export async function GET() {
  const draft = await prisma.metricsDraft.findUnique({ where: { id: 'singleton' } })
  return NextResponse.json({ draft })
}


