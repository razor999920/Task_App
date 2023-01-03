-- CreateTable
CREATE TABLE "task" (
    "task_id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "compeleted" BOOLEAN NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("task_id")
);
