/*
  Warnings:

  - Made the column `completed` on table `task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "task" ALTER COLUMN "completed" SET NOT NULL,
ALTER COLUMN "completed" SET DEFAULT false;
