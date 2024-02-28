/*
  Warnings:

  - The primary key for the `Album` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Album` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[albumId,userId]` on the table `Album` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Album" DROP CONSTRAINT "Album_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "Album_albumId_userId_key" ON "Album"("albumId", "userId");
