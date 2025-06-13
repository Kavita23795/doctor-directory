/*
  Warnings:

  - You are about to drop the `Doctor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DoctorHospital` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hospital` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DoctorHospital" DROP CONSTRAINT "DoctorHospital_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "DoctorHospital" DROP CONSTRAINT "DoctorHospital_hospitalId_fkey";

-- DropTable
DROP TABLE "Doctor";

-- DropTable
DROP TABLE "DoctorHospital";

-- DropTable
DROP TABLE "Hospital";

-- CreateTable
CREATE TABLE "doctor" (
    "id" SERIAL NOT NULL,
    "doctorid" INTEGER,
    "title" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "oncology" TEXT,
    "specialization" TEXT,
    "doctor_city" TEXT,
    "hospitalid" INTEGER NOT NULL,
    "hospital_name" TEXT NOT NULL,
    "addressfield1" TEXT,
    "addressfield2" TEXT,
    "hospital_city" TEXT,
    "state" TEXT,
    "pincode" INTEGER,
    "area" TEXT,
    "websitelink" TEXT,

    CONSTRAINT "doctor_pkey" PRIMARY KEY ("id")
);
