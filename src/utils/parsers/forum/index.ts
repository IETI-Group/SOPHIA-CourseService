import { z } from 'zod';

export const forumInDTOSchema = () => {
  return z.object({
    courseId: z.string().min(1).max(36),
    active: z.coerce.boolean(),
  });
};

export const forumUpdateDTOSchema = () => {
  return z
    .object({
      courseId: z.string().min(1).max(36),
      active: z.coerce.boolean(),
      commentsCount: z.coerce.number().int().min(0),
    })
    .partial();
};

export type SortingForums = z.infer<ReturnType<typeof import('../sorting.js').sortingForumsSchema>>;
