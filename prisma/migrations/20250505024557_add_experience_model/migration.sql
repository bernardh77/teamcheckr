/*
  Warnings:

  - You are about to drop the column `description` on the `Experience` table. All the data in the column will be lost.
  - Added the required column `company` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logoUrl` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Experience` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "description",
ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "isCurrent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "logoUrl" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL;
