/*
  Warnings:

  - The primary key for the `task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "task" DROP CONSTRAINT "task_pkey",
ALTER COLUMN "task_id" SET DATA TYPE BIGSERIAL,
ADD CONSTRAINT "task_pkey" PRIMARY KEY ("task_id");

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ALTER COLUMN "user_id" SET DATA TYPE BIGSERIAL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("user_id");

-- CreateTable
CREATE TABLE "refresh_token" (
    "refresh_token_id" TEXT NOT NULL,
    "hashed_token" TEXT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "revokded" BOOLEAN NOT NULL DEFAULT false,
    "create_date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_date" DATE NOT NULL,

    CONSTRAINT "refresh_token_pkey" PRIMARY KEY ("refresh_token_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_refresh_token_id_key" ON "refresh_token"("refresh_token_id");

-- AddForeignKey
ALTER TABLE "refresh_token" ADD CONSTRAINT "refresh_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
