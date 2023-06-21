/*
  Warnings:

  - Added the required column `authorization_code` to the `paystack_transaction_verification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `success_status` to the `paystack_transaction_verification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "paystack_transaction_verification" ADD COLUMN     "authorization_code" TEXT NOT NULL,
ADD COLUMN     "success_status" BOOLEAN NOT NULL;
