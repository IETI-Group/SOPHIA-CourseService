import type { Prisma, PrismaClient } from '@prisma/client/default.js';
import type {
  FiltersAISpecsLesson,
  Json,
  PaginatedLessonAISpecs,
  SortingAILessonSpecs,
} from '../../../utils/index.js';
import type {
  AISpecsLessonInDTO,
  AISpecsLessonOutHeavyDTO,
  AISpecsLessonOutLightDTO,
} from '../../models/index.js';
import type { AISpecsLessonRepository } from '../index.js';

export class AISpecsLessonRepositoryPostgreSQL implements AISpecsLessonRepository {
  private readonly prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  private buildWhere(filters: FiltersAISpecsLesson): Prisma.LessonAISpecsWhereInput {
    const whereClause: Prisma.LessonAISpecsWhereInput = {};

    if (filters.lessonContentId !== null && filters.lessonContentId !== undefined) {
      whereClause.lesson_content_id = filters.lessonContentId;
    }

    if (filters.generationPromptSummary !== null && filters.generationPromptSummary !== undefined) {
      whereClause.generation_prompt_summary = {
        contains: filters.generationPromptSummary,
        mode: 'insensitive',
      };
    }

    if (filters.estimatedVideoDurationMin !== null || filters.estimatedVideoDurationMax !== null) {
      whereClause.estimated_video_duration_mins = {};
      if (filters.estimatedVideoDurationMin !== null) {
        whereClause.estimated_video_duration_mins.gte = filters.estimatedVideoDurationMin;
      }
      if (filters.estimatedVideoDurationMax !== null) {
        whereClause.estimated_video_duration_mins.lte = filters.estimatedVideoDurationMax;
      }
    }

    if (filters.createdAtStart !== null || filters.createdAtEnd !== null) {
      whereClause.created_at = {};
      if (filters.createdAtStart !== null) {
        whereClause.created_at.gte = filters.createdAtStart;
      }
      if (filters.createdAtEnd !== null) {
        whereClause.created_at.lte = filters.createdAtEnd;
      }
    }
    return whereClause;
  }

  private buildSort(
    sortParams: SortingAILessonSpecs
  ): Prisma.LessonAISpecsOrderByWithRelationInput[] {
    const orderBy: Prisma.LessonAISpecsOrderByWithRelationInput[] = [];
    const direction = sortParams.sortDirection;

    for (const sortField of sortParams.sortFields) {
      switch (sortField) {
        case 'CREATION_DATE':
          orderBy.push({ created_at: direction });
          break;
        case 'ESTIMATED_VIDEO_DURATION':
          orderBy.push({ estimated_video_duration_mins: direction });
          break;
        default:
          break;
      }
    }

    return orderBy;
  }

  private buildSelect(lightDTO: boolean): Prisma.LessonAISpecsSelect {
    const select: Prisma.LessonAISpecsSelect = {
      id_lesson_spec: true,
      created_at: true,
      lesson_content_id: true,
      generation_prompt_summary: true,
      content_structure: true,
      estimated_video_duration_mins: true,
      video_script: true,
      video_generation_instructions: true,
      interactive_elements: true,
      exercise_parameters: true,
    };
    if (lightDTO) {
      delete select.video_script;
      delete select.video_generation_instructions;
      delete select.interactive_elements;
      delete select.exercise_parameters;
    }
    return select;
  }

  private buildDTO(
    lightDTO: boolean,
    record: Prisma.LessonAISpecsGetPayload<{ select: Prisma.LessonAISpecsSelect }>
  ): AISpecsLessonOutLightDTO {
    const baseDTO: AISpecsLessonOutLightDTO = {
      idLessonSpec: record.id_lesson_spec,
      createdAt: record.created_at,
      lessonContentId: record.lesson_content_id,
      generationPromptSummary: record.generation_prompt_summary,
      contentStructure: record.content_structure as Json,
      estimatedVideoDurationMinutes: record.estimated_video_duration_mins,
    };

    if (lightDTO) {
      return baseDTO;
    }

    const heavyDTO: AISpecsLessonOutHeavyDTO = {
      ...baseDTO,
      videoScript: record.video_script ?? null,
      videoGenerationInstructions: (record.video_generation_instructions ?? null) as Json,
      interactiveElements: (record.interactive_elements ?? null) as Json,
      exerciseParameters: (record.exercise_parameters ?? null) as Json,
    };

    return heavyDTO;
  }

  private buildPaginatedResponse(
    data: AISpecsLessonOutLightDTO[],
    total: number,
    page: number,
    size: number
  ): PaginatedLessonAISpecs {
    const totalPages = Math.ceil(total / size);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      success: true,
      message: 'AI Specs retrieved successfully',
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

  async getAISpecs(
    filters: FiltersAISpecsLesson,
    sort: SortingAILessonSpecs,
    lightDTO: boolean
  ): Promise<PaginatedLessonAISpecs> {
    const size = sort.size;
    const page = sort.page;

    const where = this.buildWhere(filters);
    const orderBy = this.buildSort(sort);
    const select = this.buildSelect(lightDTO);

    const [records, total] = await Promise.all([
      this.prismaClient.lessonAISpecs.findMany({
        skip: (page - 1) * size,
        take: size,
        where,
        orderBy,
        select,
      }),
      this.prismaClient.lessonAISpecs.count({ where }),
    ]);

    const data: AISpecsLessonOutLightDTO[] = records.map((record) =>
      this.buildDTO(lightDTO, record)
    );

    const paginatedResponse = this.buildPaginatedResponse(data, total, page, size);

    return paginatedResponse;
  }
  async getAISpecById(aiSpecId: string, lightDTO: boolean): Promise<AISpecsLessonOutLightDTO> {
    const select = this.buildSelect(lightDTO);

    const record = await this.prismaClient.lessonAISpecs.findUniqueOrThrow({
      where: { id_lesson_spec: aiSpecId },
      select,
    });
    return this.buildDTO(lightDTO, record);
  }

  async createAISpec(
    dto: AISpecsLessonInDTO,
    lightDTO: boolean
  ): Promise<AISpecsLessonOutLightDTO> {
    const select = this.buildSelect(lightDTO);

    const created = await this.prismaClient.lessonAISpecs.create({
      data: {
        lesson_content_id: dto.lessonContentId,
        generation_prompt_summary: dto.generationPromptSummary,
        content_structure: dto.contentStructure as Prisma.InputJsonValue,
        estimated_video_duration_mins: dto.estimatedVideoDurationMinutes,
        video_script: dto.videoScript,
        video_generation_instructions: dto.videoGenerationInstructions as Prisma.InputJsonValue,
        interactive_elements: dto.interactiveElements as Prisma.InputJsonValue,
        exercise_parameters: dto.exerciseParameters as Prisma.InputJsonValue,
      },
      select,
    });

    return this.buildDTO(lightDTO, created);
  }

  async updateAISpec(
    aiSpecId: string,
    dto: AISpecsLessonInDTO,
    lightDTO: boolean
  ): Promise<AISpecsLessonOutLightDTO> {
    const select = this.buildSelect(lightDTO);

    const updated = await this.prismaClient.lessonAISpecs.update({
      where: { id_lesson_spec: aiSpecId },
      data: {
        lesson_content_id: dto.lessonContentId,
        generation_prompt_summary: dto.generationPromptSummary,
        content_structure: dto.contentStructure as Prisma.InputJsonValue,
        estimated_video_duration_mins: dto.estimatedVideoDurationMinutes,
        video_script: dto.videoScript,
        video_generation_instructions: dto.videoGenerationInstructions as Prisma.InputJsonValue,
        interactive_elements: dto.interactiveElements as Prisma.InputJsonValue,
        exercise_parameters: dto.exerciseParameters as Prisma.InputJsonValue,
      },
      select,
    });

    return this.buildDTO(lightDTO, updated);
  }

  async deleteAISpecById(aiSpecId: string): Promise<void> {
    const deleted = await this.prismaClient.lessonAISpecs.delete({
      where: { id_lesson_spec: aiSpecId },
    });
    if (!deleted) throw new Error('Not found');
  }
}
