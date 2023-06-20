/*
  Warnings:

  - The primary key for the `paystack_payment_references` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "paystack_payment_references" DROP CONSTRAINT "paystack_payment_references_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "paystack_payment_references_pkey" PRIMARY KEY ("id");
