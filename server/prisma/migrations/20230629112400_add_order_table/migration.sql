-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "order";

-- CreateTable
CREATE TABLE "order"."order_status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "order_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order"."order" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "statusId" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order"."order" ADD CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "base"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order"."order" ADD CONSTRAINT "order_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "order"."order_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
