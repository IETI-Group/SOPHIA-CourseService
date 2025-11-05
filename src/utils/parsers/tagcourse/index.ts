import { z } from 'zod';

export const tagCourseInDTOSchema = () => {
  return z.object({
    categoryId: z.string().min(1).max(200),
    courseId: z.string().min(1).max(200),
  });
};

export const tagCourseUpdateDTOSchema = () => {
  return tagCourseInDTOSchema().partial();
};
