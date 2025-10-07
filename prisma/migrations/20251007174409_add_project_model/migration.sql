-- AlterTable
ALTER TABLE "SiteSetting" ALTER COLUMN "senderEmail" SET DEFAULT 'contact@nhungconsultancy.com';

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "role" TEXT[],
    "impact" TEXT[],
    "templateId" TEXT NOT NULL,
    "statsValue" TEXT NOT NULL,
    "statsLabel" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ongoing',
    "progress" INTEGER,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
