import { z } from 'zod';

export const categoryCourseInDTOSchema = () => {
  return z.object({
    name: z.string().min(1).max(200),
    description: z.string().min(1).max(1000),
    parentCategory: z.string().min(1).max(200).nullable(),
  });
};

export const categoryCourseUpdateDTOSchema = () => {
  return z.object({
    name: z.string().min(1).max(200),
    description: z.string().min(1).max(1000),
    parentCategory: z.string().min(1).max(200).nullable(),
    active: z.coerce.boolean(),
  });
};
