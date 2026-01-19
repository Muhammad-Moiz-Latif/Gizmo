/*
  Warnings:

  - Added the required column `Condition` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SerialNumber` to the `Device` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "Condition" TEXT NOT NULL,
ADD COLUMN     "SerialNumber" TEXT NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';
