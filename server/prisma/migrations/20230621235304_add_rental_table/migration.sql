-- CreateTable
CREATE TABLE "rental_data" (
    "id" TEXT NOT NULL,
    "pick_up_location" TEXT NOT NULL,
    "pick_up_date" TEXT NOT NULL,
    "pick_up_time" TEXT NOT NULL,
    "drop_off_location" TEXT NOT NULL,
    "drop_off_date" TEXT NOT NULL,
    "drop_off_time" TEXT NOT NULL,

    CONSTRAINT "rental_data_pkey" PRIMARY KEY ("id")
);
