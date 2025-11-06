import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { SectionCourseInDTO, SectionCourseUpdateDTO } from '../../src/app/models/index.js';
import type { SectionService } from '../../src/app/services/interfaces/SectionService.js';
import { SectionsController } from '../../src/controllers/sections.js';
import type { FiltersSection, SORT_SECTION } from '../../src/utils/index.js';

describe('SectionsController', () => {
  const mockSectionService = mockDeep<SectionService>();
  let controller: SectionsController;

  beforeEach(() => {
    controller = new SectionsController(mockSectionService);
  });

  afterEach(() => {
    mockReset(mockSectionService);
  });

  it('should call sectionService.getCourseSections with filters, sort and lightDTO', async () => {
    const filters: FiltersSection = {
      courseId: 'course-123',
      generationTaskId: null,
      title: null,
      active: null,
      aiGenerated: null,
      suggestedByAI: null,
      durationHoursMin: null,
      durationHoursMax: null,
      orderMin: null,
      orderMax: null,
      createdAtStart: null,
      createdAtEnd: null,
    };
    const sort: {
      page: number;
      size: number;
      sortDirection: 'asc' | 'desc';
      sortFields: SORT_SECTION[];
    } = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };
    const lightDTO: boolean = true;

    await controller.getCourseSections(filters, sort, lightDTO);

    expect(mockSectionService.getCourseSections).toHaveBeenCalledWith(filters, sort, lightDTO);
  });

  it('should call sectionService.getSectionById with sectionId and lightDTO', async () => {
    const sectionId: string = 'section-123';
    const lightDTO: boolean = false;

    await controller.getSectionById(sectionId, lightDTO);

    expect(mockSectionService.getSectionById).toHaveBeenCalledWith(sectionId, lightDTO);
  });

  it('should call sectionService.postCourseSection with dto and lightDTO', async () => {
    const dto: SectionCourseInDTO = {
      courseId: 'course-123',
      title: 'Test Section',
      description: 'Section description',
      order: 1,
      aiGenerated: false,
      generationTaskId: null,
      suggestedByAi: false,
    };
    const lightDTO: boolean = true;

    await controller.postCourseSection(dto, lightDTO);

    expect(mockSectionService.postCourseSection).toHaveBeenCalledWith(dto, lightDTO);
  });

  it('should call sectionService.putSection with sectionId, dto and lightDTO', async () => {
    const sectionId: string = 'section-123';
    const dto: Partial<SectionCourseUpdateDTO> = {
      title: 'Updated Section',
      order: 2,
    };
    const lightDTO: boolean = false;

    await controller.putSection(sectionId, dto, lightDTO);

    expect(mockSectionService.putSection).toHaveBeenCalledWith(sectionId, dto, lightDTO);
  });

  it('should call sectionService.deleteSection with sectionId', async () => {
    const sectionId: string = 'section-123';

    await controller.deleteSection(sectionId);

    expect(mockSectionService.deleteSection).toHaveBeenCalledWith(sectionId);
  });
});
