/*
  Warnings:

  - Added the required column `bookedAt` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grandTotal` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalDiscount` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."paymentMethodEnum" AS ENUM ('EWALLET', 'BANK', 'CASH');

-- AlterTable
ALTER TABLE "public"."Transaction" ADD COLUMN     "bookedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "grandTotal" INTEGER NOT NULL,
ADD COLUMN     "paymentMethod" "public"."paymentMethodEnum" NOT NULL,
ADD COLUMN     "totalDiscount" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."Voucher" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "usedByCustomerId" TEXT NOT NULL,

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Voucher_code_key" ON "public"."Voucher"("code");

-- AddForeignKey
ALTER TABLE "public"."Voucher" ADD CONSTRAINT "Voucher_usedByCustomerId_fkey" FOREIGN KEY ("usedByCustomerId") REFERENCES "public"."Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
