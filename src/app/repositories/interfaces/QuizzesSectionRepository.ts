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
  ): PaginatedQuizzes;
  getQuizById(quizId: string, lightDTO: boolean): QuizSectionOutLightDTO;
  createQuiz(dto: QuizSectionInDTO, lightDTO: boolean): QuizSectionOutLightDTO;
  updateQuiz(quizId: string, dto: QuizSectionUpdateDTO, lightDTO: boolean): QuizSectionOutLightDTO;
  deleteQuizById(quizId: string): void;
}
