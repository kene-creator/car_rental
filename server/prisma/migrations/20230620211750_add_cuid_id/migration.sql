/*
  Warnings:

  - You are about to drop the `Paystack_Payment_Reference` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Paystack_Payment_Reference";

-- CreateTable
CREATE TABLE "paystack_payment_references" (
    "id" UUID NOT NULL,
    "authorizationUrl" TEXT NOT NULL,
    "accessCode" TEXT NOT NULL,
    "reference" TEXT NOT NULL,

    CONSTRAINT "paystack_payment_references_pkey" PRIMARY KEY ("id")
);
