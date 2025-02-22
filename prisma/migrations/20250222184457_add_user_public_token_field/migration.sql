/*
  Warnings:

  - A unique constraint covering the columns `[public_token]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - The required column `public_token` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "public_token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_public_token_key" ON "User"("public_token");
