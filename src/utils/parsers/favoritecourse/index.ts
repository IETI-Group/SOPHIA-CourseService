import { z } from 'zod';

export const favoriteCourseInDTOSchema = () => {
  return z.object({
    userId: z.string().min(1).max(200),
    courseId: z.string().min(1).max(200),
  });
};
