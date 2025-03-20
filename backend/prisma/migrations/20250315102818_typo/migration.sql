/*
  Warnings:

  - You are about to drop the column `published_data` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "published_data",
ADD COLUMN     "published_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
