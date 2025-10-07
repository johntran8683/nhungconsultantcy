-- CreateTable
CREATE TABLE "SiteSetting" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "siteTitle" TEXT NOT NULL DEFAULT 'Nhung Consultancy',
    "primaryColor" TEXT NOT NULL DEFAULT '#2563eb',
    "senderName" TEXT NOT NULL DEFAULT 'Nhung Consultancy',
    "senderEmail" TEXT NOT NULL DEFAULT 'no-reply@localhost',
    "publicEmail" TEXT,
    "phone" TEXT,
    "location" TEXT,
    "linkedinUrl" TEXT,
    "websiteUrl" TEXT,
    "logoPath" TEXT,
    "faviconPath" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomepageDraft" (
    "id" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "subheadline" TEXT,
    "primaryCtaText" TEXT,
    "primaryCtaUrl" TEXT,
    "secondaryCtaText" TEXT,
    "secondaryCtaUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomepageDraft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomepagePublished" (
    "id" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "subheadline" TEXT,
    "primaryCtaText" TEXT,
    "primaryCtaUrl" TEXT,
    "secondaryCtaText" TEXT,
    "secondaryCtaUrl" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HomepagePublished_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetricsDraft" (
    "id" TEXT NOT NULL,
    "yearsExperience" INTEGER NOT NULL DEFAULT 0,
    "projectsLed" INTEGER NOT NULL DEFAULT 0,
    "countries" INTEGER NOT NULL DEFAULT 0,
    "portfolioCurrency" TEXT NOT NULL DEFAULT 'USD',
    "portfolioValue" BIGINT NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MetricsDraft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetricsPublished" (
    "id" TEXT NOT NULL,
    "yearsExperience" INTEGER NOT NULL,
    "projectsLed" INTEGER NOT NULL,
    "countries" INTEGER NOT NULL,
    "portfolioCurrency" TEXT NOT NULL,
    "portfolioValue" BIGINT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MetricsPublished_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerDraft" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT,
    "logoPath" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartnerDraft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerPublished" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT,
    "logoPath" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PartnerPublished_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestimonialDraft" (
    "id" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "role" TEXT,
    "avatarPath" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestimonialDraft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestimonialPublished" (
    "id" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "role" TEXT,
    "avatarPath" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TestimonialPublished_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asset" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Asset_path_key" ON "Asset"("path");
