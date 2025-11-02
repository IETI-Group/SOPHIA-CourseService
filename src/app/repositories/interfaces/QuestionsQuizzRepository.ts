import type {
  FiltersQuestionQuiz,
  PaginatedQuizQuestions,
  SortingQuizQuestions,
} from '../../../utils/index.js';
import type { QuestionQuizInDTO, QuestionQuizOutDTO } from '../../models/index.js';

export interface QuestionsQuizzRepository {
  getQuestionsQuiz(
    filters: FiltersQuestionQuiz,
    sort: SortingQuizQuestions
  ): PaginatedQuizQuestions;
  getQuestionQuizById(questionQuizId: string): QuestionQuizOutDTO;
  createQuestionQuiz(dto: QuestionQuizInDTO): QuestionQuizOutDTO;
  updateQuestionQuiz(questionQuizId: string, dto: QuestionQuizInDTO): QuestionQuizOutDTO;
  deleteQuestionQuizById(questionQuizId: string): void;
}
