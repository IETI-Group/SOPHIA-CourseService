import { SubmissionStatus } from '@prisma/client';
import { z } from 'zod';

export const submissionAssignmentInDTOSchema = () => {
  return z.object({
    assignmentId: z.string().min(1).max(200),
    userId: z.string().min(1).max(200),
  });
};

export const submissionAssignmentUpdateDTOSchema = () => {
  return z.object({
    assignmentId: z.string().min(1).max(200),
    userId: z.string().min(1).max(200),
    feedback: z.string().min(1).max(5000).nullable().or(z.literal(null)),
    active: z.coerce.boolean(),
    score: z.coerce.number().min(0).nullable().or(z.literal(null)),
    status: z.enum(SubmissionStatus),
  });
};
