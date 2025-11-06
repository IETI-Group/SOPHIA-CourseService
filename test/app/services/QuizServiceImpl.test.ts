import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type {
  OptionQuizInDTO,
  QuestionQuizInDTO,
  QuizSectionInDTO,
  QuizSectionUpdateDTO,
} from '../../../src/app/models/index.js';
import type {
  OptionsQuizzRepository,
  QuestionsQuizzRepository,
  QuizzesSectionRepository,
} from '../../../src/app/repositories/index.js';
import { QuizServiceImpl } from '../../../src/app/services/implementations/QuizServiceImpl.js';
import type {
  FiltersOptionQuiz,
  FiltersQuestionQuiz,
  FiltersQuizSection,
  SortingQuizOptions,
  SortingQuizQuestions,
  SortingSectionQuizzes,
} from '../../../src/utils/index.js';

describe('QuizServiceImpl', () => {
  const mockQuizzesSectionRepository = mockDeep<QuizzesSectionRepository>();
  const mockOptionsQuizzRepository = mockDeep<OptionsQuizzRepository>();
  const mockQuestionsQuizzRepository = mockDeep<QuestionsQuizzRepository>();
  let service: QuizServiceImpl;

  beforeEach(() => {
    service = new QuizServiceImpl(
      mockQuizzesSectionRepository,
      mockOptionsQuizzRepository,
      mockQuestionsQuizzRepository
    );
  });

  afterEach(() => {
    mockReset(mockQuizzesSectionRepository);
    mockReset(mockOptionsQuizzRepository);
    mockReset(mockQuestionsQuizzRepository);
  });

  it('should call quizzesSectionRepository.getQuizzes with filters, sort and lightDTO', async () => {
    const filters: FiltersQuizSection = {
      sectionId: 'section-123',
      generationTaskId: null,
      title: null,
      active: null,
      aiGenerated: null,
      durationMinutesMin: null,
      durationMinutesMax: null,
      createdAtStart: null,
      createdAtEnd: null,
    };
    const sort: SortingSectionQuizzes = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };
    const lightDTO: boolean = true;

    await service.getQuizzesSection(filters, sort, lightDTO);

    expect(mockQuizzesSectionRepository.getQuizzes).toHaveBeenCalledWith(filters, sort, lightDTO);
  });

  it('should call quizzesSectionRepository.getQuizById with quizId and lightDTO', async () => {
    const quizId: string = 'quiz-123';
    const lightDTO: boolean = false;

    await service.getQuizById(quizId, lightDTO);

    expect(mockQuizzesSectionRepository.getQuizById).toHaveBeenCalledWith(quizId, lightDTO);
  });

  it('should call quizzesSectionRepository.createQuiz with dto and lightDTO', async () => {
    const dto: QuizSectionInDTO = {
      sectionId: 'section-123',
      description: 'Quiz description',
      title: 'Quiz Title',
      aiGenerated: false,
      generationTaskId: null,
      difficultyDistribution: {},
      adaptativeLogic: {},
    };
    const lightDTO: boolean = true;

    await service.postQuizSection(dto, lightDTO);

    expect(mockQuizzesSectionRepository.createQuiz).toHaveBeenCalledWith(dto, lightDTO);
  });

  it('should call quizzesSectionRepository.updateQuiz with quizId, dto and lightDTO', async () => {
    const quizId: string = 'quiz-123';
    const dto: Partial<QuizSectionUpdateDTO> = {
      title: 'Updated Quiz',
      active: false,
    };
    const lightDTO: boolean = false;

    await service.putQuiz(quizId, dto, lightDTO);

    expect(mockQuizzesSectionRepository.updateQuiz).toHaveBeenCalledWith(quizId, dto, lightDTO);
  });

  it('should call quizzesSectionRepository.deleteQuizById with quizId', async () => {
    const quizId: string = 'quiz-123';

    await service.deleteQuiz(quizId);

    expect(mockQuizzesSectionRepository.deleteQuizById).toHaveBeenCalledWith(quizId);
  });

  it('should call questionsQuizzRepository.getQuestionsQuiz with filters and sort', async () => {
    const filters: FiltersQuestionQuiz = {
      quizId: 'quiz-123',
      question: null,
      durationMinutesMin: null,
      durationMinutesMax: null,
    };
    const sort: SortingQuizQuestions = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };

    await service.getQuestionsQuiz(filters, sort);

    expect(mockQuestionsQuizzRepository.getQuestionsQuiz).toHaveBeenCalledWith(filters, sort);
  });

  it('should call questionsQuizzRepository.getQuestionQuizById with questionQuizId', async () => {
    const questionQuizId: string = 'question-123';

    await service.getQuestionById(questionQuizId);

    expect(mockQuestionsQuizzRepository.getQuestionQuizById).toHaveBeenCalledWith(questionQuizId);
  });

  it('should call questionsQuizzRepository.createQuestionQuiz with dto', async () => {
    const dto: QuestionQuizInDTO = {
      quizId: 'quiz-123',
      question: 'What is the answer?',
      durationMinutes: 5,
    };

    await service.postQuestionQuiz(dto);

    expect(mockQuestionsQuizzRepository.createQuestionQuiz).toHaveBeenCalledWith(dto);
  });

  it('should call questionsQuizzRepository.updateQuestionQuiz with questionQuizId and dto', async () => {
    const questionQuizId: string = 'question-123';
    const dto: QuestionQuizInDTO = {
      quizId: 'quiz-123',
      question: 'Updated question?',
      durationMinutes: 10,
    };

    await service.putQuestion(questionQuizId, dto);

    expect(mockQuestionsQuizzRepository.updateQuestionQuiz).toHaveBeenCalledWith(
      questionQuizId,
      dto
    );
  });

  it('should call questionsQuizzRepository.deleteQuestionQuizById with questionQuizId', async () => {
    const questionQuizId: string = 'question-123';

    await service.deleteQuestion(questionQuizId);

    expect(mockQuestionsQuizzRepository.deleteQuestionQuizById).toHaveBeenCalledWith(
      questionQuizId
    );
  });

  it('should call optionsQuizzRepository.getOptions with filters and sort', async () => {
    const filters: FiltersOptionQuiz = {
      quizQuestionId: 'question-123',
      option: null,
      isCorrect: null,
    };
    const sort: SortingQuizOptions = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };

    await service.getOptionsQuiz(filters, sort);

    expect(mockOptionsQuizzRepository.getOptions).toHaveBeenCalledWith(filters, sort);
  });

  it('should call optionsQuizzRepository.getOptionById with optionId', async () => {
    const optionId: string = 'option-123';

    await service.getOption(optionId);

    expect(mockOptionsQuizzRepository.getOptionById).toHaveBeenCalledWith(optionId);
  });

  it('should call optionsQuizzRepository.createOption with dto', async () => {
    const dto: OptionQuizInDTO = {
      quizQuestionId: 'question-123',
      option: 'Option A',
      isCorrect: true,
    };

    await service.postOptionQuiz(dto);

    expect(mockOptionsQuizzRepository.createOption).toHaveBeenCalledWith(dto);
  });

  it('should call optionsQuizzRepository.updateOption with optionId and dto', async () => {
    const optionId: string = 'option-123';
    const dto: Partial<OptionQuizInDTO> = {
      option: 'Updated Option A',
      isCorrect: false,
    };

    await service.putOption(optionId, dto);

    expect(mockOptionsQuizzRepository.updateOption).toHaveBeenCalledWith(optionId, dto);
  });

  it('should call optionsQuizzRepository.deleteOptionById with optionId', async () => {
    const optionId: string = 'option-123';

    await service.deleteOption(optionId);

    expect(mockOptionsQuizzRepository.deleteOptionById).toHaveBeenCalledWith(optionId);
  });
});
