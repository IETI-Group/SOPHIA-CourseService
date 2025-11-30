import { z } from 'zod';

export const apiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.any().optional(),
  timestamp: z.string(),
  pagination: z.any().optional(),
});
