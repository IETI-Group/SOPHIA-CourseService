import { z } from 'zod';

export const sectionCourseInDTOSchema = () => {
  return z.object({
    courseId: z.string().min(1).max(200),
    title: z.string().min(1).max(500),
    description: z.string().min(1).max(5000),
    order: z.coerce.number().min(0),
    aiGenerated: z.coerce.boolean(),
    generationTaskId: z.string().min(1).max(200).nullable(),
    suggestedByAi: z.coerce.boolean(),
  });
};

export const sectionCourseUpdateDTOSchema = () => {
  return z
    .object({
      courseId: z.string().min(1).max(200),
      title: z.string().min(1).max(500),
      description: z.string().min(1).max(5000),
      order: z.coerce.number().min(0),
      aiGenerated: z.coerce.boolean(),
      generationTaskId: z.string().min(1).max(200).nullable(),
      suggestedByAi: z.coerce.boolean(),
      active: z.coerce.boolean(),
    })
    .partial();
};
