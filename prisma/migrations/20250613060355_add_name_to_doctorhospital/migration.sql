/*
  Warnings:

  - Added the required column `firstname` to the `DoctorHospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `DoctorHospital` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" ALTER COLUMN "doctorid" DROP NOT NULL;

-- AlterTable
ALTER TABLE "DoctorHospital" ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL;
