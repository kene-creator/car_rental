-- CreateTable
CREATE TABLE "popular_cars" (
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
