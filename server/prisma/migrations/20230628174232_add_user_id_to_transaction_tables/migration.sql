/*
  Warnings:

  - Added the required column `userId` to the `paystack_payment_references` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `paystack_transaction_verification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactional"."paystack_payment_references" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "transactional"."paystack_transaction_verification" ADD COLUMN     "userId" TEXT NOT NULL;
