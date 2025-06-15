/*
  Warnings:

  - Made the column `position` on table `Section` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Section" ALTER COLUMN "position" SET NOT NULL;
