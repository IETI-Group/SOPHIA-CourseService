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
  ): Promise<PaginatedQuizQuestions>;
  getQuestionQuizById(questionQuizId: string): Promise<QuestionQuizOutDTO>;
  createQuestionQuiz(dto: QuestionQuizInDTO): Promise<QuestionQuizOutDTO>;
  updateQuestionQuiz(questionQuizId: string, dto: QuestionQuizInDTO): Promise<QuestionQuizOutDTO>;
  deleteQuestionQuizById(questionQuizId: string): Promise<void>;
}
