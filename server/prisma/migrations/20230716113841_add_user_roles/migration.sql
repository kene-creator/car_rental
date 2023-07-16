/*
  Warnings:

  - The primary key for the `cars` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `popular_cars` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `total` on the `order` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- CreateEnum
CREATE TYPE "base"."UserRole" AS ENUM ('USER', 'ADMIN', 'MODERATOR');

-- DropForeignKey
ALTER TABLE "base"."user_cars" DROP CONSTRAINT "user_cars_carId_fkey";

-- AlterTable
ALTER TABLE "base"."cars" DROP CONSTRAINT "cars_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "cars_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "cars_id_seq";

-- AlterTable
ALTER TABLE "base"."popular_cars" DROP CONSTRAINT "popular_cars_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "popular_cars_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "popular_cars_id_seq";

-- AlterTable
ALTER TABLE "base"."users" ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "resetTokenExpiresAt" TIMESTAMP(3),
ADD COLUMN     "role" "base"."UserRole" NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "order"."order" DROP CONSTRAINT "order_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "total" SET DATA TYPE INTEGER,
ADD CONSTRAINT "order_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "order_id_seq";

-- AlterTable
ALTER TABLE "transactional"."paystack_transaction_verification" ALTER COLUMN "attempts" DROP NOT NULL,
ALTER COLUMN "success_status" DROP NOT NULL,
ALTER COLUMN "mobile" DROP NOT NULL;

-- CreateTable
CREATE TABLE "base"."_PaymentRefCars" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "transactional"."_PaymentRefPopularCars" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PaymentRefCars_AB_unique" ON "base"."_PaymentRefCars"("A", "B");

-- CreateIndex
CREATE INDEX "_PaymentRefCars_B_index" ON "base"."_PaymentRefCars"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PaymentRefPopularCars_AB_unique" ON "transactional"."_PaymentRefPopularCars"("A", "B");

-- CreateIndex
CREATE INDEX "_PaymentRefPopularCars_B_index" ON "transactional"."_PaymentRefPopularCars"("B");

-- AddForeignKey
ALTER TABLE "base"."_PaymentRefCars" ADD CONSTRAINT "_PaymentRefCars_A_fkey" FOREIGN KEY ("A") REFERENCES "base"."cars"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."_PaymentRefCars" ADD CONSTRAINT "_PaymentRefCars_B_fkey" FOREIGN KEY ("B") REFERENCES "transactional"."paystack_payment_references"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactional"."_PaymentRefPopularCars" ADD CONSTRAINT "_PaymentRefPopularCars_A_fkey" FOREIGN KEY ("A") REFERENCES "transactional"."paystack_payment_references"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactional"."_PaymentRefPopularCars" ADD CONSTRAINT "_PaymentRefPopularCars_B_fkey" FOREIGN KEY ("B") REFERENCES "base"."popular_cars"("id") ON DELETE CASCADE ON UPDATE CASCADE;
