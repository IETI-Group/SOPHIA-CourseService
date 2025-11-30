import { z } from 'zod/v4';
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
      inputSchema: {
        courseId: z.string().min(1).max(200).describe('ID of the parent course'),
        title: z.string().min(1).max(500).describe('Section title'),
        description: z.string().min(1).max(5000).describe('Section description'),
        order: z.number().min(0).describe('Order position within the course'),
        aiGenerated: z.boolean().default(false).describe('Whether AI-generated'),
        generationTaskId: z.string().min(1).max(200).nullable().optional().describe('AI task ID'),
        suggestedByAi: z.boolean().default(false).describe('Whether suggested by AI'),
      },
      outputSchema: {
        success: z.boolean(),
        message: z.string(),
        data: z.any().optional(),
        timestamp: z.string().optional(),
        pagination: z.any().optional(),
      },
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
          structuredContent: result as any,
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
      inputSchema: {
        courseId: z.string().describe('Filter by course ID'),
        title: z.string().optional().describe('Filter by title'),
        active: z.boolean().optional().describe('Filter by active status'),
        aiGenerated: z.boolean().optional().describe('Filter AI-generated sections'),
        page: z.number().min(1).default(1).describe('Page number'),
        size: z.number().min(1).max(100).default(10).describe('Page size'),
        sortBy: z.enum(['title', 'order', 'createdAt']).default('order'),
        sortOrder: z.enum(['asc', 'desc']).default('asc'),
      },
      outputSchema: { success: z.boolean(), message: z.string(), data: z.array(z.any()) },
    },
    async (args) => {
      try {
        const filters: any = {
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

        const sort: Record<string, 'asc' | 'desc'> = { [args.sortBy]: args.sortOrder };
        const result = (await sectionService.getCourseSections(
          filters,
          sort,
          true
        )) as PaginatedResponse<any>;

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          structuredContent: result as any,
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
      outputSchema: { success: z.boolean(), message: z.string(), data: z.any().optional() },
    },
    async (args) => {
      try {
        const result = await sectionService.getSectionById(
          args.sectionId,
          !args.includeFullDetails
        );

        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
          structuredContent: result as any,
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
