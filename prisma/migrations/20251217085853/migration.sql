-- AlterTable
ALTER TABLE "User" ADD COLUMN     "budget" INTEGER,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "interests" TEXT[],
ADD COLUMN     "name" TEXT,
ADD COLUMN     "profileImageUrl" TEXT,
ADD COLUMN     "region" TEXT;
