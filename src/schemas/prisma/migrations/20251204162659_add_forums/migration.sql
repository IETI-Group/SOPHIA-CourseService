-- AlterEnum
ALTER TYPE "DiscriminantResource" ADD VALUE 'COURSE_INFO';

-- CreateTable
CREATE TABLE "CourseInfoResources" (
    "id_resource" TEXT NOT NULL,
    "course_id" VARCHAR(36) NOT NULL,

    CONSTRAINT "CourseInfoResources_pkey" PRIMARY KEY ("id_resource")
);

-- CreateTable
CREATE TABLE "CourseForum" (
    "id_forum" TEXT NOT NULL,
    "course_id" VARCHAR(36) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "comments_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CourseForum_pkey" PRIMARY KEY ("id_forum")
);

-- CreateTable
CREATE TABLE "ForumMessages" (
    "id_message" TEXT NOT NULL,
    "forum_id" VARCHAR(36) NOT NULL,
    "user_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parent_message_id" VARCHAR(36),

    CONSTRAINT "ForumMessages_pkey" PRIMARY KEY ("id_message")
);

-- CreateIndex
CREATE INDEX "CourseForum_course_id_idx" ON "CourseForum"("course_id");

-- CreateIndex
CREATE INDEX "ForumMessages_forum_id_idx" ON "ForumMessages"("forum_id");

-- CreateIndex
CREATE INDEX "ForumMessages_user_id_idx" ON "ForumMessages"("user_id");

-- CreateIndex
CREATE INDEX "ForumMessages_parent_message_id_idx" ON "ForumMessages"("parent_message_id");

-- AddForeignKey
ALTER TABLE "CourseInfoResources" ADD CONSTRAINT "CourseInfoResources_id_resource_fkey" FOREIGN KEY ("id_resource") REFERENCES "Resources"("id_resource") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseInfoResources" ADD CONSTRAINT "CourseInfoResources_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("id_course") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseForum" ADD CONSTRAINT "CourseForum_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Courses"("id_course") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumMessages" ADD CONSTRAINT "ForumMessages_forum_id_fkey" FOREIGN KEY ("forum_id") REFERENCES "CourseForum"("id_forum") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumMessages" ADD CONSTRAINT "ForumMessages_parent_message_id_fkey" FOREIGN KEY ("parent_message_id") REFERENCES "ForumMessages"("id_message") ON DELETE SET NULL ON UPDATE CASCADE;
