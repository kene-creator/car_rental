/*
  Warnings:

  - You are about to drop the column `mileage` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `cars` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "cars" DROP CONSTRAINT "cars_userId_fkey";

-- AlterTable
ALTER TABLE "cars" DROP COLUMN "mileage",
DROP COLUMN "userId",
ALTER COLUMN "discountPrice" DROP NOT NULL;

-- CreateTable
CREATE TABLE "user_cars" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "carId" INTEGER NOT NULL,

    CONSTRAINT "user_cars_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_cars" ADD CONSTRAINT "user_cars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_cars" ADD CONSTRAINT "user_cars_carId_fkey" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
