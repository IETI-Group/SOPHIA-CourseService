import type { PrismaClient } from '@prisma/client/default.js';
import type { FiltersSection, PaginatedSections, SortingSections } from '../../../utils/index.js';
import type {
  SectionCourseInDTO,
  SectionCourseOutLightDTO,
  SectionCourseUpdateDTO,
} from '../../models/index.js';
import type { SectionsRepository } from '../index.js';

export class SectionsRepositoryPostgreSQL implements SectionsRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }
  getSections(
    _filters: FiltersSection,
    _sort: SortingSections,
    _lightDTO: boolean
  ): Promise<PaginatedSections> {
    // To avoid unused variable error for
    this.prismaClient;
    throw new Error('Method not implemented.');
  }
  getSectionById(_sectionId: string, _lightDTO: boolean): Promise<SectionCourseOutLightDTO> {
    throw new Error('Method not implemented.');
  }
  createSection(_dto: SectionCourseInDTO, _lightDTO: boolean): Promise<SectionCourseOutLightDTO> {
    throw new Error('Method not implemented.');
  }
  updateSection(
    _sectionId: string,
    _dto: SectionCourseUpdateDTO,
    _lightDTO: boolean
  ): Promise<SectionCourseOutLightDTO> {
    throw new Error('Method not implemented.');
  }
  deleteSectionById(_sectionId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
