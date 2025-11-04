import { z } from 'zod';

export const quizSectionInDTOSchema = () => {
  return z.object({
    sectionId: z.string().min(1).max(200),
    description: z.string().min(1).max(5000),
    title: z.string().min(1).max(500),
    aiGenerated: z.coerce.boolean(),
    generationTaskId: z.string().min(1).max(200).nullable(),
    difficultyDistribution: z.any(),
    adaptativeLogic: z.any(),
  });
};

export const quizSectionUpdateDTOSchema = () => {
  return z.object({
    sectionId: z.string().min(1).max(200),
    description: z.string().min(1).max(5000),
    title: z.string().min(1).max(500),
    aiGenerated: z.coerce.boolean(),
    generationTaskId: z.string().min(1).max(200).nullable(),
    difficultyDistribution: z.any(),
    adaptativeLogic: z.any(),
    active: z.coerce.boolean(),
    durationMinutes: z.coerce.number().min(0),
  });
};
