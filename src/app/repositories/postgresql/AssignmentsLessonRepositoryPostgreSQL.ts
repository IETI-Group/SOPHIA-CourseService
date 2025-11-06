import type { Prisma, PrismaClient } from '@prisma/client/default.js';
import type {
  FiltersAssignmentLesson,
  PaginatedAssignments,
  SortingAssignments,
} from '../../../utils/index.js';
import { SORT_ASSIGNMENT } from '../../../utils/index.js';
import type {
  AssignmentLessonInDTO,
  AssignmentLessonOutDTO,
  AssignmentLessonUpdateDTO,
} from '../../models/index.js';
import type { AssignmentsLessonRepository } from '../index.js';

export class AssignmentsLessonRepositoryPostgreSQL implements AssignmentsLessonRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  private addExactFilter<T>(value: T | null, field: string, where: Record<string, unknown>): void {
    if (value !== null && value !== undefined) {
      where[field] = value;
    }
  }

  private addTextFilter(value: string | null, field: string, where: Record<string, unknown>): void {
    if (value !== null && value !== undefined) {
      where[field] = {
        contains: value,
        mode: 'insensitive',
      } as Prisma.StringFilter;
    }
  }

  private addNumericRangeFilter(
    min: number | null,
    max: number | null,
    field: string,
    where: Record<string, unknown>
  ): void {
    if (min !== null || max !== null) {
      const rangeFilter: Prisma.IntFilter | Prisma.FloatFilter = {};
      if (min !== null) rangeFilter.gte = min;
      if (max !== null) rangeFilter.lte = max;
      where[field] = rangeFilter;
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

  private buildWhere(filters: FiltersAssignmentLesson): Record<string, unknown> {
    const where: Record<string, unknown> = {};

    this.addExactFilter(filters.lessonId, 'lesson_id', where);
    this.addTextFilter(filters.title, 'title', where);
    this.addExactFilter(filters.allowedTypes, 'allowed_types', where);
    this.addExactFilter(filters.active, 'active', where);

    this.addNumericRangeFilter(
      filters.limitFileSizeMbMin,
      filters.limitFileSizeMbMax,
      'max_file_size_mb',
      where
    );
    this.addNumericRangeFilter(filters.limitScoreMin, filters.limitScoreMax, 'max_score', where);
    this.addDateRangeFilter(filters.createdAtStart, filters.createdAtEnd, 'created_at', where);
    this.addDateRangeFilter(filters.dueDateStart, filters.dueDateEnd, 'due_date', where);

    return where;
  }

  private readonly sortFieldMapping: Record<SORT_ASSIGNMENT, string> = {
    [SORT_ASSIGNMENT.TITLE]: 'title',
    [SORT_ASSIGNMENT.MAX_FILE_SIZE_MB]: 'max_file_size_mb',
    [SORT_ASSIGNMENT.ALLOWED_TYPES]: 'allowed_types',
    [SORT_ASSIGNMENT.DUE_DATE]: 'due_date',
    [SORT_ASSIGNMENT.MAX_SCORE]: 'max_score',
    [SORT_ASSIGNMENT.ACTIVE]: 'active',
    [SORT_ASSIGNMENT.CREATION_DATE]: 'created_at',
  };

  private buildSort(sort: SortingAssignments): Record<string, Prisma.SortOrder>[] {
    const orderBy: Record<string, Prisma.SortOrder>[] = [];

    for (const field of sort.sortFields) {
      const mappedField = this.sortFieldMapping[field];
      if (mappedField) {
        orderBy.push({ [mappedField]: sort.sortDirection });
      }
    }

    return orderBy;
  }

  private buildDTO(assignment: {
    id_assignment: string;
    lesson_id: string;
    title: string;
    instructions: string;
    max_file_size_mb: number;
    allowed_types: string;
    created_at: Date;
    due_date: Date;
    max_score: number;
    active: boolean;
  }): AssignmentLessonOutDTO {
    return {
      idAssignment: assignment.id_assignment,
      lessonId: assignment.lesson_id,
      title: assignment.title,
      instructions: assignment.instructions,
      maxFileSizeMb: assignment.max_file_size_mb,
      allowedTypes: assignment.allowed_types as never,
      createdAt: assignment.created_at,
      dueDate: assignment.due_date,
      maxScore: assignment.max_score,
      active: assignment.active,
    };
  }

  private buildPaginatedResponse(
    data: AssignmentLessonOutDTO[],
    page: number,
    size: number,
    total: number
  ): PaginatedAssignments {
    return {
      success: true,
      message: 'Assignments retrieved successfully',
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

  async getAssignments(
    filters: FiltersAssignmentLesson,
    sort: SortingAssignments
  ): Promise<PaginatedAssignments> {
    const where = this.buildWhere(filters);
    const orderBy = this.buildSort(sort);
    const skip = (sort.page - 1) * sort.size;

    const [assignments, total] = await Promise.all([
      this.prismaClient.assignments.findMany({
        where,
        orderBy,
        skip,
        take: sort.size,
      }),
      this.prismaClient.assignments.count({ where }),
    ]);

    const assignmentDTOs = assignments.map((assignment) => this.buildDTO(assignment));

    return this.buildPaginatedResponse(assignmentDTOs, sort.page, sort.size, total);
  }

  async getAssignmentById(assignmentLessonId: string): Promise<AssignmentLessonOutDTO> {
    const assignment = await this.prismaClient.assignments.findUniqueOrThrow({
      where: { id_assignment: assignmentLessonId },
    });

    return this.buildDTO(assignment);
  }

  async createAssignment(dto: AssignmentLessonInDTO): Promise<AssignmentLessonOutDTO> {
    const assignment = await this.prismaClient.assignments.create({
      data: {
        lesson_id: dto.lessonId,
        title: dto.title,
        instructions: dto.instructions,
        max_file_size_mb: dto.maxFileSizeMb,
        allowed_types: dto.allowedTypes as never,
        due_date: dto.dueDate,
        max_score: dto.maxScore,
        active: false,
      },
    });

    return this.buildDTO(assignment);
  }

  async updateAssignment(
    assignmentLessonId: string,
    dto: Partial<AssignmentLessonUpdateDTO>
  ): Promise<AssignmentLessonOutDTO> {
    const dataToUpdate: Record<string, unknown> = {};

    if (dto.lessonId !== undefined) {
      dataToUpdate.lesson_id = dto.lessonId;
    }
    if (dto.title !== undefined) {
      dataToUpdate.title = dto.title;
    }
    if (dto.instructions !== undefined) {
      dataToUpdate.instructions = dto.instructions;
    }
    if (dto.maxFileSizeMb !== undefined) {
      dataToUpdate.max_file_size_mb = dto.maxFileSizeMb;
    }
    if (dto.allowedTypes !== undefined) {
      dataToUpdate.allowed_types = dto.allowedTypes as never;
    }
    if (dto.dueDate !== undefined) {
      dataToUpdate.due_date = dto.dueDate;
    }
    if (dto.maxScore !== undefined) {
      dataToUpdate.max_score = dto.maxScore;
    }
    if (dto.active !== undefined) {
      dataToUpdate.active = dto.active;
    }

    const assignment = await this.prismaClient.assignments.update({
      where: { id_assignment: assignmentLessonId },
      data: dataToUpdate,
    });

    return this.buildDTO(assignment);
  }

  async deleteAssignmentById(assignmentLessonId: string): Promise<void> {
    await this.prismaClient.assignments.delete({
      where: { id_assignment: assignmentLessonId },
    });
  }
}
