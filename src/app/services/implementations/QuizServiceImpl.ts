import type {
  ApiResponse,
  FiltersOptionQuiz,
  FiltersQuestionQuiz,
  FiltersQuizSection,
  SortingQuizOptions,
  SortingQuizQuestions,
  SortingSectionQuizzes,
} from '../../../utils/index.js';
import type {
  OptionQuizInDTO,
  QuestionQuizInDTO,
  QuizSectionInDTO,
  QuizSectionUpdateDTO,
} from '../../models/index.js';
import type { QuizService } from '../index.js';

export class QuizServiceImpl implements QuizService {
  getQuizzesSection(
    _filters: FiltersQuizSection,
    _sort: SortingSectionQuizzes,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  getQuizById(_quizId: string, _lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  postQuizSection(_dto: QuizSectionInDTO, _lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  putQuiz(
    _quizId: string,
    _dto: Partial<QuizSectionUpdateDTO>,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  deleteQuiz(_quizId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  getQuestionsQuiz(
    _filters: FiltersQuestionQuiz,
    _sort: SortingQuizQuestions
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  getQuestionById(_questionQuizId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  postQuestionQuiz(_dto: QuestionQuizInDTO): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  putQuestion(_questionQuizId: string, _dto: QuestionQuizInDTO): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  deleteQuestion(_questionQuizId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  getOptionsQuiz(
    _filters: FiltersOptionQuiz,
    _sort: SortingQuizOptions
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  getOption(_optionId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  postOptionQuiz(_dto: OptionQuizInDTO): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  putOption(_optionId: string, _dto: Partial<OptionQuizInDTO>): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  deleteOption(_optionId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
}
