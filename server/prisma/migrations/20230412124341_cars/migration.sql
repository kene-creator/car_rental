-- CreateTable
CREATE TABLE "cars" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "thumbnailSrc" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gearType" TEXT NOT NULL,
    "gasTank" TEXT NOT NULL,
    "passenger" TEXT NOT NULL,
    "dailyPrice" TEXT NOT NULL,
    "monthlyPrice" TEXT NOT NULL,
    "discountPrice" TEXT NOT NULL,
    "vehicle" TEXT NOT NULL,
    "mileage" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
