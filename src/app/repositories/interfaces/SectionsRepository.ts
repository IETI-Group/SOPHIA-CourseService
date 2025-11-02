import type { FiltersSection, PaginatedSections, SortingSections } from '../../../utils/index.js';
import type {
  SectionCourseInDTO,
  SectionCourseOutLightDTO,
  SectionCourseUpdateDTO,
} from '../../models/index.js';

export interface SectionsRepository {
  getSections(filters: FiltersSection, sort: SortingSections, lightDTO: boolean): PaginatedSections;
  getSectionById(sectionId: string, lightDTO: boolean): SectionCourseOutLightDTO;
  createSection(dto: SectionCourseInDTO, lightDTO: boolean): SectionCourseOutLightDTO;
  updateSection(
    sectionId: string,
    dto: SectionCourseUpdateDTO,
    lightDTO: boolean
  ): SectionCourseOutLightDTO;
  deleteSectionById(sectionId: string): void;
}
