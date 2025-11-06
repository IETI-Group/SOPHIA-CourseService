import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { AISpecsLessonInDTO } from '../../../src/app/models/index.js';
import type { AISpecsLessonRepository } from '../../../src/app/repositories/index.js';
import { AISpecsServiceImpl } from '../../../src/app/services/implementations/AISpecsServiceImpl.js';
import type { FiltersAISpecsLesson, SortingAILessonSpecs } from '../../../src/utils/index.js';

describe('AISpecsServiceImpl', () => {
  const mockAISpecsLessonRepository = mockDeep<AISpecsLessonRepository>();
  let service: AISpecsServiceImpl;

  beforeEach(() => {
    service = new AISpecsServiceImpl(mockAISpecsLessonRepository);
  });

  afterEach(() => {
    mockReset(mockAISpecsLessonRepository);
  });

  it('should call aiSpecsLessonRepository.getAISpecs with filters, sort and lightDTO', async () => {
    const filters: FiltersAISpecsLesson = {
      lessonContentId: 'content-123',
      generationPromptSummary: null,
      estimatedVideoDurationMin: null,
      estimatedVideoDurationMax: null,
      createdAtStart: null,
      createdAtEnd: null,
    };
    const sort: SortingAILessonSpecs = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };
    const lightDTO: boolean = true;

    await service.getAISpecs(filters, sort, lightDTO);

    expect(mockAISpecsLessonRepository.getAISpecs).toHaveBeenCalledWith(filters, sort, lightDTO);
  });

  it('should call aiSpecsLessonRepository.getAISpecById with aiSpecId and lightDTO', async () => {
    const aiSpecId: string = 'aispec-123';
    const lightDTO: boolean = false;

    await service.getAISpecById(aiSpecId, lightDTO);

    expect(mockAISpecsLessonRepository.getAISpecById).toHaveBeenCalledWith(aiSpecId, lightDTO);
  });

  it('should call aiSpecsLessonRepository.createAISpec with dto and lightDTO', async () => {
    const dto: AISpecsLessonInDTO = {
      lessonContentId: 'content-123',
      generationPromptSummary: 'Prompt summary',
      contentStructure: {},
      estimatedVideoDurationMinutes: 30,
      videoScript: null,
      videoGenerationInstructions: {},
      interactiveElements: null,
      exerciseParameters: null,
    };
    const lightDTO: boolean = true;

    await service.postAISpec(dto, lightDTO);

    expect(mockAISpecsLessonRepository.createAISpec).toHaveBeenCalledWith(dto, lightDTO);
  });

  it('should call aiSpecsLessonRepository.updateAISpec with aiSpecId, dto and lightDTO', async () => {
    const aiSpecId: string = 'aispec-123';
    const dto: Partial<AISpecsLessonInDTO> = {
      generationPromptSummary: 'Updated summary',
    };
    const lightDTO: boolean = false;

    await service.putAISpec(aiSpecId, dto, lightDTO);

    expect(mockAISpecsLessonRepository.updateAISpec).toHaveBeenCalledWith(aiSpecId, dto, lightDTO);
  });

  it('should call aiSpecsLessonRepository.deleteAISpecById with aiSpecId', async () => {
    const aiSpecId: string = 'aispec-123';

    await service.deleteAISpec(aiSpecId);

    expect(mockAISpecsLessonRepository.deleteAISpecById).toHaveBeenCalledWith(aiSpecId);
  });
});
