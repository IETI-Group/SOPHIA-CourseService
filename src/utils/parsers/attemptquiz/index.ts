import { z } from 'zod';

export const attemptQuizInDTOSchema = () => {
  return z.object({
    quizId: z.string().min(1).max(200),
    userId: z.string().min(1).max(200),
  });
};

export const attemptQuizUpdateDTOSchema = () => {
  return z.object({
    quizId: z.string().min(1).max(200),
    userId: z.string().min(1).max(200),
    grade: z.coerce.number().min(0).nullable(),
  });
};
