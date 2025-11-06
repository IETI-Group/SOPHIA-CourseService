import { CourseLevel, CourseStatus } from '@prisma/client';
import { z } from 'zod';

export const courseInDTOSchema = () => {
  return z.object({
    instructorId: z.string().min(1).max(200).nullable(),
    title: z.string().min(1).max(500),
    description: z.string().min(1).max(5000),
    price: z.coerce.number().min(0),
    level: z.enum(CourseLevel),
    aiGenerated: z.coerce.boolean(),
    generationTaskId: z.string().min(1).max(200).nullable(),
    generationMetadata: z.any(),
    lastAIUpdateAt: z.coerce.date().nullable(),
  });
};

export const courseUpdateDTOSchema = () => {
  return z
    .object({
      instructorId: z.string().min(1).max(200).nullable(),
      title: z.string().min(1).max(500),
      description: z.string().min(1).max(5000),
      price: z.coerce.number().min(0),
      level: z.enum(CourseLevel),
      aiGenerated: z.coerce.boolean(),
      generationTaskId: z.string().min(1).max(200).nullable(),
      generationMetadata: z.any(),
      lastAIUpdateAt: z.coerce.date().nullable(),
      active: z.coerce.boolean(),
      status: z.enum(CourseStatus),
    })
    .partial();
};
