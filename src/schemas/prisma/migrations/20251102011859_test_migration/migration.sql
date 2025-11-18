-- CreateEnum
CREATE TYPE "CourseLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');

-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('DRAFT', 'UNDER_REVIEW', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('SUBMITTED', 'GRADED', 'PENDING');

-- CreateEnum
CREATE TYPE "LearningTechnique" AS ENUM ('VISUAL', 'AUDITORY', 'KINESTHETIC', 'READING_WRITING', 'GAMIFICATION', 'STORYTELLING', 'CASE_STUDY', 'PROBLEM_SOLVING', 'COLLABORATIVE', 'SELF_PACED');

-- CreateEnum
CREATE TYPE "LessonContentType" AS ENUM ('TEXT', 'VIDEO_SCRIPT', 'SLIDES', 'INTERACTIVE', 'CODE_EXAMPLE', 'INFOGRAPHIC', 'DIAGRAM', 'READING', 'EXERCISE', 'CASE_STUDY');

-- CreateEnum
CREATE TYPE "LessonType" AS ENUM ('THEORY', 'PRACTICE', 'MIXED', 'PROJECT', 'CASE_STUDY', 'DISCUSSION');

-- CreateEnum
CREATE TYPE "AssignmentType" AS ENUM ('PDF', 'PICTURE', 'CODE', 'LINK', 'TEXT');

-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('PDF', 'PICTURE', 'CODE', 'LINK', 'TEXT', 'VIDEO', 'AUDIO', 'INTERACTIVE', 'DIAGRAM', 'SIMULATION', 'NOTEBOOK', 'DATASET');

-- CreateEnum
CREATE TYPE "DiscriminantResource" AS ENUM ('SUBMISSION', 'QUIZ_QUESTION', 'QUIZ_OPTION', 'LESSON');

-- CreateTable
CREATE TABLE "Courses" (
    "id_course" TEXT NOT NULL,
    "instructor_id" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "price" DOUBLE PRECISION NOT NULL,
    "average_reviews" DOUBLE PRECISION NOT NULL,
    "total_reviews" INTEGER NOT NULL,
    "total_enrollments" INTEGER NOT NULL,
    "duration_hours" INTEGER NOT NULL,
    "total_lessons" INTEGER NOT NULL,
    "level" "CourseLevel" NOT NULL,
    "status" "CourseStatus" NOT NULL,
    "published_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "ai_generated" BOOLEAN NOT NULL,
    "generation_task_id" TEXT,
    "generation_metadata" JSONB,
    "last_ai_update_at" TIMESTAMP(3),

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("id_course")
);

-- CreateTable
CREATE TABLE "FavouritesCourses" (
    "user_id" TEXT NOT NULL,
    "course_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FavouritesCourses_pkey" PRIMARY KEY ("user_id","course_id")
);

-- AddForeignKey
ALTER TABLE "FavouritesCourses" ADD CONSTRAINT "FavouritesCourses_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("id_course") ON DELETE CASCADE ON UPDATE CASCADE;
