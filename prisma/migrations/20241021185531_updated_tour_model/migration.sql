/*
  Warnings:

  - A unique constraint covering the columns `[country,city]` on the table `Tour` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Tour" ADD COLUMN     "poster" TEXT,
ALTER COLUMN "state" SET DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Tour_country_city_key" ON "Tour"("country", "city");
