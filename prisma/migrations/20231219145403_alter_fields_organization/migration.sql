/*
  Warnings:

  - You are about to drop the column `address` on the `organizations` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `organizations` table. All the data in the column will be lost.
  - Added the required column `city` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "address",
DROP COLUMN "number",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "phone" INTEGER NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
