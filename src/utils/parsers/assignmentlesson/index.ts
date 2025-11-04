import { AssignmentType } from '@prisma/client';
import { z } from 'zod';

export const assignmentLessonInDTOSchema = () => {
  return z.object({
    lessonId: z.string().min(1).max(200),
    title: z.string().min(1).max(500),
    instructions: z.string().min(1).max(5000),
    maxFileSizeMb: z.coerce.number().min(0),
    allowedTypes: z.enum(AssignmentType),
    dueDate: z.coerce.date(),
    maxScore: z.coerce.number().min(0),
  });
};

export const assignmentLessonUpdateDTOSchema = () => {
  return z.object({
    lessonId: z.string().min(1).max(200),
    title: z.string().min(1).max(500),
    instructions: z.string().min(1).max(5000),
    maxFileSizeMb: z.coerce.number().min(0),
    allowedTypes: z.enum(AssignmentType),
    dueDate: z.coerce.date(),
    maxScore: z.coerce.number().min(0),
    active: z.coerce.boolean(),
  });
};
