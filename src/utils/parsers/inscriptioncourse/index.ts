import { z } from 'zod';

export const inscriptionCourseInDTOSchema = () => {
  return z.object({
    userId: z.string().min(1).max(200),
    courseId: z.string().min(1).max(200),
  });
};

export const inscriptionCourseUpdateDTOSchema = () => {
  return z
    .object({
      userId: z.string().min(1).max(200),
      courseId: z.string().min(1).max(200),
      progressPercentage: z.coerce.number().min(0).max(100),
      score: z.coerce.number().min(0).nullable(),
      active: z.coerce.boolean(),
    })
    .partial();
};
