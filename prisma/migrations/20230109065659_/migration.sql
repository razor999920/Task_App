/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `password` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ALTER COLUMN "user_id" SET DATA TYPE BIGSERIAL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "create_date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "create_date" SET DATA TYPE DATE,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("user_id");
