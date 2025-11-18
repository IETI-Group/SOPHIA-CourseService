/*
  Warnings:

  - The primary key for the `FavouritesCourses` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Courses" ALTER COLUMN "instructor_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "FavouritesCourses" DROP CONSTRAINT "FavouritesCourses_pkey",
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "FavouritesCourses_pkey" PRIMARY KEY ("user_id", "course_id");

-- AlterTable
ALTER TABLE "Inscriptions" ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "score" DROP NOT NULL,
ALTER COLUMN "score" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Sections" (
    "id_section" TEXT NOT NULL,
    "course_id" VARCHAR(36) NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL,
    "duration_hours" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ai_generated" BOOLEAN NOT NULL DEFAULT false,
    "generation_task_id" TEXT,
    "suggested_by_ai" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Sections_pkey" PRIMARY KEY ("id_section")
);

-- CreateTable
CREATE TABLE "Lessons" (
    "id_lesson" TEXT NOT NULL,
    "section_id" VARCHAR(36) NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration_minutes" INTEGER NOT NULL,
    "ai_generated" BOOLEAN NOT NULL DEFAULT false,
    "generation_task_id" TEXT,
    "lesson_type" "LessonType" NOT NULL,
    "estimated_difficulty" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Lessons_pkey" PRIMARY KEY ("id_lesson")
);

-- CreateTable
CREATE TABLE "Assignments" (
    "id_assignment" TEXT NOT NULL,
    "lesson_id" VARCHAR(36) NOT NULL,
    "title" VARCHAR(60) NOT NULL,
    "instructions" TEXT NOT NULL,
    "max_file_size_mb" INTEGER NOT NULL,
    "allowed_types" "AssignmentType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "due_date" TIMESTAMP(3) NOT NULL,
    "max_score" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Assignments_pkey" PRIMARY KEY ("id_assignment")
);

-- CreateTable
CREATE TABLE "Submissions" (
    "id_submission" TEXT NOT NULL,
    "assignment_id" VARCHAR(36) NOT NULL,
    "user_id" TEXT NOT NULL,
    "feedback" TEXT,
    "greated_at" TIMESTAMP(3),
    "submitted_at" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT false,
    "score" DOUBLE PRECISION,
    "status" "SubmissionStatus" NOT NULL,

    CONSTRAINT "Submissions_pkey" PRIMARY KEY ("id_submission")
);

-- CreateTable
CREATE TABLE "Quizzes" (
    "id_quiz" TEXT NOT NULL,
    "section_id" VARCHAR(36) NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "title" VARCHAR(60) NOT NULL,
    "duration_minutes" INTEGER NOT NULL,
    "ai_generated" BOOLEAN NOT NULL DEFAULT false,
    "generation_task_id" TEXT,
    "difficulty_distribution" JSONB,
    "adaptative_logic" JSONB,

    CONSTRAINT "Quizzes_pkey" PRIMARY KEY ("id_quiz")
);

-- CreateTable
CREATE TABLE "QuizAttempts" (
    "id_quiz_attempt" TEXT NOT NULL,
    "quiz_id" VARCHAR(36) NOT NULL,
    "user_id" TEXT NOT NULL,
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "grade" DOUBLE PRECISION,
    "duration_minutes" INTEGER NOT NULL,

    CONSTRAINT "QuizAttempts_pkey" PRIMARY KEY ("id_quiz_attempt")
);

-- CreateTable
CREATE TABLE "QuizQuestions" (
    "id_quiz_question" TEXT NOT NULL,
    "quiz_id" VARCHAR(36) NOT NULL,
    "question" TEXT NOT NULL,
    "duration_minutes" INTEGER NOT NULL,

    CONSTRAINT "QuizQuestions_pkey" PRIMARY KEY ("id_quiz_question")
);

-- CreateTable
CREATE TABLE "QuizOptions" (
    "id_option" TEXT NOT NULL,
    "quiz_question_id" VARCHAR(36) NOT NULL,
    "option" TEXT NOT NULL,
    "is_correct" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "QuizOptions_pkey" PRIMARY KEY ("id_option")
);

-- CreateTable
CREATE TABLE "LessonContents" (
    "id_lesson_content" TEXT NOT NULL,
    "lesson_id" VARCHAR(36) NOT NULL,
    "metadata" JSONB NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "difficulty_level" "DifficultyLevel" NOT NULL,
    "learning_technique" "LearningTechnique" NOT NULL,
    "order_preference" INTEGER,
    "ai_generated" BOOLEAN NOT NULL,
    "generation_log_id" TEXT,
    "content_type" "LessonContentType" NOT NULL,
    "version" INTEGER NOT NULL,
    "parent_content_id" VARCHAR(36),
    "is_current_version" BOOLEAN NOT NULL,

    CONSTRAINT "LessonContents_pkey" PRIMARY KEY ("id_lesson_content")
);

-- CreateTable
CREATE TABLE "LessonContentProgress" (
    "id_content_progress" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "lesson_content_id" VARCHAR(36) NOT NULL,
    "started_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "time_spend_minutes" INTEGER NOT NULL DEFAULT 0,
    "completion_percentage" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "effectiviness_score" DOUBLE PRECISION NOT NULL,
    "active" BOOLEAN NOT NULL,
    "user_rating" INTEGER,

    CONSTRAINT "LessonContentProgress_pkey" PRIMARY KEY ("id_content_progress")
);

-- CreateTable
CREATE TABLE "LessonAISpecs" (
    "id_lesson_spec" TEXT NOT NULL,
    "lesson_content_id" VARCHAR(36) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "generation_prompt_summary" TEXT NOT NULL,
    "content_structure" JSONB NOT NULL,
    "estimated_video_duration_mins" INTEGER,
    "video_script" TEXT,
    "video_generation_instructions" JSONB,
    "interactive_elements" JSONB,
    "exercise_parameters" JSONB,

    CONSTRAINT "LessonAISpecs_pkey" PRIMARY KEY ("id_lesson_spec")
);

-- CreateTable
CREATE TABLE "Resources" (
    "id_resource" TEXT NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "type" "ResourceType" NOT NULL,
    "url" VARCHAR(300),
    "content" TEXT,
    "order" INTEGER NOT NULL,
    "duration_seconds" INTEGER NOT NULL,
    "file_size_mb" DOUBLE PRECISION NOT NULL,
    "mime_type" VARCHAR(100),
    "thumnail_url" VARCHAR(300),
    "metadata" JSONB NOT NULL,

    CONSTRAINT "Resources_pkey" PRIMARY KEY ("id_resource")
);

-- CreateTable
CREATE TABLE "QuizOptionResources" (
    "id_resource" TEXT NOT NULL,
    "quiz_option_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "QuizOptionResources_pkey" PRIMARY KEY ("id_resource")
);

-- CreateTable
CREATE TABLE "QuizQuestionResources" (
    "id_resource" TEXT NOT NULL,
    "quiz_question_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "QuizQuestionResources_pkey" PRIMARY KEY ("id_resource")
);

-- CreateTable
CREATE TABLE "SubmissionResources" (
    "id_resource" TEXT NOT NULL,
    "submission_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "SubmissionResources_pkey" PRIMARY KEY ("id_resource")
);

-- CreateTable
CREATE TABLE "LessonResources" (
    "id_resource" TEXT NOT NULL,
    "lesson_content_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "LessonResources_pkey" PRIMARY KEY ("id_resource")
);

-- CreateIndex
CREATE INDEX "Sections_course_id_idx" ON "Sections"("course_id");

-- CreateIndex
CREATE INDEX "Sections_course_id_order_idx" ON "Sections"("course_id", "order");

-- CreateIndex
CREATE INDEX "Sections_active_idx" ON "Sections"("active");

-- CreateIndex
CREATE INDEX "Lessons_section_id_idx" ON "Lessons"("section_id");

-- CreateIndex
CREATE INDEX "Lessons_section_id_order_idx" ON "Lessons"("section_id", "order");

-- CreateIndex
CREATE INDEX "Lessons_active_idx" ON "Lessons"("active");

-- CreateIndex
CREATE INDEX "Assignments_lesson_id_idx" ON "Assignments"("lesson_id");

-- CreateIndex
CREATE INDEX "Assignments_due_date_idx" ON "Assignments"("due_date");

-- CreateIndex
CREATE INDEX "Assignments_active_idx" ON "Assignments"("active");

-- CreateIndex
CREATE INDEX "Submissions_user_id_idx" ON "Submissions"("user_id");

-- CreateIndex
CREATE INDEX "Submissions_assignment_id_idx" ON "Submissions"("assignment_id");

-- CreateIndex
CREATE INDEX "Submissions_status_idx" ON "Submissions"("status");

-- CreateIndex
CREATE INDEX "Submissions_user_id_assignment_id_idx" ON "Submissions"("user_id", "assignment_id");

-- CreateIndex
CREATE INDEX "Quizzes_section_id_idx" ON "Quizzes"("section_id");

-- CreateIndex
CREATE INDEX "Quizzes_active_idx" ON "Quizzes"("active");

-- CreateIndex
CREATE INDEX "QuizAttempts_user_id_idx" ON "QuizAttempts"("user_id");

-- CreateIndex
CREATE INDEX "QuizAttempts_quiz_id_idx" ON "QuizAttempts"("quiz_id");

-- CreateIndex
CREATE INDEX "QuizAttempts_user_id_quiz_id_idx" ON "QuizAttempts"("user_id", "quiz_id");

-- CreateIndex
CREATE INDEX "QuizQuestions_quiz_id_idx" ON "QuizQuestions"("quiz_id");

-- CreateIndex
CREATE INDEX "QuizOptions_quiz_question_id_idx" ON "QuizOptions"("quiz_question_id");

-- CreateIndex
CREATE INDEX "LessonContents_lesson_id_idx" ON "LessonContents"("lesson_id");

-- CreateIndex
CREATE INDEX "LessonContents_active_idx" ON "LessonContents"("active");

-- CreateIndex
CREATE INDEX "LessonContents_is_current_version_idx" ON "LessonContents"("is_current_version");

-- CreateIndex
CREATE INDEX "LessonContents_lesson_id_is_current_version_idx" ON "LessonContents"("lesson_id", "is_current_version");

-- CreateIndex
CREATE INDEX "LessonContentProgress_user_id_idx" ON "LessonContentProgress"("user_id");

-- CreateIndex
CREATE INDEX "LessonContentProgress_lesson_content_id_idx" ON "LessonContentProgress"("lesson_content_id");

-- CreateIndex
CREATE INDEX "LessonContentProgress_completed_at_idx" ON "LessonContentProgress"("completed_at");

-- CreateIndex
CREATE UNIQUE INDEX "LessonContentProgress_user_id_lesson_content_id_key" ON "LessonContentProgress"("user_id", "lesson_content_id");

-- CreateIndex
CREATE INDEX "LessonAISpecs_lesson_content_id_idx" ON "LessonAISpecs"("lesson_content_id");

-- CreateIndex
CREATE INDEX "Categories_active_idx" ON "Categories"("active");

-- CreateIndex
CREATE INDEX "Categories_parent_category_idx" ON "Categories"("parent_category");

-- CreateIndex
CREATE INDEX "Courses_instructor_id_idx" ON "Courses"("instructor_id");

-- CreateIndex
CREATE INDEX "Courses_status_idx" ON "Courses"("status");

-- CreateIndex
CREATE INDEX "Courses_active_idx" ON "Courses"("active");

-- CreateIndex
CREATE INDEX "Courses_level_idx" ON "Courses"("level");

-- CreateIndex
CREATE INDEX "FavouritesCourses_user_id_idx" ON "FavouritesCourses"("user_id");

-- CreateIndex
CREATE INDEX "FavouritesCourses_course_id_idx" ON "FavouritesCourses"("course_id");

-- CreateIndex
CREATE INDEX "Inscriptions_user_id_idx" ON "Inscriptions"("user_id");

-- CreateIndex
CREATE INDEX "Inscriptions_course_id_idx" ON "Inscriptions"("course_id");

-- CreateIndex
CREATE INDEX "Inscriptions_user_id_course_id_idx" ON "Inscriptions"("user_id", "course_id");

-- CreateIndex
CREATE INDEX "Inscriptions_completed_idx" ON "Inscriptions"("completed");

-- CreateIndex
CREATE INDEX "Tags_course_id_idx" ON "Tags"("course_id");

-- CreateIndex
CREATE INDEX "Tags_category_id_idx" ON "Tags"("category_id");

-- AddForeignKey
ALTER TABLE "Sections" ADD CONSTRAINT "Sections_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("id_course") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lessons" ADD CONSTRAINT "Lessons_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "Sections"("id_section") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignments" ADD CONSTRAINT "Assignments_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lessons"("id_lesson") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_assignment_id_fkey" FOREIGN KEY ("assignment_id") REFERENCES "Assignments"("id_assignment") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quizzes" ADD CONSTRAINT "Quizzes_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "Sections"("id_section") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAttempts" ADD CONSTRAINT "QuizAttempts_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quizzes"("id_quiz") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizQuestions" ADD CONSTRAINT "QuizQuestions_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quizzes"("id_quiz") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizOptions" ADD CONSTRAINT "QuizOptions_quiz_question_id_fkey" FOREIGN KEY ("quiz_question_id") REFERENCES "QuizQuestions"("id_quiz_question") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonContents" ADD CONSTRAINT "LessonContents_parent_content_id_fkey" FOREIGN KEY ("parent_content_id") REFERENCES "LessonContents"("id_lesson_content") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonContents" ADD CONSTRAINT "LessonContents_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "Lessons"("id_lesson") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonContentProgress" ADD CONSTRAINT "LessonContentProgress_lesson_content_id_fkey" FOREIGN KEY ("lesson_content_id") REFERENCES "LessonContents"("id_lesson_content") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonAISpecs" ADD CONSTRAINT "LessonAISpecs_lesson_content_id_fkey" FOREIGN KEY ("lesson_content_id") REFERENCES "LessonContents"("id_lesson_content") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizOptionResources" ADD CONSTRAINT "QuizOptionResources_id_resource_fkey" FOREIGN KEY ("id_resource") REFERENCES "Resources"("id_resource") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizOptionResources" ADD CONSTRAINT "QuizOptionResources_quiz_option_id_fkey" FOREIGN KEY ("quiz_option_id") REFERENCES "QuizOptions"("id_option") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizQuestionResources" ADD CONSTRAINT "QuizQuestionResources_id_resource_fkey" FOREIGN KEY ("id_resource") REFERENCES "Resources"("id_resource") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizQuestionResources" ADD CONSTRAINT "QuizQuestionResources_quiz_question_id_fkey" FOREIGN KEY ("quiz_question_id") REFERENCES "QuizQuestions"("id_quiz_question") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionResources" ADD CONSTRAINT "SubmissionResources_id_resource_fkey" FOREIGN KEY ("id_resource") REFERENCES "Resources"("id_resource") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionResources" ADD CONSTRAINT "SubmissionResources_submission_id_fkey" FOREIGN KEY ("submission_id") REFERENCES "Submissions"("id_submission") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonResources" ADD CONSTRAINT "LessonResources_id_resource_fkey" FOREIGN KEY ("id_resource") REFERENCES "Resources"("id_resource") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonResources" ADD CONSTRAINT "LessonResources_lesson_content_id_fkey" FOREIGN KEY ("lesson_content_id") REFERENCES "LessonContents"("id_lesson_content") ON DELETE CASCADE ON UPDATE CASCADE;
