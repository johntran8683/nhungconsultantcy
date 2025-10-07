"use server"

import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

function ensureAdmin(session: any) {
  if (!session?.user?.email || session.user.email !== 'nhungconsultancy@gmail.com') {
    throw new Error('Unauthorized')
  }
}

export const saveHomepageDraft = async (input: unknown) => {
  const session = await getServerSession(authOptions)
  ensureAdmin(session)
  const schema = z.object({
    headline: z.string().min(3),
    subheadline: z.string().optional(),
    primaryCtaText: z.string().optional(),
    primaryCtaUrl: z.string().optional(),
    secondaryCtaText: z.string().optional(),
    secondaryCtaUrl: z.string().optional(),
  })
  const data = schema.parse(input)
  const draft = await prisma.homepageDraft.upsert({
    where: { id: 'singleton' },
    update: data,
    create: { id: 'singleton', ...data },
  })
  await prisma.auditLog.create({ data: { userId: 'admin', action: 'save_draft', entity: 'homepage', entityId: draft.id } })
  return { ok: true }
}

export const publishHomepage = async () => {
  const session = await getServerSession(authOptions)
  ensureAdmin(session)
  const draft = await prisma.homepageDraft.findUnique({ where: { id: 'singleton' } })
  if (!draft) throw new Error('No draft to publish')
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
  return { ok: true }
}

export const saveMetricsDraft = async (input: unknown) => {
  const session = await getServerSession(authOptions)
  ensureAdmin(session)
  const schema = z.object({
    yearsExperience: z.coerce.number().min(0),
    projectsLed: z.coerce.number().min(0),
    countries: z.coerce.number().min(0),
    portfolioCurrency: z.string().default('USD'),
    portfolioValue: z.coerce.bigint().min(0n),
  })
  const data = schema.parse(input)
  const draft = await prisma.metricsDraft.upsert({
    where: { id: 'singleton' },
    update: data,
    create: { id: 'singleton', ...data },
  })
  await prisma.auditLog.create({ data: { userId: 'admin', action: 'save_draft', entity: 'metrics', entityId: draft.id } })
  return { ok: true }
}

export const publishMetrics = async () => {
  const session = await getServerSession(authOptions)
  ensureAdmin(session)
  const draft = await prisma.metricsDraft.findUnique({ where: { id: 'singleton' } })
  if (!draft) throw new Error('No draft to publish')
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
  return { ok: true }
}


