-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "base";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "transactional";

-- CreateTable
CREATE TABLE "base"."users" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "emailToken" TEXT,
    "emailvalid" BOOLEAN DEFAULT false,
    "firstName" TEXT,
    "lastName" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."bookmarks" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."cars" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "thumbnailSrc" TEXT,
    "name" TEXT NOT NULL,
    "gearType" TEXT NOT NULL,
    "gasTank" TEXT NOT NULL,
    "passenger" TEXT NOT NULL,
    "dailyPrice" TEXT NOT NULL,
    "monthlyPrice" TEXT NOT NULL,
    "discountPrice" TEXT,
    "vehicle" TEXT NOT NULL,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."popular_cars" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "thumbnailSrc" TEXT,
    "name" TEXT NOT NULL,
    "gearType" TEXT NOT NULL,
    "gasTank" TEXT NOT NULL,
    "passenger" TEXT NOT NULL,
    "dailyPrice" TEXT NOT NULL,
    "monthlyPrice" TEXT NOT NULL,
    "discountPrice" TEXT,
    "vehicle" TEXT NOT NULL,

    CONSTRAINT "popular_cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."user_cars" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "carId" INTEGER NOT NULL,

    CONSTRAINT "user_cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactional"."paystack_payment_references" (
    "id" TEXT NOT NULL,
    "authorizationUrl" TEXT NOT NULL,
    "accessCode" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "paystack_payment_references_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactional"."paystack_transaction_verification" (
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
    "success_status" BOOLEAN NOT NULL,
    "authorization_code" TEXT NOT NULL,
    "card_type" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "mobile" BOOLEAN NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT NOT NULL,
    "customer_code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "paystack_transaction_verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactional"."rental_data" (
    "id" TEXT NOT NULL,
    "pick_up_location" TEXT NOT NULL,
    "pick_up_date" TEXT NOT NULL,
    "pick_up_time" TEXT NOT NULL,
    "drop_off_location" TEXT NOT NULL,
    "drop_off_date" TEXT NOT NULL,
    "drop_off_time" TEXT NOT NULL,

    CONSTRAINT "rental_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "base"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_emailToken_key" ON "base"."users"("emailToken");

-- AddForeignKey
ALTER TABLE "base"."bookmarks" ADD CONSTRAINT "bookmarks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "base"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."user_cars" ADD CONSTRAINT "user_cars_carId_fkey" FOREIGN KEY ("carId") REFERENCES "base"."cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."user_cars" ADD CONSTRAINT "user_cars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "base"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
