/*
  Warnings:

  - You are about to drop the column `universityId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `universityId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `University` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_universityId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_universityId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "universityId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "universityId";

-- DropTable
DROP TABLE "University";
