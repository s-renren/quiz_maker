/*
  Warnings:

  - Added the required column `authorId` to the `Work` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Work" ADD COLUMN     "authorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
