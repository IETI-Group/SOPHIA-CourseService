import type { Prisma, PrismaClient } from '@prisma/client/default.js';
import type {
  FiltersInscription,
  PaginatedInscriptions,
  SortingInscriptions,
} from '../../../utils/index.js';
import { SORT_INSCRIPTION } from '../../../utils/index.js';
import type {
  InscriptionCourseInDTO,
  InscriptionCourseOutDTO,
  InscriptionCourseUpdateDTO,
} from '../../models/index.js';
import type { InscriptionsCourseRepository } from '../index.js';

export class InscriptionsCourseRepositoryPostgreSQL implements InscriptionsCourseRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  private addExactFilter<T>(value: T | null, field: string, where: Record<string, unknown>): void {
    if (value !== null && value !== undefined) {
      where[field] = value;
    }
  }

  private addDateRangeFilter(
    start: Date | null,
    end: Date | null,
    field: string,
    where: Record<string, unknown>
  ): void {
    if (start !== null || end !== null) {
      const rangeFilter: Prisma.DateTimeFilter = {};
      if (start !== null) rangeFilter.gte = start;
      if (end !== null) rangeFilter.lte = end;
      where[field] = rangeFilter;
    }
  }

  private buildWhere(filters: FiltersInscription): Record<string, unknown> {
    const where: Record<string, unknown> = {};

    this.addExactFilter(filters.courseId, 'course_id', where);
    this.addExactFilter(filters.active, 'active', where);
    this.addExactFilter(filters.completed, 'completed', where);

    this.addDateRangeFilter(filters.createdAtStart, filters.createdAtEnd, 'created_at', where);

    return where;
  }

  private readonly sortFieldMapping: Record<SORT_INSCRIPTION, string> = {
    [SORT_INSCRIPTION.COMPLETED]: 'completed',
    [SORT_INSCRIPTION.CREATION_DATE]: 'created_at',
    [SORT_INSCRIPTION.PROGRESS_PERCENTAGE]: 'progress_percentage',
    [SORT_INSCRIPTION.SCORE]: 'score',
    [SORT_INSCRIPTION.ACTIVE]: 'active',
  };

  private buildSort(sort: SortingInscriptions): Record<string, Prisma.SortOrder>[] {
    const orderBy: Record<string, Prisma.SortOrder>[] = [];

    for (const field of sort.sortFields) {
      const mappedField = this.sortFieldMapping[field];
      if (mappedField) {
        orderBy.push({ [mappedField]: sort.sortDirection });
      }
    }

    return orderBy;
  }

  private buildDTO(inscription: {
    id_inscription: string;
    user_id: string;
    course_id: string;
    created_at: Date;
    progress_percentage: number;
    score: number | null;
    active: boolean;
    completed: boolean;
  }): InscriptionCourseOutDTO {
    return {
      idInscription: inscription.id_inscription,
      userId: inscription.user_id,
      courseId: inscription.course_id,
      createdAt: inscription.created_at,
      progressPercentage: inscription.progress_percentage,
      score: inscription.score,
      active: inscription.active,
      completed: inscription.completed,
    };
  }

  private buildPaginatedResponse(
    data: InscriptionCourseOutDTO[],
    page: number,
    size: number,
    total: number
  ): PaginatedInscriptions {
    return {
      success: true,
      message: 'Inscriptions retrieved successfully',
      data,
      page,
      size,
      total,
      totalPages: Math.ceil(total / size),
      hasNext: page * size < total,
      hasPrev: page > 1,
      timestamp: new Date().toISOString(),
    };
  }

  async getInscriptions(
    filters: FiltersInscription,
    sort: SortingInscriptions
  ): Promise<PaginatedInscriptions> {
    const where = this.buildWhere(filters);
    const orderBy = this.buildSort(sort);
    const skip = (sort.page - 1) * sort.size;

    const [inscriptions, total] = await Promise.all([
      this.prismaClient.inscriptions.findMany({
        where,
        orderBy,
        skip,
        take: sort.size,
      }),
      this.prismaClient.inscriptions.count({ where }),
    ]);

    const inscriptionDTOs = inscriptions.map((inscription) => this.buildDTO(inscription));

    return this.buildPaginatedResponse(inscriptionDTOs, sort.page, sort.size, total);
  }

  async getInscriptionById(inscriptionId: string): Promise<InscriptionCourseOutDTO> {
    const inscription = await this.prismaClient.inscriptions.findUniqueOrThrow({
      where: { id_inscription: inscriptionId },
    });

    return this.buildDTO(inscription);
  }

  async createInscription(dto: InscriptionCourseInDTO): Promise<InscriptionCourseOutDTO> {
    const inscription = await this.prismaClient.inscriptions.create({
      data: {
        user_id: dto.userId,
        course_id: dto.courseId,
        active: false,
      },
    });

    return this.buildDTO(inscription);
  }

  async updateInscription(
    inscriptionId: string,
    dto: InscriptionCourseUpdateDTO
  ): Promise<InscriptionCourseOutDTO> {
    const inscription = await this.prismaClient.inscriptions.update({
      where: { id_inscription: inscriptionId },
      data: {
        user_id: dto.userId,
        course_id: dto.courseId,
        progress_percentage: dto.progressPercentage,
        score: dto.score,
        active: dto.active,
      },
    });

    return this.buildDTO(inscription);
  }

  async deleteInscriptionById(inscriptionId: string): Promise<void> {
    const result = await this.prismaClient.inscriptions.delete({
      where: { id_inscription: inscriptionId },
    });
    if (!result) throw new Error('Inscription not found');
  }
}
