/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `cats` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "cats" ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "cats_username_key" ON "cats"("username");
