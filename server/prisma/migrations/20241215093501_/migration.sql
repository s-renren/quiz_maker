/*
  Warnings:

  - You are about to drop the column `choiceA` on the `Work` table. All the data in the column will be lost.
  - You are about to drop the column `choiceB` on the `Work` table. All the data in the column will be lost.
  - You are about to drop the column `choiceC` on the `Work` table. All the data in the column will be lost.
  - You are about to drop the column `choiceD` on the `Work` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Work" DROP COLUMN "choiceA",
DROP COLUMN "choiceB",
DROP COLUMN "choiceC",
DROP COLUMN "choiceD";
