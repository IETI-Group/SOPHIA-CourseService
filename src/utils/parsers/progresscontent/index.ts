import { z } from 'zod';

export const progressContentInDTOSchema = () => {
  return z.object({
    userId: z.string().min(1).max(200),
    lessonContentId: z.string().min(1).max(200),
  });
};

export const progressContentUpdateDTOSchema = () => {
  return z
    .object({
      userId: z.string().min(1).max(200),
      lessonContentId: z.string().min(1).max(200),
      timeSpendMinutes: z.coerce.number().min(0),
      completionPercentage: z.coerce.number().min(0).max(100),
      effectivinessScore: z.coerce.number().min(0),
      active: z.coerce.boolean(),
      userRating: z.coerce.number().min(0).max(5).nullable(),
    })
    .partial();
};
