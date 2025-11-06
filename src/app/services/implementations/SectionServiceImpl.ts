import {
  type ApiResponse,
  type FiltersSection,
  parseApiResponse,
  type SortingSections,
} from '../../../utils/index.js';
import type { SectionCourseInDTO, SectionCourseUpdateDTO } from '../../models/index.js';
import type { SectionsRepository } from '../../repositories/index.js';
import type { SectionService } from '../index.js';

export class SectionServiceImpl implements SectionService {
  private readonly sectionsRepository: SectionsRepository;
  constructor(sectionsRepository: SectionsRepository) {
    this.sectionsRepository = sectionsRepository;
  }
  getCourseSections(
    filters: FiltersSection,
    sort: SortingSections,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    return this.sectionsRepository.getSections(filters, sort, lightDTO);
  }
  async getSectionById(sectionId: string, lightDTO: boolean): Promise<ApiResponse<unknown>> {
    const result = await this.sectionsRepository.getSectionById(sectionId, lightDTO);
    return parseApiResponse(result, 'Section retrieved successfully');
  }
  async postCourseSection(
    dto: SectionCourseInDTO,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    const result = await this.sectionsRepository.createSection(dto, lightDTO);
    return parseApiResponse(result, 'Section created successfully');
  }
  async putSection(
    sectionId: string,
    dto: Partial<SectionCourseUpdateDTO>,
    lightDTO: boolean
  ): Promise<ApiResponse<unknown>> {
    const result = await this.sectionsRepository.updateSection(sectionId, dto, lightDTO);
    return parseApiResponse(result, 'Section updated successfully');
  }
  async deleteSection(sectionId: string): Promise<ApiResponse<unknown>> {
    await this.sectionsRepository.deleteSectionById(sectionId);
    return parseApiResponse(null, 'Section deleted successfully');
  }
}
