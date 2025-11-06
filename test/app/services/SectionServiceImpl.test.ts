import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { SectionCourseInDTO, SectionCourseUpdateDTO } from '../../../src/app/models/index.js';
import type { SectionsRepository } from '../../../src/app/repositories/index.js';
import { SectionServiceImpl } from '../../../src/app/services/implementations/SectionServiceImpl.js';
import type { FiltersSection, SortingSections } from '../../../src/utils/index.js';

describe('SectionServiceImpl', () => {
  const mockSectionsRepository = mockDeep<SectionsRepository>();
  let service: SectionServiceImpl;

  beforeEach(() => {
    service = new SectionServiceImpl(mockSectionsRepository);
  });

  afterEach(() => {
    mockReset(mockSectionsRepository);
  });

  it('should call sectionsRepository.getSections with filters, sort and lightDTO', async () => {
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
    const sort: SortingSections = {
      page: 1,
      size: 10,
      sortDirection: 'asc',
      sortFields: [],
    };
    const lightDTO: boolean = true;

    await service.getCourseSections(filters, sort, lightDTO);

    expect(mockSectionsRepository.getSections).toHaveBeenCalledWith(filters, sort, lightDTO);
  });

  it('should call sectionsRepository.getSectionById with sectionId and lightDTO', async () => {
    const sectionId: string = 'section-123';
    const lightDTO: boolean = false;

    await service.getSectionById(sectionId, lightDTO);

    expect(mockSectionsRepository.getSectionById).toHaveBeenCalledWith(sectionId, lightDTO);
  });

  it('should call sectionsRepository.createSection with dto and lightDTO', async () => {
    const dto: SectionCourseInDTO = {
      courseId: 'course-123',
      title: 'New Section',
      description: 'Section description',
      order: 1,
      aiGenerated: false,
      suggestedByAi: false,
      generationTaskId: null,
    };
    const lightDTO: boolean = true;

    await service.postCourseSection(dto, lightDTO);

    expect(mockSectionsRepository.createSection).toHaveBeenCalledWith(dto, lightDTO);
  });

  it('should call sectionsRepository.updateSection with sectionId, dto and lightDTO', async () => {
    const sectionId: string = 'section-123';
    const dto: Partial<SectionCourseUpdateDTO> = {
      title: 'Updated Section',
      active: false,
    };
    const lightDTO: boolean = false;

    await service.putSection(sectionId, dto, lightDTO);

    expect(mockSectionsRepository.updateSection).toHaveBeenCalledWith(sectionId, dto, lightDTO);
  });

  it('should call sectionsRepository.deleteSectionById with sectionId', async () => {
    const sectionId: string = 'section-123';

    await service.deleteSection(sectionId);

    expect(mockSectionsRepository.deleteSectionById).toHaveBeenCalledWith(sectionId);
  });
});
