/*
  Warnings:

  - You are about to drop the `_DeviceToTransaction` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `price` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_DeviceToTransaction" DROP CONSTRAINT "_DeviceToTransaction_A_fkey";

-- DropForeignKey
ALTER TABLE "_DeviceToTransaction" DROP CONSTRAINT "_DeviceToTransaction_B_fkey";

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "price" SET NOT NULL;

-- DropTable
DROP TABLE "_DeviceToTransaction";
