import { DiscriminantResource, type Prisma, type PrismaClient } from '@prisma/client/default.js';
import type {
  FiltersResource,
  Json,
  PaginatedResources,
  SortingResources,
} from '../../../utils/index.js';
import { SORT_RESOURCE } from '../../../utils/index.js';
import type {
  ResourcesInDTO,
  ResourcesOutHeavyDTO,
  ResourcesOutLightDTO,
} from '../../models/index.js';
import type { ResourcesRepository } from '../index.js';

export class ResourcesRepositoryPostgreSQL implements ResourcesRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  private addExactFilter(
    whereClause: Prisma.ResourcesWhereInput,
    field: keyof Prisma.ResourcesWhereInput,
    value: string | null | undefined
  ): void {
    if (value !== null && value !== undefined) {
      (whereClause[field] as string) = value;
    }
  }

  private addTextFilter(
    whereClause: Prisma.ResourcesWhereInput,
    field: keyof Prisma.ResourcesWhereInput,
    value: string | null | undefined
  ): void {
    if (value !== null && value !== undefined) {
      (whereClause[field] as Prisma.StringFilter) = {
        contains: value,
        mode: 'insensitive',
      };
    }
  }

  private addNumericRangeFilter(
    whereClause: Prisma.ResourcesWhereInput,
    field: keyof Prisma.ResourcesWhereInput,
    min: number | null,
    max: number | null
  ): void {
    if (min !== null || max !== null) {
      (whereClause[field] as Prisma.IntFilter) = {
        ...(min !== null && { gte: min }),
        ...(max !== null && { lte: max }),
      };
    }
  }

  private getDiscriminantFilter(discriminant: DiscriminantResource): Prisma.ResourcesWhereInput {
    switch (discriminant) {
      case DiscriminantResource.LESSON:
        return { lesson: { isNot: null } };
      case DiscriminantResource.QUIZ_OPTION:
        return { quiz_option: { isNot: null } };
      case DiscriminantResource.QUIZ_QUESTION:
        return { quiz_question: { isNot: null } };
      case DiscriminantResource.SUBMISSION:
        return { submission: { isNot: null } };
      default:
        return {};
    }
  }

  private buildWhere(filters: FiltersResource): Prisma.ResourcesWhereInput {
    const whereClause: Prisma.ResourcesWhereInput = {};

    this.addTextFilter(whereClause, 'name', filters.name);
    this.addExactFilter(whereClause, 'type', filters.type);
    this.addNumericRangeFilter(whereClause, 'order', filters.orderMin, filters.orderMax);
    this.addNumericRangeFilter(
      whereClause,
      'duration_seconds',
      filters.durationSecondsMin,
      filters.durationSecondsMax
    );
    this.addNumericRangeFilter(
      whereClause,
      'file_size_mb',
      filters.fileSizeMbMin,
      filters.fileSizeMbMax
    );

    if (filters.discriminant !== null && filters.discriminant !== undefined) {
      Object.assign(whereClause, this.getDiscriminantFilter(filters.discriminant));
    }

    if (filters.entityReference !== null && filters.entityReference !== undefined) {
      whereClause.OR = [
        { lesson: { lesson_content_id: filters.entityReference } },
        { quiz_option: { quiz_option_id: filters.entityReference } },
        { quiz_question: { quiz_question_id: filters.entityReference } },
        { submission: { submission_id: filters.entityReference } },
      ];
    }

    return whereClause;
  }

  private buildSort(sortParams: SortingResources): Prisma.ResourcesOrderByWithRelationInput[] {
    const orderBy: Prisma.ResourcesOrderByWithRelationInput[] = [];
    const direction = sortParams.sortDirection;

    for (const sortField of sortParams.sortFields) {
      switch (sortField) {
        case SORT_RESOURCE.NAME:
          orderBy.push({ name: direction });
          break;
        case SORT_RESOURCE.TYPE:
          orderBy.push({ type: direction });
          break;
        case SORT_RESOURCE.ORDER:
          orderBy.push({ order: direction });
          break;
        case SORT_RESOURCE.DURATION_SECONDS:
          orderBy.push({ duration_seconds: direction });
          break;
        case SORT_RESOURCE.FILE_SIZE_MB:
          orderBy.push({ file_size_mb: direction });
          break;
      }
    }

    return orderBy;
  }

  private buildSelect(lightDTO: boolean): Prisma.ResourcesSelect {
    const select: Prisma.ResourcesSelect = {
      id_resource: true,
      name: true,
      type: true,
      url: true,
      content: true,
      order: true,
      duration_seconds: true,
      file_size_mb: true,
      lesson: { select: { lesson_content_id: true } },
      quiz_option: { select: { quiz_option_id: true } },
      quiz_question: { select: { quiz_question_id: true } },
      submission: { select: { submission_id: true } },
    };

    if (!lightDTO) {
      select.mime_type = true;
      select.thumnail_url = true;
      select.metadata = true;
    }

    return select;
  }

  private getDiscriminantFromRecord(
    record: Prisma.ResourcesGetPayload<{ select: Prisma.ResourcesSelect }>
  ): DiscriminantResource {
    if (record.lesson) return DiscriminantResource.LESSON;
    if (record.quiz_option) return DiscriminantResource.QUIZ_OPTION;
    if (record.quiz_question) return DiscriminantResource.QUIZ_QUESTION;
    if (record.submission) return DiscriminantResource.SUBMISSION;
    return DiscriminantResource.LESSON;
  }

  private getEntityReferenceFromRecord(
    record: Prisma.ResourcesGetPayload<{ select: Prisma.ResourcesSelect }>
  ): string {
    if (record.lesson) return record.lesson.lesson_content_id;
    if (record.quiz_option) return record.quiz_option.quiz_option_id;
    if (record.quiz_question) return record.quiz_question.quiz_question_id;
    if (record.submission) return record.submission.submission_id;
    return '';
  }

  private buildLightDTO(
    record: Prisma.ResourcesGetPayload<{ select: Prisma.ResourcesSelect }>
  ): ResourcesOutLightDTO {
    return {
      idResource: record.id_resource,
      entityReference: this.getEntityReferenceFromRecord(record),
      discriminant: this.getDiscriminantFromRecord(record),
      name: record.name,
      type: record.type,
      url: record.url,
      content: record.content,
      order: record.order,
      durationSeconds: record.duration_seconds,
      fileSizeMb: record.file_size_mb,
    };
  }

  private buildHeavyDTO(
    record: Prisma.ResourcesGetPayload<{ select: Prisma.ResourcesSelect }>
  ): ResourcesOutHeavyDTO {
    return {
      ...this.buildLightDTO(record),
      mimeType: record.mime_type ?? null,
      thumnailUrl: record.thumnail_url ?? null,
      metadata: record.metadata as Json,
    };
  }

  private buildDTO(
    lightDTO: boolean,
    record: Prisma.ResourcesGetPayload<{ select: Prisma.ResourcesSelect }>
  ): ResourcesOutLightDTO {
    return lightDTO ? this.buildLightDTO(record) : this.buildHeavyDTO(record);
  }

  private buildPaginatedResponse(
    data: ResourcesOutLightDTO[],
    total: number,
    page: number,
    size: number
  ): PaginatedResources {
    const totalPages = Math.ceil(total / size);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      success: true,
      message: 'Resources retrieved successfully',
      data,
      timestamp: new Date().toISOString(),
      page,
      size,
      total,
      totalPages,
      hasNext,
      hasPrev,
    };
  }

  private async createChildResource(
    resourceId: string,
    discriminant: DiscriminantResource,
    entityReference: string
  ): Promise<void> {
    switch (discriminant) {
      case DiscriminantResource.LESSON:
        await this.prismaClient.lessonResources.create({
          data: {
            id_resource: resourceId,
            lesson_content_id: entityReference,
          },
        });
        break;
      case DiscriminantResource.QUIZ_OPTION:
        await this.prismaClient.quizOptionResources.create({
          data: {
            id_resource: resourceId,
            quiz_option_id: entityReference,
          },
        });
        break;
      case DiscriminantResource.QUIZ_QUESTION:
        await this.prismaClient.quizQuestionResources.create({
          data: {
            id_resource: resourceId,
            quiz_question_id: entityReference,
          },
        });
        break;
      case DiscriminantResource.SUBMISSION:
        await this.prismaClient.submissionResources.create({
          data: {
            id_resource: resourceId,
            submission_id: entityReference,
          },
        });
        break;
    }
  }

  private async deleteChildResource(resourceId: string): Promise<void> {
    const promises = [
      this.prismaClient.lessonResources
        .delete({ where: { id_resource: resourceId } })
        .catch(() => null),
      this.prismaClient.quizOptionResources
        .delete({ where: { id_resource: resourceId } })
        .catch(() => null),
      this.prismaClient.quizQuestionResources
        .delete({ where: { id_resource: resourceId } })
        .catch(() => null),
      this.prismaClient.submissionResources
        .delete({ where: { id_resource: resourceId } })
        .catch(() => null),
    ];

    const results = await Promise.all(promises);

    if (results.every((result) => result === null)) {
      throw new Error('Resource child not found');
    }
  }

  async getResources(
    filters: FiltersResource,
    sort: SortingResources,
    lightDTO: boolean
  ): Promise<PaginatedResources> {
    const where = this.buildWhere(filters);
    const orderBy = this.buildSort(sort);
    const skip = (sort.page - 1) * sort.size;
    const take = sort.size;
    const select = this.buildSelect(lightDTO);

    const [resources, total] = await Promise.all([
      this.prismaClient.resources.findMany({
        where,
        orderBy,
        skip,
        take,
        select,
      }),
      this.prismaClient.resources.count({ where }),
    ]);

    const dtos = resources.map((resource) => this.buildDTO(lightDTO, resource));
    return this.buildPaginatedResponse(dtos, total, sort.page, sort.size);
  }

  async getResourceById(resourceId: string, lightDTO: boolean): Promise<ResourcesOutLightDTO> {
    const select = this.buildSelect(lightDTO);
    const resource = await this.prismaClient.resources.findUniqueOrThrow({
      where: { id_resource: resourceId },
      select,
    });

    return this.buildDTO(lightDTO, resource);
  }

  async createResource(dto: ResourcesInDTO, lightDTO: boolean): Promise<ResourcesOutLightDTO> {
    const select = this.buildSelect(lightDTO);
    const resource = await this.prismaClient.resources.create({
      data: {
        name: dto.name,
        type: dto.type,
        url: dto.url,
        content: dto.content,
        order: dto.order,
        duration_seconds: dto.durationSeconds,
        file_size_mb: dto.fileSizeMb,
        mime_type: dto.mimeType,
        thumnail_url: dto.thumnailUrl,
        metadata: dto.metadata as Prisma.InputJsonValue,
      },
      select,
    });

    await this.createChildResource(resource.id_resource, dto.discriminant, dto.entityReference);

    const resourceWithChild = await this.prismaClient.resources.findUniqueOrThrow({
      where: { id_resource: resource.id_resource },
      select,
    });

    return this.buildDTO(lightDTO, resourceWithChild);
  }

  async updateResource(
    resourceId: string,
    dto: ResourcesInDTO,
    lightDTO: boolean
  ): Promise<ResourcesOutLightDTO> {
    const select = this.buildSelect(lightDTO);
    const resource = await this.prismaClient.resources.update({
      where: { id_resource: resourceId },
      data: {
        name: dto.name,
        type: dto.type,
        url: dto.url,
        content: dto.content,
        order: dto.order,
        duration_seconds: dto.durationSeconds,
        file_size_mb: dto.fileSizeMb,
        mime_type: dto.mimeType,
        thumnail_url: dto.thumnailUrl,
        metadata: dto.metadata as Prisma.InputJsonValue,
      },
      select,
    });

    return this.buildDTO(lightDTO, resource);
  }

  async deleteResourceById(resourceId: string): Promise<void> {
    await this.deleteChildResource(resourceId);
    await this.prismaClient.resources.delete({
      where: { id_resource: resourceId },
    });
  }
}
