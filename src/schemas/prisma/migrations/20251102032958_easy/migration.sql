/*
  Warnings:

  - You are about to alter the column `instructor_id` on the `Courses` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(36)`.
  - You are about to alter the column `title` on the `Courses` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `generation_task_id` on the `Courses` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(36)`.
  - The primary key for the `FavouritesCourses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `user_id` on the `FavouritesCourses` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(36)`.
  - You are about to alter the column `course_id` on the `FavouritesCourses` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(36)`.
  - You are about to drop the `Match` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."FavouritesCourses" DROP CONSTRAINT "FavouritesCourses_course_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_matchId_fkey";

-- AlterTable
ALTER TABLE "Courses" ALTER COLUMN "instructor_id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "title" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "generation_task_id" SET DATA TYPE VARCHAR(36);

-- AlterTable
ALTER TABLE "FavouritesCourses" DROP CONSTRAINT "FavouritesCourses_pkey",
ALTER COLUMN "user_id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "course_id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "FavouritesCourses_pkey" PRIMARY KEY ("user_id", "course_id");

-- DropTable
DROP TABLE "public"."Match";

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "Inscriptions" (
    "id_inscription" TEXT NOT NULL,
    "user_id" VARCHAR(36) NOT NULL,
    "course_id" VARCHAR(36) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "progress_percentage" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "score" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "active" BOOLEAN NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Inscriptions_pkey" PRIMARY KEY ("id_inscription")
);

-- CreateTable
CREATE TABLE "Tags" (
    "category_id" VARCHAR(36) NOT NULL,
    "course_id" VARCHAR(36) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("category_id","course_id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id_category" TEXT NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "parent_category" VARCHAR(36),

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id_category")
);

-- CreateIndex
CREATE UNIQUE INDEX "Categories_name_key" ON "Categories"("name");

-- AddForeignKey
ALTER TABLE "FavouritesCourses" ADD CONSTRAINT "FavouritesCourses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("id_course") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscriptions" ADD CONSTRAINT "Inscriptions_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("id_course") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Categories"("id_category") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("id_course") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categories" ADD CONSTRAINT "Categories_parent_category_fkey" FOREIGN KEY ("parent_category") REFERENCES "Categories"("id_category") ON DELETE SET NULL ON UPDATE CASCADE;
