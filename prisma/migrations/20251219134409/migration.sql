/*
  Warnings:

  - You are about to drop the `View` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "View" DROP CONSTRAINT "View_courseId_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "View";

-- CreateTable
CREATE TABLE "ViewLog" (
    "courseId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ViewLog_courseId_userId_key" ON "ViewLog"("courseId", "userId");
