import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { OptionsQuizzRepository } from '../../../../src/app/index.js';
import type { OptionQuizInDTO } from '../../../../src/app/models/index.js';
import { OptionsQuizzRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/OptionsQuizzRepositoryPostgreSQL.js';
import type { FiltersOptionQuiz } from '../../../../src/utils/filters/index.js';
import type { SortingQuizOptions } from '../../../../src/utils/request/index.js';
import { SORT_OPTION_QUIZ } from '../../../../src/utils/sort_types/index.js';

describe('Options Quizz Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let optionsQuizzRepository: OptionsQuizzRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    optionsQuizzRepository = new OptionsQuizzRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(optionsQuizzRepository).toBeDefined();
  });

  describe('getOptions', () => {
    it('Should return paginated options', async () => {
      const filters: FiltersOptionQuiz = {
        quizQuestionId: 'question_1',
        option: null,
        isCorrect: null,
      };
      const sort: SortingQuizOptions = {
        sortFields: [SORT_OPTION_QUIZ.OPTION],
        page: 1,
        size: 10,
        sortDirection: 'asc',
      };

      const mockOptions = [
        {
          id_option: 'option_1',
          quiz_question_id: 'question_1',
          option: 'Paris',
          is_correct: true,
        },
      ];

      prismaClient.quizOptions.count.mockResolvedValueOnce(1);
      prismaClient.quizOptions.findMany.mockResolvedValueOnce(mockOptions);

      const result = await optionsQuizzRepository.getOptions(filters, sort);

      expect(prismaClient.quizOptions.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('Should return filtered options by isCorrect', async () => {
      const filters: FiltersOptionQuiz = {
        quizQuestionId: null,
        option: null,
        isCorrect: false,
      };
      const sort: SortingQuizOptions = {
        sortFields: [SORT_OPTION_QUIZ.OPTION],
        page: 1,
        size: 10,
        sortDirection: 'asc',
      };

      const mockOptions = [
        {
          id_option: 'option_2',
          quiz_question_id: 'question_1',
          option: 'London',
          is_correct: false,
        },
        {
          id_option: 'option_3',
          quiz_question_id: 'question_1',
          option: 'Berlin',
          is_correct: false,
        },
      ];

      prismaClient.quizOptions.count.mockResolvedValueOnce(2);
      prismaClient.quizOptions.findMany.mockResolvedValueOnce(mockOptions);

      const result = await optionsQuizzRepository.getOptions(filters, sort);

      expect(prismaClient.quizOptions.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.total).toBe(2);
    });
  });

  describe('getOptionById', () => {
    it('Should return option by id', async () => {
      const optionId = 'option_123';
      const mockOption = {
        id_option: 'option_123',
        quiz_question_id: 'question_1',
        option: 'Madrid',
        is_correct: false,
      };

      prismaClient.quizOptions.findUniqueOrThrow.mockResolvedValueOnce(mockOption);

      const result = await optionsQuizzRepository.getOptionById(optionId);

      expect(prismaClient.quizOptions.findUniqueOrThrow).toHaveBeenCalledOnce();
      expect(result.idQuizOption).toBe('option_123');
      expect(result.quizQuestionId).toBe('question_1');
      expect(result.option).toBe('Madrid');
      expect(result.isCorrect).toBe(false);
    });

    it('Should throw error when option not found', async () => {
      const optionId = 'nonexistent';
      prismaClient.quizOptions.findUniqueOrThrow.mockRejectedValueOnce(new Error('Not found'));

      await expect(optionsQuizzRepository.getOptionById(optionId)).rejects.toThrow();
    });
  });

  describe('createOption', () => {
    it('Should create a new option', async () => {
      const dto: OptionQuizInDTO = {
        quizQuestionId: 'question_1',
        option: 'Rome',
        isCorrect: true,
      };

      const mockCreated = {
        id_option: 'new_option_123',
        quiz_question_id: 'question_1',
        option: 'Rome',
        is_correct: true,
      };

      prismaClient.quizOptions.create.mockResolvedValueOnce(mockCreated);

      const result = await optionsQuizzRepository.createOption(dto);

      expect(prismaClient.quizOptions.create).toHaveBeenCalledOnce();
      expect(result.idQuizOption).toBe('new_option_123');
      expect(result.quizQuestionId).toBe('question_1');
      expect(result.option).toBe('Rome');
      expect(result.isCorrect).toBe(true);
    });
  });

  describe('updateOption', () => {
    it('Should update an existing option', async () => {
      const optionId = 'option_123';
      const dto: Partial<OptionQuizInDTO> = {
        quizQuestionId: 'question_1',
        option: 'Vienna',
        isCorrect: false,
      };

      const mockUpdated = {
        id_option: 'option_123',
        quiz_question_id: 'question_1',
        option: 'Vienna',
        is_correct: false,
      };

      prismaClient.quizOptions.update.mockResolvedValueOnce(mockUpdated);

      const result = await optionsQuizzRepository.updateOption(optionId, dto);

      expect(prismaClient.quizOptions.update).toHaveBeenCalledOnce();
      expect(result.idQuizOption).toBe('option_123');
      expect(result.option).toBe('Vienna');
      expect(result.isCorrect).toBe(false);
    });

    it('Should update only isCorrect field of option', async () => {
      const optionId = 'option_456';
      const partialDTO: Partial<OptionQuizInDTO> = {
        isCorrect: true,
      };

      const mockUpdated = {
        id_option: 'option_456',
        quiz_question_id: 'question_1',
        option: 'Paris',
        is_correct: true,
      };

      prismaClient.quizOptions.update.mockResolvedValueOnce(mockUpdated);

      const result = await optionsQuizzRepository.updateOption(optionId, partialDTO);

      expect(prismaClient.quizOptions.update).toHaveBeenCalledOnce();
      expect(result.idQuizOption).toBe('option_456');
      expect(result.isCorrect).toBe(true);
    });

    it('Should throw error when trying to update non-existent option', async () => {
      const optionId = 'nonexistent';
      const dto: Partial<OptionQuizInDTO> = {
        quizQuestionId: 'question_1',
        option: 'Vienna',
        isCorrect: false,
      };

      prismaClient.quizOptions.update.mockRejectedValueOnce(new Error('Not found'));

      await expect(optionsQuizzRepository.updateOption(optionId, dto)).rejects.toThrow();
    });
  });

  describe('deleteOptionById', () => {
    it('Should delete an option by id', async () => {
      const optionId = 'option_123';

      const mockDeleted = {
        id_option: 'option_123',
        quiz_question_id: 'question_1',
        option: 'Athens',
        is_correct: false,
      };

      prismaClient.quizOptions.delete.mockResolvedValueOnce(mockDeleted);

      await optionsQuizzRepository.deleteOptionById(optionId);

      expect(prismaClient.quizOptions.delete).toHaveBeenCalledOnce();
    });

    it('Should throw error when trying to delete non-existent option', async () => {
      const optionId = 'nonexistent';

      prismaClient.quizOptions.delete.mockRejectedValueOnce(null);

      await expect(optionsQuizzRepository.deleteOptionById(optionId)).rejects.toThrow();
    });
  });
});
