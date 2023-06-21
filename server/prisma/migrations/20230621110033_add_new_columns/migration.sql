/*
  Warnings:

  - Added the required column `card_type` to the `paystack_transaction_verification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signature` to the `paystack_transaction_verification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "paystack_transaction_verification" ADD COLUMN     "card_type" TEXT NOT NULL,
ADD COLUMN     "signature" TEXT NOT NULL;
