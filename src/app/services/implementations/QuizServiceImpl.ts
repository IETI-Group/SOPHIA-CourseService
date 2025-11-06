import {
  type ApiResponse,
  type FiltersOptionQuiz,
  type FiltersQuestionQuiz,
  type FiltersQuizSection,
  parseApiResponse,
  type SortingQuizOptions,
  type SortingQuizQuestions,
  type SortingSectionQuizzes,
} from '../../../utils/index.js';
import type {
  OptionQuizInDTO,
  QuestionQuizInDTO,
  QuizSectionInDTO,
  QuizSectionUpdateDTO,
} from '../../models/index.js';
import type {
  OptionsQuizzRepository,
  QuestionsQuizzRepository,
  QuizzesSectionRepository,
} from '../../repositories/index.js';
import type { QuizService } from '../index.js';

export class QuizServiceImpl implements QuizService {
  private readonly quizzesSectionRepository: QuizzesSectionRepository;
  private readonly optionsQuizzRepository: OptionsQuizzRepository;
  private readonly questionsQuizzRepository: QuestionsQuizzRepository;
  constructor(
    quizzesSectionRepository: QuizzesSectionRepository,
    optionsQuizzRepository: OptionsQuizzRepository,
    questionsQuizzRepository: QuestionsQuizzRepository
  ) {
    this.quizzesSectionRepository = quizzesSectionRepository;
    this.optionsQuizzRepository = optionsQuizzRepository;
    this.questionsQuizzRepository = questionsQuizzRepository;
  }
  getQuizzesSection(
    filters: FiltersQuizSection,
    sort: SortingSectionQuizzes,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.quizzesSectionRepository.getQuizzes(filters, sort, lightDTO);
  }
  async getQuizById(quizId: string, lightDTO: boolean): Promise<ApiResponse<unknown>> {
    const result = await this.quizzesSectionRepository.getQuizById(quizId, lightDTO);
    return parseApiResponse(result, 'Quiz retrieved successfully');
  }
  async postQuizSection(dto: QuizSectionInDTO, lightDTO: boolean): Promise<ApiResponse<unknown>> {
    const result = await this.quizzesSectionRepository.createQuiz(dto, lightDTO);
    return parseApiResponse(result, 'Quiz created successfully');
  }
  async putQuiz(
    quizId: string,
    dto: Partial<QuizSectionUpdateDTO>,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    const result = await this.quizzesSectionRepository.updateQuiz(quizId, dto, lightDTO);
    return parseApiResponse(result, 'Quiz updated successfully');
  }
  async deleteQuiz(quizId: string): Promise<ApiResponse<unknown>> {
    await this.quizzesSectionRepository.deleteQuizById(quizId);
    return parseApiResponse(null, 'Quiz deleted successfully');
  }
  getQuestionsQuiz(
    filters: FiltersQuestionQuiz,
    sort: SortingQuizQuestions
  ): Promise<ApiResponse<unknown>> {
    return this.questionsQuizzRepository.getQuestionsQuiz(filters, sort);
  }
  async getQuestionById(questionQuizId: string): Promise<ApiResponse<unknown>> {
    const result = await this.questionsQuizzRepository.getQuestionQuizById(questionQuizId);
    return parseApiResponse(result, 'Question retrieved successfully');
  }
  async postQuestionQuiz(dto: QuestionQuizInDTO): Promise<ApiResponse<unknown>> {
    const result = await this.questionsQuizzRepository.createQuestionQuiz(dto);
    return parseApiResponse(result, 'Question created successfully');
  }
  async putQuestion(questionQuizId: string, dto: QuestionQuizInDTO): Promise<ApiResponse<unknown>> {
    const result = await this.questionsQuizzRepository.updateQuestionQuiz(questionQuizId, dto);
    return parseApiResponse(result, 'Question updated successfully');
  }
  async deleteQuestion(questionQuizId: string): Promise<ApiResponse<unknown>> {
    await this.questionsQuizzRepository.deleteQuestionQuizById(questionQuizId);
    return parseApiResponse(null, 'Question deleted successfully');
  }
  getOptionsQuiz(
    filters: FiltersOptionQuiz,
    sort: SortingQuizOptions
  ): Promise<ApiResponse<unknown>> {
    return this.optionsQuizzRepository.getOptions(filters, sort);
  }
  async getOption(optionId: string): Promise<ApiResponse<unknown>> {
    const result = await this.optionsQuizzRepository.getOptionById(optionId);
    return parseApiResponse(result, 'Option retrieved successfully');
  }
  async postOptionQuiz(dto: OptionQuizInDTO): Promise<ApiResponse<unknown>> {
    const result = await this.optionsQuizzRepository.createOption(dto);
    return parseApiResponse(result, 'Option created successfully');
  }
  async putOption(optionId: string, dto: Partial<OptionQuizInDTO>): Promise<ApiResponse<unknown>> {
    const result = await this.optionsQuizzRepository.updateOption(optionId, dto);
    return parseApiResponse(result, 'Option updated successfully');
  }
  async deleteOption(optionId: string): Promise<ApiResponse<unknown>> {
    await this.optionsQuizzRepository.deleteOptionById(optionId);
    return parseApiResponse(null, 'Option deleted successfully');
  }
}
