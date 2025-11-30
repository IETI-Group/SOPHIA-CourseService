import { z } from 'zod';
import {
  apiResponseSchema,
  SORT_SECTION,
  type SortingSections,
  sectionCoureFilterMCPFiltersSchema,
  sectionCourseMCPSchema,
} from '../../utils/index.js';
import type { PaginatedResponse } from '../../utils/response/index.js';
import type { SophiaMcpServer } from '../mcpServer.js';

/**
 * Register section-related MCP tools
 */
export function registerSectionTools(sophiaServer: SophiaMcpServer) {
  const mcpServer = sophiaServer.getServer();
  const { sectionService } = sophiaServer.getServices();

  // Create Section Tool
  mcpServer.registerTool(
    'create_section',
    {
      title: 'Create Section (Module)',
      description: 'Create a new section (module) within a course',
      inputSchema: sectionCourseMCPSchema(),
      outputSchema: apiResponseSchema,
    },
    async (args) => {
      try {
        const result = await sectionService.postCourseSection(
          {
            courseId: args.courseId,
            title: args.title,
            description: args.description,
            order: args.order,
            aiGenerated: args.aiGenerated,
            generationTaskId: args.generationTaskId || null,
            suggestedByAi: args.suggestedByAi,
          },
          true
        );

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          structuredContent: { ...result },
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
          content: [{ type: 'text', text: `Error: ${errorMessage}` }],
          isError: true,
        };
      }
    }
  );

  // List Sections Tool
  mcpServer.registerTool(
    'list_sections',
    {
      title: 'List Sections',
      description: 'List sections for a course with optional filtering',
      inputSchema: sectionCoureFilterMCPFiltersSchema(),
      outputSchema: apiResponseSchema,
    },
    async (args) => {
      try {
        const filters = {
          courseId: args.courseId,
          title: args.title || null,
          active: args.active ?? null,
          aiGenerated: args.aiGenerated ?? null,
          suggestedByAI: null,
          generationTaskId: null,
          durationHoursMin: null,
          durationHoursMax: null,
          orderMin: null,
          orderMax: null,
          createdAtStart: null,
          createdAtEnd: null,
        };

        const sortOrder: 'asc' | 'desc' = args.sortOrder;
        const sort: SortingSections = {
          sortFields: [(args.sortBy as SORT_SECTION) || SORT_SECTION.TITLE],
          sortDirection: sortOrder,
          page: args.page,
          size: args.size,
        };
        const result: PaginatedResponse<unknown> = (await sectionService.getCourseSections(
          filters,
          sort,
          true
        )) as PaginatedResponse<unknown>;

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          structuredContent: { ...result },
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
          content: [{ type: 'text', text: `Error: ${errorMessage}` }],
          isError: true,
        };
      }
    }
  );

  // Get Section By ID Tool
  mcpServer.registerTool(
    'get_section_by_id',
    {
      title: 'Get Section By ID',
      description: 'Get detailed information about a specific section',
      inputSchema: {
        sectionId: z.string().min(1).describe('Section ID'),
        includeFullDetails: z.boolean().default(false).describe('Include full details'),
      },
      outputSchema: apiResponseSchema,
    },
    async (args) => {
      try {
        const result = await sectionService.getSectionById(
          args.sectionId,
          !args.includeFullDetails
        );

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          structuredContent: { ...result },
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return {
          content: [{ type: 'text', text: `Error: ${errorMessage}` }],
          isError: true,
        };
      }
    }
  );
}
