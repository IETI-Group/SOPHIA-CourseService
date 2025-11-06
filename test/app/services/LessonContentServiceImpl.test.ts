import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { ContentLessonInDTO, ContentLessonUpdateDTO } from '../../../src/app/models/index.js';
import type { LessonContentsRepository } from '../../../src/app/repositories/index.js';
import { LessonContentServiceImpl } from '../../../src/app/services/implementations/LessonContentServiceImpl.js';
import type { FiltersLessonContent, SortingLessonContent } from '../../../src/utils/index.js';

describe('LessonContentServiceImpl', () => {
  const mockLessonContentsRepository = mockDeep<LessonContentsRepository>();
  let service: LessonContentServiceImpl;

  beforeEach(() => {
    service = new LessonContentServiceImpl(mockLessonContentsRepository);
  });

  afterEach(() => {
    mockReset(mockLessonContentsRepository);
  });

  it('should call lessonContentsRepository.getLessonContents with filters, sort and lightDTO', async () => {
    const filters: FiltersLessonContent = {
      lessonId: 'lesson-123',
      parentContentId: null,
      generationLogId: null,
      contentType: null,
      difficultyLevel: null,
      learningTechnique: null,
      active: null,
      aiGenerated: null,
      isCurrentVersion: null,
      versionMin: null,
      versionMax: null,
      orderPreferenceMin: null,
      orderPreferenceMax: null,
      createdAtStart: null,
      createdAtEnd: null,
    };
    const sort: SortingLessonContent = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };
    const lightDTO: boolean = true;

    await service.getLessonContents(filters, sort, lightDTO);

    expect(mockLessonContentsRepository.getLessonContents).toHaveBeenCalledWith(
      filters,
      sort,
      lightDTO
    );
  });

  it('should call lessonContentsRepository.getLessonContentById with lessonContentId and lightDTO', async () => {
    const lessonContentId: string = 'content-123';
    const lightDTO: boolean = false;

    await service.getLessonContentsById(lessonContentId, lightDTO);

    expect(mockLessonContentsRepository.getLessonContentById).toHaveBeenCalledWith(
      lessonContentId,
      lightDTO
    );
  });

  it('should call lessonContentsRepository.createLessonContent with dto and lightDTO', async () => {
    const dto: ContentLessonInDTO = {
      lessonId: 'lesson-123',
      metadata: {},
      difficultyLevel: 'BEGINNER',
      learningTechnique: 'VISUAL',
      orderPreference: 1,
      aiGenerated: false,
      generationLogId: null,
      contentType: 'TEXT',
      parentContentId: null,
    };
    const lightDTO: boolean = true;

    await service.postLessonContents(dto, lightDTO);

    expect(mockLessonContentsRepository.createLessonContent).toHaveBeenCalledWith(dto, lightDTO);
  });

  it('should call lessonContentsRepository.updateLessonContent with lessonContentId, dto and lightDTO', async () => {
    const lessonContentId: string = 'content-123';
    const dto: Partial<ContentLessonUpdateDTO> = {
      difficultyLevel: 'ADVANCED',
      active: false,
    };
    const lightDTO: boolean = false;

    await service.putLessonContents(lessonContentId, dto, lightDTO);

    expect(mockLessonContentsRepository.updateLessonContent).toHaveBeenCalledWith(
      lessonContentId,
      dto,
      lightDTO
    );
  });

  it('should call lessonContentsRepository.deleteLessonContentById with lessonContentId', async () => {
    const lessonContentId: string = 'content-123';

    await service.deleteLessonContents(lessonContentId);

    expect(mockLessonContentsRepository.deleteLessonContentById).toHaveBeenCalledWith(
      lessonContentId
    );
  });
});
