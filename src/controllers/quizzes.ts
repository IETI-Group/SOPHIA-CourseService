import type {
  AttemptQuizInDTO,
  AttemptQuizUpdateDTO,
  AttemptService,
  OptionQuizInDTO,
  QuestionQuizInDTO,
  QuizSectionInDTO,
  QuizSectionUpdateDTO,
  QuizService,
} from '../app/index.js';
import type {
  ApiResponse,
  FiltersAttemptQuiz,
  FiltersOptionQuiz,
  FiltersQuestionQuiz,
  FiltersQuizSection,
  SortingQuizAttempts,
  SortingQuizOptions,
  SortingQuizQuestions,
  SortingSectionQuizzes,
} from '../utils/index.js';

export class QuizzesController {
  private readonly quizService: QuizService;
  private readonly attemptService: AttemptService;

  constructor(quizService: QuizService, attemptService: AttemptService) {
    this.quizService = quizService;
    this.attemptService = attemptService;
  }

  getQuizzesSection(
    _filters: FiltersQuizSection,
    _sort: SortingSectionQuizzes,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    this.quizService;
    this.attemptService;
    throw new Error('Method not implemented');
  }
  getQuizById(_quizId: string, _lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  postQuizSection(_dto: QuizSectionInDTO, _lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  putQuiz(
    _quizId: string,
    _dto: Partial<QuizSectionUpdateDTO>,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  deleteQuiz(_quizId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  getQuestionsQuiz(
    _filters: FiltersQuestionQuiz,
    _sort: SortingQuizQuestions
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  getQuestionById(_questionQuizId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  postQuestionQuiz(_dto: QuestionQuizInDTO): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  putQuestion(
    _questionQuizId: string,
    _dto: Partial<QuestionQuizInDTO>
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  deleteQuestion(_questionQuizId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  getOptionsQuiz(
    _filters: FiltersOptionQuiz,
    _sort: SortingQuizOptions
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  getOption(_optionId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  postOptionQuiz(_dto: OptionQuizInDTO): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  putOption(_optionId: string, _dto: Partial<OptionQuizInDTO>): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  deleteOption(_optionId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  getAttemptsQuiz(
    _filters: FiltersAttemptQuiz,
    _sort: SortingQuizAttempts
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  getAttempt(_attemptId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  postAttemptQuiz(_dto: AttemptQuizInDTO): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  putAttempt(
    _attemptId: string,
    _dto: Partial<AttemptQuizUpdateDTO>
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  deleteAttempt(_attemptId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
}
