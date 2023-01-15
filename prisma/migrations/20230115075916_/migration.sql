/*
  Warnings:

  - You are about to drop the column `compeleted` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "compeleted",
ADD COLUMN     "completed" BOOLEAN;
