import type {
  FiltersQuizSection,
  PaginatedQuizzes,
  SortingSectionQuizzes,
} from '../../../utils/index.js';
import type {
  QuizSectionInDTO,
  QuizSectionOutLightDTO,
  QuizSectionUpdateDTO,
} from '../../models/index.js';

export interface QuizzesSectionRepository {
  getQuizzes(
    filters: FiltersQuizSection,
    sort: SortingSectionQuizzes,
    lightDTO: boolean
  ): Promise<PaginatedQuizzes>;
  getQuizById(quizId: string, lightDTO: boolean): Promise<QuizSectionOutLightDTO>;
  createQuiz(dto: QuizSectionInDTO, lightDTO: boolean): Promise<QuizSectionOutLightDTO>;
  updateQuiz(
    quizId: string,
    dto: Partial<QuizSectionUpdateDTO>,
    lightDTO: boolean
  ): Promise<QuizSectionOutLightDTO>;
  deleteQuizById(quizId: string): Promise<void>;
}
