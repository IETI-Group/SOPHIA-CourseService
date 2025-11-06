import { z } from 'zod';

export const aiSpecsLessonInDTOSchema = () => {
  return z.object({
    lessonContentId: z.string().min(1).max(200),
    generationPromptSummary: z.string().min(1).max(5000),
    contentStructure: z.any(),
    estimatedVideoDurationMinutes: z.coerce.number().min(0).nullable(),
    videoScript: z.string().min(1).max(10000).nullable(),
    videoGenerationInstructions: z.any(),
    interactiveElements: z.any().nullable(),
    exerciseParameters: z.any().nullable(),
  });
};

export const aiSpecsLessonUpdateDTOSchema = () => {
  return aiSpecsLessonInDTOSchema().partial();
};
