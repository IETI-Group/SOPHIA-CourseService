import { z } from 'zod';

export const questionQuizInDTOSchema = () => {
  return z.object({
    quizId: z.string().min(1).max(200),
    question: z.string().min(1).max(1000),
    durationMinutes: z.coerce.number().min(0),
  });
};

export const questionQuizUpdateDTOSchema = () => {
  return questionQuizInDTOSchema().partial();
};
