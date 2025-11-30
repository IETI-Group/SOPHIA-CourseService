import { z } from 'zod/v4';
import type { COURSE_LEVEL, COURSE_STATUS } from '../../schemas/types_db.js';
import type { PaginatedResponse } from '../../utils/response/index.js';
import type { SophiaMcpServer } from '../mcpServer.js';

/**
 * Register course-related MCP tools
 */
export function registerCourseTools(sophiaServer: SophiaMcpServer) {
  const mcpServer = sophiaServer.getServer();
  const { courseService } = sophiaServer.getServices();

  // Create Course Tool
  mcpServer.registerTool(
    'create_course',
    {
      title: 'Create Course',
      description: 'Create a new course in the SOPHIA platform',
      inputSchema: {
        instructorId: z
          .string()
          .min(1)
          .max(200)
          .nullable()
          .describe('ID of the instructor, or null'),
        title: z.string().min(1).max(500).describe('Course title'),
        description: z.string().min(1).max(5000).describe('Detailed course description'),
        price: z.number().min(0).describe('Course price'),
        level: z
          .enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'])
          .describe('Difficulty level'),
        aiGenerated: z.boolean().default(false).describe('Whether AI-generated'),
        generationTaskId: z.string().min(1).max(200).nullable().optional().describe('AI task ID'),
        generationMetadata: z.any().optional().describe('AI metadata'),
        lastAIUpdateAt: z
          .string()
          .datetime()
          .nullable()
          .optional()
          .describe('Last AI update datetime'),
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
        const lastAIUpdateAt = args.lastAIUpdateAt ? new Date(args.lastAIUpdateAt) : null;

        const result = await courseService.postCourse(
          {
            instructorId: args.instructorId,
            title: args.title,
            description: args.description,
            price: args.price,
            level: args.level as COURSE_LEVEL,
            aiGenerated: args.aiGenerated,
            generationTaskId: args.generationTaskId || null,
            generationMetadata: args.generationMetadata || null,
            lastAIUpdateAt,
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

  // List Courses Tool
  mcpServer.registerTool(
    'list_courses',
    {
      title: 'List Courses',
      description: 'List courses with optional filtering and sorting',
      inputSchema: {
        title: z.string().optional().describe('Filter by title'),
        instructorId: z.string().optional().describe('Filter by instructor ID'),
        level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']).optional(),
        status: z.enum(['DRAFT', 'UNDER_REVIEW', 'PUBLISHED', 'ARCHIVED']).optional(),
        priceMin: z.number().optional(),
        priceMax: z.number().optional(),
        active: z.boolean().optional(),
        aiGenerated: z.boolean().optional(),
        page: z.number().min(1).default(1),
        size: z.number().min(1).max(100).default(10),
        sortBy: z.enum(['title', 'price', 'createdAt', 'updatedAt']).default('createdAt'),
        sortOrder: z.enum(['asc', 'desc']).default('desc'),
      },
      outputSchema: { success: z.boolean(), message: z.string(), data: z.array(z.any()) },
    },
    async (args) => {
      try {
        const filters: any = {
          title: args.title || null,
          instructorId: args.instructorId || null,
          level: (args.level as COURSE_LEVEL) || null,
          status: (args.status as COURSE_STATUS) || null,
          priceMin: args.priceMin ?? null,
          priceMax: args.priceMax ?? null,
          active: args.active ?? null,
          aiGenerated: args.aiGenerated ?? null,
          generationTaskId: null,
          createdAtStart: null,
          createdAtEnd: null,
          updatedAtStart: null,
          updatedAtEnd: null,
          publishedAtStart: null,
          publishedAtEnd: null,
          lastAIUpdateAtStart: null,
          lastAIUpdateAtEnd: null,
          averageReviewsMin: null,
          averageReviewsMax: null,
          durationHoursMin: null,
          durationHoursMax: null,
          totalLessonsMin: null,
          totalLessonsMax: null,
          totalReviewsMin: null,
          totalReviewsMax: null,
          totalEnrollmentsMin: null,
          totalEnrollmentsMax: null,
        };

        const sort: Record<string, 'asc' | 'desc'> = { [args.sortBy]: args.sortOrder };
        const result = (await courseService.getCourses(
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

  // Get Course By ID Tool
  mcpServer.registerTool(
    'get_course_by_id',
    {
      title: 'Get Course By ID',
      description: 'Get detailed information about a specific course',
      inputSchema: {
        courseId: z.string().min(1).describe('Course ID'),
        includeFullDetails: z.boolean().default(false).describe('Include full details'),
      },
      outputSchema: { success: z.boolean(), message: z.string(), data: z.any().optional() },
    },
    async (args) => {
      try {
        const result = await courseService.getCourseById(args.courseId, !args.includeFullDetails);

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
