/*
  Warnings:

  - You are about to drop the column `deviceId` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_deviceId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "deviceId";

-- CreateTable
CREATE TABLE "_DeviceToTransaction" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DeviceToTransaction_AB_unique" ON "_DeviceToTransaction"("A", "B");

-- CreateIndex
CREATE INDEX "_DeviceToTransaction_B_index" ON "_DeviceToTransaction"("B");

-- AddForeignKey
ALTER TABLE "_DeviceToTransaction" ADD CONSTRAINT "_DeviceToTransaction_A_fkey" FOREIGN KEY ("A") REFERENCES "Device"("DeviceId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeviceToTransaction" ADD CONSTRAINT "_DeviceToTransaction_B_fkey" FOREIGN KEY ("B") REFERENCES "Transaction"("TransactionId") ON DELETE CASCADE ON UPDATE CASCADE;
