import { LessonType } from '@prisma/client';
import { z } from 'zod';

export const lessonSectionInDTOSchema = () => {
  return z.object({
    sectionId: z.string().min(1).max(200),
    title: z.string().min(1).max(500),
    description: z.string().min(1).max(5000),
    order: z.coerce.number().min(0),
    durationMinutes: z.coerce.number().min(0),
    aiGenerated: z.coerce.boolean(),
    generationTaskId: z.string().min(1).max(200).nullable().or(z.literal(null)),
    lessonType: z.enum(LessonType),
    estimatedDifficulty: z.coerce.number().min(0),
  });
};

export const lessonSectionUpdateDTOSchema = () => {
  return z
    .object({
      sectionId: z.string().min(1).max(200),
      title: z.string().min(1).max(500),
      description: z.string().min(1).max(5000),
      order: z.coerce.number().min(0),
      durationMinutes: z.coerce.number().min(0),
      aiGenerated: z.coerce.boolean(),
      generationTaskId: z.string().min(1).max(200).nullable().or(z.literal(null)),
      lessonType: z.enum(LessonType),
      estimatedDifficulty: z.coerce.number().min(0),
      active: z.coerce.boolean(),
    })
    .partial();
};
