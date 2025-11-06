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
    filters: FiltersQuizSection,
    sort: SortingSectionQuizzes,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.quizService.getQuizzesSection(filters, sort, lightDTO);
  }
  getQuizById(quizId: string, lightDTO: boolean): Promise<ApiResponse<unknown>> {
    return this.quizService.getQuizById(quizId, lightDTO);
  }
  postQuizSection(dto: QuizSectionInDTO, lightDTO: boolean): Promise<ApiResponse<unknown>> {
    return this.quizService.postQuizSection(dto, lightDTO);
  }
  putQuiz(
    quizId: string,
    dto: Partial<QuizSectionUpdateDTO>,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.quizService.putQuiz(quizId, dto, lightDTO);
  }
  deleteQuiz(quizId: string): Promise<ApiResponse<unknown>> {
    return this.quizService.deleteQuiz(quizId);
  }
  getQuestionsQuiz(
    filters: FiltersQuestionQuiz,
    sort: SortingQuizQuestions
  ): Promise<ApiResponse<unknown>> {
    return this.quizService.getQuestionsQuiz(filters, sort);
  }
  getQuestionById(questionQuizId: string): Promise<ApiResponse<unknown>> {
    return this.quizService.getQuestionById(questionQuizId);
  }
  postQuestionQuiz(dto: QuestionQuizInDTO): Promise<ApiResponse<unknown>> {
    return this.quizService.postQuestionQuiz(dto);
  }
  putQuestion(
    questionQuizId: string,
    dto: Partial<QuestionQuizInDTO>
  ): Promise<ApiResponse<unknown>> {
    return this.quizService.putQuestion(questionQuizId, dto);
  }
  deleteQuestion(questionQuizId: string): Promise<ApiResponse<unknown>> {
    return this.quizService.deleteQuestion(questionQuizId);
  }
  getOptionsQuiz(
    filters: FiltersOptionQuiz,
    sort: SortingQuizOptions
  ): Promise<ApiResponse<unknown>> {
    return this.quizService.getOptionsQuiz(filters, sort);
  }
  getOption(optionId: string): Promise<ApiResponse<unknown>> {
    return this.quizService.getOption(optionId);
  }
  postOptionQuiz(dto: OptionQuizInDTO): Promise<ApiResponse<unknown>> {
    return this.quizService.postOptionQuiz(dto);
  }
  putOption(optionId: string, dto: Partial<OptionQuizInDTO>): Promise<ApiResponse<unknown>> {
    return this.quizService.putOption(optionId, dto);
  }
  deleteOption(optionId: string): Promise<ApiResponse<unknown>> {
    return this.quizService.deleteOption(optionId);
  }
  getAttemptsQuiz(
    filters: FiltersAttemptQuiz,
    sort: SortingQuizAttempts
  ): Promise<ApiResponse<unknown>> {
    return this.attemptService.getAttemptsQuiz(filters, sort);
  }
  getAttempt(attemptId: string): Promise<ApiResponse<unknown>> {
    return this.attemptService.getAttempt(attemptId);
  }
  postAttemptQuiz(dto: AttemptQuizInDTO): Promise<ApiResponse<unknown>> {
    return this.attemptService.postAttemptQuiz(dto);
  }
  putAttempt(attemptId: string, dto: Partial<AttemptQuizUpdateDTO>): Promise<ApiResponse<unknown>> {
    return this.attemptService.putAttempt(attemptId, dto);
  }
  deleteAttempt(attemptId: string): Promise<ApiResponse<unknown>> {
    return this.attemptService.deleteAttempt(attemptId);
  }
}
