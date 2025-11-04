import type { SectionCourseInDTO, SectionCourseUpdateDTO } from '../app/index.js';
import type { ApiResponse, FiltersSection, SortingSections } from '../utils/index.js';

export class SectionsController {
  getCourseSections(
    _filters: FiltersSection,
    _sort: SortingSections,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  getSectionById(_sectionId: string, _lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  postCourseSection(_dto: SectionCourseInDTO, _lightDTO?: boolean): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  putSection(
    _sectionId: string,
    _dto: SectionCourseUpdateDTO,
    _lightDTO?: boolean
  ): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
  deleteSection(_sectionId: string): Promise<ApiResponse<unknown>> {
    throw new Error('Method not implemented');
  }
}
