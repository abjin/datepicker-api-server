-- DropForeignKey
ALTER TABLE "Place" DROP CONSTRAINT "Place_courseId_fkey";

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
