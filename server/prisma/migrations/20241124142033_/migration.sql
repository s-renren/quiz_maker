/*
  Warnings:

  - Made the column `displayName` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "displayName" SET NOT NULL;

-- CreateTable
CREATE TABLE "Work" (
    "id" TEXT NOT NULL,
    "quiz" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "Work_pkey" PRIMARY KEY ("id")
);
