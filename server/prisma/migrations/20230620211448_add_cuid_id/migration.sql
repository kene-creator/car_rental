-- CreateTable
CREATE TABLE "Paystack_Payment_Reference" (
    "id" UUID NOT NULL,
    "authorizationUrl" TEXT NOT NULL,
    "accessCode" TEXT NOT NULL,
    "reference" TEXT NOT NULL,

    CONSTRAINT "Paystack_Payment_Reference_pkey" PRIMARY KEY ("id")
);
