-- AlterTable
ALTER TABLE "paystack_payment_references" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "paystack_transaction_verification" (
    "id" TEXT NOT NULL,
    "transactionId" BIGINT NOT NULL,
    "domain" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "gateway_response" TEXT NOT NULL,
    "paid_at" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL,
    "mobile" BOOLEAN NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT NOT NULL,
    "customer_code" TEXT NOT NULL,

    CONSTRAINT "paystack_transaction_verification_pkey" PRIMARY KEY ("id")
);
