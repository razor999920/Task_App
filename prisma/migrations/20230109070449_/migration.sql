/*
  Warnings:

  - You are about to alter the column `name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `age` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.
  - You are about to alter the column `email` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `password` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "age" SET DATA TYPE SMALLINT,
ALTER COLUMN "create_date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "create_date" SET DATA TYPE DATE,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255);
