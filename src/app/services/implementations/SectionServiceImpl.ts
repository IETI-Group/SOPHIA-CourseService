import type { ApiResponse, FiltersSection, SortingSections } from '../../../utils/index.js';
import type { SectionCourseInDTO, SectionCourseUpdateDTO } from '../../models/index.js';
import type { SectionsRepository } from '../../repositories/index.js';
import type { SectionService } from '../index.js';

export class SectionServiceImpl implements SectionService {
  private readonly sectionsRepository: SectionsRepository;
  constructor(sectionsRepository: SectionsRepository) {
    this.sectionsRepository = sectionsRepository;
  }
  getCourseSections(
    _filters: FiltersSection,
    _sort: SortingSections,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    this.sectionsRepository;
    throw new Error('Method not implemented.');
  }
  getSectionById(_sectionId: string, _lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  postCourseSection(_dto: SectionCourseInDTO, _lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  putSection(
    _sectionId: string,
    _dto: Partial<SectionCourseUpdateDTO>,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
  deleteSection(_sectionId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented.');
  }
}
