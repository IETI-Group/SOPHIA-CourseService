import { z } from 'zod';

export const optionQuizInDTOSchema = () => {
  return z.object({
    quizQuestionId: z.string().min(1).max(200),
    option: z.string().min(1).max(1000),
    isCorrect: z.coerce.boolean(),
  });
};
