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

export interface QuizService {
  getQuizzesSection(
    filters: FiltersQuizSection,
    sort: SortingSectionQuizzes,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>>;
  getQuizById(quizId: string, lightDTO: boolean): Promise<ApiResponse<unknown>>;
  postQuizSection(dto: QuizSectionInDTO, lightDTO: boolean): Promise<ApiResponse<unknown>>;
  putQuiz(
    quizId: string,
    dto: Partial<QuizSectionUpdateDTO>,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>>;
  deleteQuiz(quizId: string): Promise<ApiResponse<unknown>>;
  getQuestionsQuiz(
    filters: FiltersQuestionQuiz,
    sort: SortingQuizQuestions
  ): Promise<ApiResponse<unknown>>;
  getQuestionById(questionQuizId: string): Promise<ApiResponse<unknown>>;
  postQuestionQuiz(dto: QuestionQuizInDTO): Promise<ApiResponse<unknown>>;
  putQuestion(
    questionQuizId: string,
    dto: Partial<QuestionQuizInDTO>
  ): Promise<ApiResponse<unknown>>;
  deleteQuestion(questionQuizId: string): Promise<ApiResponse<unknown>>;
  getOptionsQuiz(
    filters: FiltersOptionQuiz,
    sort: SortingQuizOptions
  ): Promise<ApiResponse<unknown>>;
  getOption(optionId: string): Promise<ApiResponse<unknown>>;
  postOptionQuiz(dto: OptionQuizInDTO): Promise<ApiResponse<unknown>>;
  putOption(optionId: string, dto: Partial<OptionQuizInDTO>): Promise<ApiResponse<unknown>>;
  deleteOption(optionId: string): Promise<ApiResponse<unknown>>;
}
