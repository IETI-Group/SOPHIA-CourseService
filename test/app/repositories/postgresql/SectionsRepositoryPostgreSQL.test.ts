import type { PrismaClient } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type {
  SectionCourseInDTO,
  SectionCourseOutHeavyDTO,
  SectionCourseOutLightDTO,
  SectionCourseUpdateDTO,
  SectionsRepository,
} from '../../../../src/app/index.js';
import { SectionsRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/SectionsRepositoryPostgreSQL.js';
import type { FiltersSection, SortingSections } from '../../../../src/utils/index.js';
import { SORT_SECTION } from '../../../../src/utils/index.js';

describe('Sections Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let sectionsRepository: SectionsRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    sectionsRepository = new SectionsRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(sectionsRepository).toBeDefined();
  });

  describe('getSections', () => {
    it('Should return paginated sections with light DTO', async () => {
      const filters: FiltersSection = {
        courseId: 'course_1',
        generationTaskId: null,
        title: null,
        active: true,
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
        sortFields: [SORT_SECTION.ORDER],
        page: 1,
        size: 10,
        sortDirection: 'asc',
      };

      const mockSections = [
        {
          id_section: 'section_1',
          course_id: 'course_1',
          title: 'Introduction',
          description: 'Introduction section',
          active: true,
          order: 1,
          duration_hours: 5,
          created_at: new Date('2025-01-01'),
          ai_generated: false,
          generation_task_id: null,
          suggested_by_ai: false,
        },
      ];

      prismaClient.sections.count.mockResolvedValueOnce(1);
      prismaClient.sections.findMany.mockResolvedValueOnce(mockSections);

      const result = await sectionsRepository.getSections(filters, sort, true);

      expect(prismaClient.sections.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('Should return paginated sections with heavy DTO', async () => {
      const filters: FiltersSection = {
        courseId: null,
        generationTaskId: null,
        title: 'Advanced',
        active: null,
        aiGenerated: true,
        suggestedByAI: null,
        durationHoursMin: null,
        durationHoursMax: null,
        orderMin: null,
        orderMax: null,
        createdAtStart: null,
        createdAtEnd: null,
      };
      const sort: SortingSections = {
        sortFields: [SORT_SECTION.DURATION_HOURS],
        page: 1,
        size: 10,
        sortDirection: 'desc',
      };

      const mockSections = [
        {
          id_section: 'section_2',
          course_id: 'course_2',
          title: 'Advanced Topics',
          description: 'Advanced section content',
          active: true,
          order: 2,
          duration_hours: 8,
          created_at: new Date('2025-02-01'),
          ai_generated: true,
          generation_task_id: 'task_123',
          suggested_by_ai: true,
        },
      ];

      prismaClient.sections.count.mockResolvedValueOnce(1);
      prismaClient.sections.findMany.mockResolvedValueOnce(mockSections);

      const result = await sectionsRepository.getSections(filters, sort, false);

      expect(prismaClient.sections.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
    });
  });

  describe('getSectionById', () => {
    it('Should return section by id with light DTO', async () => {
      const sectionId = 'section_123';
      const courseId = 'course_456';
      const title = 'Getting Started';
      const durationHours = 3;
      const createdAt = new Date('2025-03-01');
      const active = true;
      const order = 1;

      const expectedOutput: SectionCourseOutLightDTO = {
        idSection: sectionId,
        courseId,
        title,
        durationHours,
        createdAt,
        active,
        order,
      };

      prismaClient.sections.findUniqueOrThrow.mockResolvedValueOnce({
        id_section: sectionId,
        course_id: courseId,
        title,
        description: 'Some description',
        active,
        order,
        duration_hours: durationHours,
        created_at: createdAt,
        ai_generated: false,
        generation_task_id: null,
        suggested_by_ai: false,
      });

      const result = await sectionsRepository.getSectionById(sectionId, true);

      expect(prismaClient.sections.findUniqueOrThrow).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should return section by id with heavy DTO', async () => {
      const sectionId = 'section_789';
      const courseId = 'course_999';
      const title = 'AI Generated Section';
      const description = 'Complete section content';
      const durationHours = 10;
      const createdAt = new Date('2025-04-01');
      const active = true;
      const order = 3;
      const aiGenerated = true;
      const generationTaskId = 'task_ai_456';
      const suggestedByAi = true;

      const expectedOutput: SectionCourseOutHeavyDTO = {
        idSection: sectionId,
        courseId,
        title,
        description,
        durationHours,
        createdAt,
        active,
        order,
        aiGenerated,
        generationTaskId,
        suggestedByAi,
      };

      prismaClient.sections.findUniqueOrThrow.mockResolvedValueOnce({
        id_section: sectionId,
        course_id: courseId,
        title,
        description,
        active,
        order,
        duration_hours: durationHours,
        created_at: createdAt,
        ai_generated: aiGenerated,
        generation_task_id: generationTaskId,
        suggested_by_ai: suggestedByAi,
      });

      const result = await sectionsRepository.getSectionById(sectionId, false);

      expect(prismaClient.sections.findUniqueOrThrow).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should throw error when section not found', async () => {
      const sectionId = 'non_existent_section';

      prismaClient.sections.findUnique.mockResolvedValueOnce(null);

      await expect(sectionsRepository.getSectionById(sectionId, true)).rejects.toThrow();
    });
  });

  describe('createSection', () => {
    it('Should create a new section with light DTO', async () => {
      const courseId = 'course_new';
      const title = 'New Section';
      const description = 'New section description';
      const order = 1;
      const aiGenerated = false;
      const generationTaskId = null;
      const suggestedByAi = false;

      const inputSection: SectionCourseInDTO = {
        courseId,
        title,
        description,
        order,
        aiGenerated,
        generationTaskId,
        suggestedByAi,
      };

      const expectedOutput: SectionCourseOutLightDTO = {
        idSection: 'new_section_id',
        courseId,
        title,
        durationHours: 0,
        createdAt: new Date('2025-05-01'),
        active: false,
        order,
      };

      prismaClient.sections.create.mockResolvedValueOnce({
        id_section: 'new_section_id',
        course_id: courseId,
        title,
        description,
        active: false,
        order,
        duration_hours: 0,
        created_at: new Date('2025-05-01'),
        ai_generated: aiGenerated,
        generation_task_id: generationTaskId,
        suggested_by_ai: suggestedByAi,
      });

      const result = await sectionsRepository.createSection(inputSection, true);

      expect(prismaClient.sections.create).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should create a new section with heavy DTO', async () => {
      const courseId = 'course_ai';
      const title = 'AI Generated Section';
      const description = 'AI created content';
      const order = 2;
      const aiGenerated = true;
      const generationTaskId = 'task_new_789';
      const suggestedByAi = true;

      const inputSection: SectionCourseInDTO = {
        courseId,
        title,
        description,
        order,
        aiGenerated,
        generationTaskId,
        suggestedByAi,
      };

      const expectedOutput: SectionCourseOutHeavyDTO = {
        idSection: 'new_ai_section_id',
        courseId,
        title,
        description,
        durationHours: 0,
        createdAt: new Date('2025-05-01'),
        active: false,
        order,
        aiGenerated,
        generationTaskId,
        suggestedByAi,
      };

      prismaClient.sections.create.mockResolvedValueOnce({
        id_section: 'new_ai_section_id',
        course_id: courseId,
        title,
        description,
        active: false,
        order,
        duration_hours: 0,
        created_at: new Date('2025-05-01'),
        ai_generated: aiGenerated,
        generation_task_id: generationTaskId,
        suggested_by_ai: suggestedByAi,
      });

      const result = await sectionsRepository.createSection(inputSection, false);

      expect(prismaClient.sections.create).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });
  });

  describe('updateSection', () => {
    it('Should update an existing section with light DTO', async () => {
      const sectionId = 'section_to_update';
      const courseId = 'course_updated';
      const title = 'Updated Section Title';
      const description = 'Updated description';
      const order = 5;
      const active = true;
      const aiGenerated = false;
      const generationTaskId = null;
      const suggestedByAi = false;

      const updateDTO: Partial<SectionCourseUpdateDTO> = {
        courseId,
        title,
        description,
        order,
        active,
        aiGenerated,
        generationTaskId,
        suggestedByAi,
      };

      const expectedOutput: SectionCourseOutLightDTO = {
        idSection: sectionId,
        courseId,
        title,
        durationHours: 5,
        createdAt: new Date('2025-01-01'),
        active,
        order,
      };

      prismaClient.sections.update.mockResolvedValueOnce({
        id_section: sectionId,
        course_id: courseId,
        title,
        description,
        active,
        order,
        duration_hours: 5,
        created_at: new Date('2025-01-01'),
        ai_generated: aiGenerated,
        generation_task_id: generationTaskId,
        suggested_by_ai: suggestedByAi,
      });

      const result = await sectionsRepository.updateSection(sectionId, updateDTO, true);

      expect(prismaClient.sections.update).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should update an existing section with heavy DTO', async () => {
      const sectionId = 'section_full_update';
      const courseId = 'course_full';
      const title = 'Complete Updated Section';
      const description = 'Fully updated content';
      const order = 8;
      const active = true;
      const aiGenerated = true;
      const generationTaskId = 'task_updated_123';
      const suggestedByAi = true;

      const updateDTO: Partial<SectionCourseUpdateDTO> = {
        courseId,
        title,
        description,
        order,
        active,
        aiGenerated,
        generationTaskId,
        suggestedByAi,
      };

      const expectedOutput: SectionCourseOutHeavyDTO = {
        idSection: sectionId,
        courseId,
        title,
        description,
        durationHours: 12,
        createdAt: new Date('2025-01-01'),
        active,
        order,
        aiGenerated,
        generationTaskId,
        suggestedByAi,
      };

      prismaClient.sections.update.mockResolvedValueOnce({
        id_section: sectionId,
        course_id: courseId,
        title,
        description,
        active,
        order,
        duration_hours: 12,
        created_at: new Date('2025-01-01'),
        ai_generated: aiGenerated,
        generation_task_id: generationTaskId,
        suggested_by_ai: suggestedByAi,
      });

      const result = await sectionsRepository.updateSection(sectionId, updateDTO, false);

      expect(prismaClient.sections.update).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should update only some fields of a section', async () => {
      const sectionId = 'section_partial_update';
      const partialUpdateDTO: Partial<SectionCourseUpdateDTO> = {
        title: 'Only Title Updated',
        active: true,
      };

      const existingData = {
        id_section: sectionId,
        course_id: 'course_original',
        title: 'Only Title Updated',
        description: 'Original description',
        active: true,
        order: 3,
        duration_hours: 7,
        created_at: new Date('2025-01-15'),
        ai_generated: false,
        generation_task_id: null,
        suggested_by_ai: false,
      };

      const expectedOutput: SectionCourseOutHeavyDTO = {
        idSection: sectionId,
        courseId: 'course_original',
        title: 'Only Title Updated',
        description: 'Original description',
        durationHours: 7,
        createdAt: new Date('2025-01-15'),
        active: true,
        order: 3,
        aiGenerated: false,
        generationTaskId: null,
        suggestedByAi: false,
      };

      prismaClient.sections.update.mockResolvedValueOnce(existingData);

      const result = await sectionsRepository.updateSection(sectionId, partialUpdateDTO, false);

      expect(prismaClient.sections.update).toHaveBeenCalledOnce();
      expect(result).toEqual(expectedOutput);
    });

    it('Should throw error when trying to update non-existent section', async () => {
      const sectionId = 'non_existent_section';
      const updateDTO: Partial<SectionCourseUpdateDTO> = {
        courseId: 'course_1',
        title: 'Test',
        description: 'Test',
        order: 1,
        active: true,
        aiGenerated: false,
        generationTaskId: null,
        suggestedByAi: false,
      };

      prismaClient.sections.findUnique.mockResolvedValueOnce(null);

      await expect(sectionsRepository.updateSection(sectionId, updateDTO, true)).rejects.toThrow();
    });
  });

  describe('deleteSectionById', () => {
    it('Should delete a section by id', async () => {
      const sectionId = 'section_to_delete';

      prismaClient.sections.delete.mockResolvedValueOnce({
        id_section: sectionId,
        course_id: 'course_1',
        title: 'Deleted Section',
        description: 'Deleted',
        active: false,
        order: 1,
        duration_hours: 0,
        created_at: new Date(),
        ai_generated: false,
        generation_task_id: null,
        suggested_by_ai: false,
      });

      await sectionsRepository.deleteSectionById(sectionId);

      expect(prismaClient.sections.delete).toHaveBeenCalledOnce();
    });

    it('Should throw error when trying to delete non-existent section', async () => {
      const sectionId = 'non_existent_section';

      prismaClient.sections.findUnique.mockResolvedValueOnce(null);

      await expect(sectionsRepository.deleteSectionById(sectionId)).rejects.toThrow();
    });
  });
});
