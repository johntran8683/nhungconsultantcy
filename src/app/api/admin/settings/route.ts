import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const settings = await prisma.siteSetting.findUnique({ where: { id: 'default' } })
  return NextResponse.json({ settings })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email || session.user.email !== 'nhungconsultancy@gmail.com') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json()
  const allowed: any = {
    siteTitle: body.siteTitle,
    primaryColor: body.primaryColor,
    senderName: body.senderName,
    senderEmail: body.senderEmail,
    publicEmail: body.publicEmail,
    phone: body.phone,
    location: body.location,
    linkedinUrl: body.linkedinUrl,
    websiteUrl: body.websiteUrl,
    logoPath: body.logoPath,
    faviconPath: body.faviconPath,
  }
  Object.keys(allowed).forEach((k) => allowed[k] === undefined && delete allowed[k])
  const updated = await prisma.siteSetting.upsert({
    where: { id: 'default' },
    update: allowed,
    create: { id: 'default', ...allowed },
  })
  await prisma.auditLog.create({ data: { userId: 'admin', action: 'update_settings', entity: 'SiteSetting', entityId: 'default' } })
  return NextResponse.json({ settings: updated })
}


