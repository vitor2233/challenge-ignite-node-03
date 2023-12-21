/*
  Warnings:

  - You are about to drop the column `Age` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `Size` on the `pets` table. All the data in the column will be lost.
  - Added the required column `age` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "Age",
DROP COLUMN "Size",
ADD COLUMN     "age" TEXT NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL;
