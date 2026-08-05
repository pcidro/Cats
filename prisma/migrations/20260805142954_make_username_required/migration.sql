/*
  Warnings:

  - Made the column `username` on table `cats` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "cats" ALTER COLUMN "username" SET NOT NULL;
