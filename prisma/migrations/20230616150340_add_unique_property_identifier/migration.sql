/*
  Warnings:

  - A unique constraint covering the columns `[identifier]` on the table `leads` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `leads_identifier_key` ON `leads`(`identifier`);
