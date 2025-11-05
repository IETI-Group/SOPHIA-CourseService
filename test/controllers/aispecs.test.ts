import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { AISpecsLessonInDTO } from '../../src/app/models/index.js';
import type { AISpecsService } from '../../src/app/services/interfaces/AISpecsService.js';
import { AISpecsController } from '../../src/controllers/aispecs.js';
import type { FiltersAISpecsLesson, SORT_AI_SPECS_LESSON } from '../../src/utils/index.js';

describe('AISpecsController', () => {
  const mockAISpecsService = mockDeep<AISpecsService>();
  let controller: AISpecsController;

  beforeEach(() => {
    controller = new AISpecsController(mockAISpecsService);
  });

  afterEach(() => {
    mockReset(mockAISpecsService);
  });

  it('should call aISpecsService.getAISpecs with filters, sort and lightDTO', async () => {
    const filters: FiltersAISpecsLesson = {
      lessonContentId: 'content-123',
      generationPromptSummary: null,
      estimatedVideoDurationMin: null,
      estimatedVideoDurationMax: null,
      createdAtStart: null,
      createdAtEnd: null,
    };
    const sort: {
      page: number;
      size: number;
      sortDirection: 'asc' | 'desc';
      sortFields: SORT_AI_SPECS_LESSON[];
    } = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };
    const lightDTO: boolean = true;

    await controller.getAISpecs(filters, sort, lightDTO);

    expect(mockAISpecsService.getAISpecs).toHaveBeenCalledWith(filters, sort, lightDTO);
  });

  it('should call aISpecsService.getAISpecById with aiSpecId and lightDTO', async () => {
    const aiSpecId: string = 'aispec-123';
    const lightDTO: boolean = false;

    await controller.getAISpecById(aiSpecId, lightDTO);

    expect(mockAISpecsService.getAISpecById).toHaveBeenCalledWith(aiSpecId, lightDTO);
  });

  it('should call aISpecsService.postAISpec with dto and lightDTO', async () => {
    const dto: AISpecsLessonInDTO = {
      lessonContentId: 'content-123',
      generationPromptSummary: 'Test prompt',
      contentStructure: {},
      estimatedVideoDurationMinutes: 120,
      videoScript: null,
      videoGenerationInstructions: {},
      interactiveElements: null,
      exerciseParameters: null,
    };
    const lightDTO: boolean = true;

    await controller.postAISpec(dto, lightDTO);

    expect(mockAISpecsService.postAISpec).toHaveBeenCalledWith(dto, lightDTO);
  });

  it('should call aISpecsService.putAISpec with aiSpecId, dto and lightDTO', async () => {
    const aiSpecId: string = 'aispec-123';
    const dto: Partial<AISpecsLessonInDTO> = {
      generationPromptSummary: 'Updated prompt',
      estimatedVideoDurationMinutes: 150,
    };
    const lightDTO: boolean = false;

    await controller.putAISpec(aiSpecId, dto, lightDTO);

    expect(mockAISpecsService.putAISpec).toHaveBeenCalledWith(aiSpecId, dto, lightDTO);
  });

  it('should call aISpecsService.deleteAISpec with aiSpecId', async () => {
    const aiSpecId: string = 'aispec-123';

    await controller.deleteAISpec(aiSpecId);

    expect(mockAISpecsService.deleteAISpec).toHaveBeenCalledWith(aiSpecId);
  });
});
