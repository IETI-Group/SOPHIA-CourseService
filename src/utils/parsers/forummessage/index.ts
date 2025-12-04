import { z } from 'zod';

export const forumMessageInDTOSchema = () => {
  return z.object({
    forumId: z.string().min(1).max(36),
    userId: z.string().min(1).max(200),
    content: z.string().min(1),
    parentMessageId: z.string().min(1).max(36).nullable(),
  });
};

export const forumMessageUpdateDTOSchema = () => {
  return z
    .object({
      content: z.string().min(1),
    })
    .partial();
};

export type SortingForumMessages = z.infer<
  ReturnType<typeof import('../sorting.js').sortingForumMessagesSchema>
>;
