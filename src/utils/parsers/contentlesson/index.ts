import { DifficultyLevel, LearningTechnique, LessonContentType } from '@prisma/client';
import { z } from 'zod';

export const contentLessonInDTOSchema = () => {
  return z.object({
    lessonId: z.string().min(1).max(200),
    metadata: z.any(),
    difficultyLevel: z.enum(DifficultyLevel),
    learningTechnique: z.enum(LearningTechnique),
    orderPreference: z.coerce.number().min(0).nullable(),
    aiGenerated: z.coerce.boolean(),
    generationLogId: z.string().min(1).max(200).nullable(),
    contentType: z.enum(LessonContentType),
    parentContentId: z.string().min(1).max(200).nullable(),
  });
};

export const contentLessonUpdateDTOSchema = () => {
  return z
    .object({
      lessonId: z.string().min(1).max(200),
      metadata: z.any(),
      difficultyLevel: z.enum(DifficultyLevel),
      learningTechnique: z.enum(LearningTechnique),
      orderPreference: z.coerce.number().min(0).nullable(),
      aiGenerated: z.coerce.boolean(),
      generationLogId: z.string().min(1).max(200).nullable(),
      contentType: z.enum(LessonContentType),
      parentContentId: z.string().min(1).max(200).nullable(),
      active: z.coerce.boolean(),
      isCurrentVersion: z.coerce.boolean(),
    })
    .partial();
};
