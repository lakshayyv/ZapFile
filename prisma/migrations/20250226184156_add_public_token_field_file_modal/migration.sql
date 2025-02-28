/*
  Warnings:

  - Added the required column `public_token` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "File" ADD COLUMN     "public_token" TEXT NOT NULL;
