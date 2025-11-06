import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type {
  AttemptQuizInDTO,
  AttemptQuizUpdateDTO,
  OptionQuizInDTO,
  QuestionQuizInDTO,
  QuizSectionInDTO,
  QuizSectionUpdateDTO,
} from '../../src/app/models/index.js';
import type { AttemptService } from '../../src/app/services/interfaces/AttemptService.js';
import type { QuizService } from '../../src/app/services/interfaces/QuizService.js';
import { QuizzesController } from '../../src/controllers/quizzes.js';
import type {
  FiltersAttemptQuiz,
  FiltersOptionQuiz,
  FiltersQuestionQuiz,
  FiltersQuizSection,
  SORT_ATTEMPT_QUIZ,
  SORT_OPTION_QUIZ,
  SORT_QUESTION_QUIZ,
  SORT_QUIZ_SECTION,
} from '../../src/utils/index.js';

describe('QuizzesController', () => {
  const mockQuizService = mockDeep<QuizService>();
  const mockAttemptService = mockDeep<AttemptService>();
  let controller: QuizzesController;

  beforeEach(() => {
    controller = new QuizzesController(mockQuizService, mockAttemptService);
  });

  afterEach(() => {
    mockReset(mockQuizService);
    mockReset(mockAttemptService);
  });

  it('should call quizService.getQuizzesSection with filters, sort and lightDTO', async () => {
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
    const sort: {
      page: number;
      size: number;
      sortDirection: 'asc' | 'desc';
      sortFields: SORT_QUIZ_SECTION[];
    } = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };
    const lightDTO: boolean = true;

    await controller.getQuizzesSection(filters, sort, lightDTO);

    expect(mockQuizService.getQuizzesSection).toHaveBeenCalledWith(filters, sort, lightDTO);
  });

  it('should call quizService.getQuizById with quizId and lightDTO', async () => {
    const quizId: string = 'quiz-123';
    const lightDTO: boolean = false;

    await controller.getQuizById(quizId, lightDTO);

    expect(mockQuizService.getQuizById).toHaveBeenCalledWith(quizId, lightDTO);
  });

  it('should call quizService.postQuizSection with dto and lightDTO', async () => {
    const dto: QuizSectionInDTO = {
      sectionId: 'section-123',
      description: 'Quiz description',
      title: 'Test Quiz',
      aiGenerated: false,
      generationTaskId: null,
      difficultyDistribution: {},
      adaptativeLogic: {},
    };
    const lightDTO: boolean = true;

    await controller.postQuizSection(dto, lightDTO);

    expect(mockQuizService.postQuizSection).toHaveBeenCalledWith(dto, lightDTO);
  });

  it('should call quizService.putQuiz with quizId, dto and lightDTO', async () => {
    const quizId: string = 'quiz-123';
    const dto: Partial<QuizSectionUpdateDTO> = {
      title: 'Updated Quiz',
      active: false,
    };
    const lightDTO: boolean = false;

    await controller.putQuiz(quizId, dto, lightDTO);

    expect(mockQuizService.putQuiz).toHaveBeenCalledWith(quizId, dto, lightDTO);
  });

  it('should call quizService.deleteQuiz with quizId', async () => {
    const quizId: string = 'quiz-123';

    await controller.deleteQuiz(quizId);

    expect(mockQuizService.deleteQuiz).toHaveBeenCalledWith(quizId);
  });

  it('should call quizService.getQuestionsQuiz with filters and sort', async () => {
    const filters: FiltersQuestionQuiz = {
      quizId: 'quiz-123',
      question: null,
      durationMinutesMin: null,
      durationMinutesMax: null,
    };
    const sort: {
      page: number;
      size: number;
      sortDirection: 'asc' | 'desc';
      sortFields: SORT_QUESTION_QUIZ[];
    } = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };

    await controller.getQuestionsQuiz(filters, sort);

    expect(mockQuizService.getQuestionsQuiz).toHaveBeenCalledWith(filters, sort);
  });

  it('should call quizService.getQuestionById with questionQuizId', async () => {
    const questionQuizId: string = 'question-123';

    await controller.getQuestionById(questionQuizId);

    expect(mockQuizService.getQuestionById).toHaveBeenCalledWith(questionQuizId);
  });

  it('should call quizService.postQuestionQuiz with dto', async () => {
    const dto: QuestionQuizInDTO = {
      quizId: 'quiz-123',
      question: 'What is 2 + 2?',
      durationMinutes: 5,
    };

    await controller.postQuestionQuiz(dto);

    expect(mockQuizService.postQuestionQuiz).toHaveBeenCalledWith(dto);
  });

  it('should call quizService.putQuestion with questionQuizId and dto', async () => {
    const questionQuizId: string = 'question-123';
    const dto: Partial<QuestionQuizInDTO> = {
      question: 'What is 3 + 3?',
    };

    await controller.putQuestion(questionQuizId, dto);

    expect(mockQuizService.putQuestion).toHaveBeenCalledWith(questionQuizId, dto);
  });

  it('should call quizService.deleteQuestion with questionQuizId', async () => {
    const questionQuizId: string = 'question-123';

    await controller.deleteQuestion(questionQuizId);

    expect(mockQuizService.deleteQuestion).toHaveBeenCalledWith(questionQuizId);
  });

  it('should call quizService.getOptionsQuiz with filters and sort', async () => {
    const filters: FiltersOptionQuiz = {
      quizQuestionId: 'question-123',
      option: null,
      isCorrect: null,
    };
    const sort: {
      page: number;
      size: number;
      sortDirection: 'asc' | 'desc';
      sortFields: SORT_OPTION_QUIZ[];
    } = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };

    await controller.getOptionsQuiz(filters, sort);

    expect(mockQuizService.getOptionsQuiz).toHaveBeenCalledWith(filters, sort);
  });

  it('should call quizService.getOption with optionId', async () => {
    const optionId: string = 'option-123';

    await controller.getOption(optionId);

    expect(mockQuizService.getOption).toHaveBeenCalledWith(optionId);
  });

  it('should call quizService.postOptionQuiz with dto', async () => {
    const dto: OptionQuizInDTO = {
      quizQuestionId: 'question-123',
      option: 'Option A',
      isCorrect: true,
    };

    await controller.postOptionQuiz(dto);

    expect(mockQuizService.postOptionQuiz).toHaveBeenCalledWith(dto);
  });

  it('should call quizService.putOption with optionId and dto', async () => {
    const optionId: string = 'option-123';
    const dto: Partial<OptionQuizInDTO> = {
      option: 'Updated Option A',
      isCorrect: false,
    };

    await controller.putOption(optionId, dto);

    expect(mockQuizService.putOption).toHaveBeenCalledWith(optionId, dto);
  });

  it('should call quizService.deleteOption with optionId', async () => {
    const optionId: string = 'option-123';

    await controller.deleteOption(optionId);

    expect(mockQuizService.deleteOption).toHaveBeenCalledWith(optionId);
  });

  it('should call attemptService.getAttemptsQuiz with filters and sort', async () => {
    const filters: FiltersAttemptQuiz = {
      quizId: 'quiz-123',
      userId: null,
      durationMinutesMin: null,
      durationMinutesMax: null,
      GRADEMin: null,
      GRADEMax: null,
      submittedAtStart: null,
      submittedAtEnd: null,
    };
    const sort: {
      page: number;
      size: number;
      sortDirection: 'asc' | 'desc';
      sortFields: SORT_ATTEMPT_QUIZ[];
    } = {
      page: 1,
      size: 10,
      sortDirection: 'desc',
      sortFields: [],
    };

    await controller.getAttemptsQuiz(filters, sort);

    expect(mockAttemptService.getAttemptsQuiz).toHaveBeenCalledWith(filters, sort);
  });

  it('should call attemptService.getAttempt with attemptId', async () => {
    const attemptId: string = 'attempt-123';

    await controller.getAttempt(attemptId);

    expect(mockAttemptService.getAttempt).toHaveBeenCalledWith(attemptId);
  });

  it('should call attemptService.postAttemptQuiz with dto', async () => {
    const dto: AttemptQuizInDTO = {
      quizId: 'quiz-123',
      userId: 'user-123',
    };

    await controller.postAttemptQuiz(dto);

    expect(mockAttemptService.postAttemptQuiz).toHaveBeenCalledWith(dto);
  });

  it('should call attemptService.putAttempt with attemptId and dto', async () => {
    const attemptId: string = 'attempt-123';
    const dto: Partial<AttemptQuizUpdateDTO> = {
      quizId: 'quiz-123',
      userId: 'user-123',
    };

    await controller.putAttempt(attemptId, dto);

    expect(mockAttemptService.putAttempt).toHaveBeenCalledWith(attemptId, dto);
  });

  it('should call attemptService.deleteAttempt with attemptId', async () => {
    const attemptId: string = 'attempt-123';

    await controller.deleteAttempt(attemptId);

    expect(mockAttemptService.deleteAttempt).toHaveBeenCalledWith(attemptId);
  });
});
