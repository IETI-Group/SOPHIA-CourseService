# SOPHIA Course Service - MCP Server

This document describes the Model Context Protocol (MCP) server integration for the SOPHIA Course Service.

## Overview

The MCP server exposes course creation and management capabilities through standardized tools that AI assistants can use to interact with the SOPHIA platform. It allows AI agents to:

- Create and manage courses
- Create and manage sections (modules)
- Create and manage lessons and lesson content
- Query existing courses, sections, and lessons

## Architecture

The MCP server is integrated directly into the Express application and uses the existing service layer through dependency injection (Awilix). This ensures:

- **Consistent business logic**: All MCP operations use the same services as the REST API
- **Proper validation**: Existing Zod schemas validate all inputs
- **Transaction support**: Database operations maintain ACID properties
- **Error handling**: Centralized error handling and logging

### Components

```
src/mcp/
├── mcpServer.ts          # Main MCP server class
├── index.ts              # Public exports
└── tools/
    ├── index.ts          # Tool registration orchestrator
    ├── courseTools.ts    # Course creation and query tools
    ├── sectionTools.ts   # Section/module management tools
    └── lessonTools.ts    # Lesson and content tools
```

## Available Tools

### Course Tools

#### `create_course`
Creates a new course in the SOPHIA platform.

**Input:**
- `instructorId` (string | null): Instructor ID or null for system courses
- `title` (string): Course title (1-500 chars)
- `description` (string): Detailed description (1-5000 chars)
- `price` (number): Course price (≥0, 0 for free)
- `level` (enum): BEGINNER | INTERMEDIATE | ADVANCED | EXPERT
- `aiGenerated` (boolean): Whether AI-generated
- `generationTaskId` (string | null): Optional AI task ID
- `generationMetadata` (any): Optional AI metadata
- `lastAIUpdateAt` (datetime | null): Optional last AI update timestamp

**Output:** API response with created course data including `idCourse`, `title`, `level`, `status`, etc.

#### `list_courses`
Lists courses with optional filtering, sorting, and pagination.

**Input:**
- **Filters:** `title`, `instructorId`, `level`, `status`, `priceMin`, `priceMax`, `active`, `aiGenerated`
- **Pagination:** `page` (default: 1), `size` (default: 10, max: 100)
- **Sorting:** `sortBy` (title | price | createdAt | updatedAt), `sortOrder` (asc | desc)

**Output:** Paginated list of courses with metadata (total, totalPages, hasNext, hasPrev)

#### `get_course_by_id`
Gets detailed information about a specific course.

**Input:**
- `courseId` (string): Course ID
- `includeFullDetails` (boolean): Include description and AI metadata

**Output:** Complete course information

### Section Tools

#### `create_section`
Creates a new section (module) within a course.

**Input:**
- `courseId` (string): Parent course ID
- `title` (string): Section title (1-500 chars)
- `description` (string): Section description (1-5000 chars)
- `order` (number): Order position within course
- `aiGenerated` (boolean): Whether AI-generated
- `generationTaskId` (string | null): Optional AI task ID
- `suggestedByAi` (boolean): Whether suggested by AI

**Output:** Created section data

#### `list_sections`
Lists sections for a course with filtering and sorting.

**Input:**
- `courseId` (string): Filter by course ID (required)
- **Filters:** `title`, `active`, `aiGenerated`
- **Pagination:** `page`, `size`
- **Sorting:** `sortBy` (title | order | createdAt), `sortOrder`

**Output:** Paginated list of sections

#### `get_section_by_id`
Gets detailed information about a specific section.

**Input:**
- `sectionId` (string): Section ID
- `includeFullDetails` (boolean): Include full details

**Output:** Complete section information

### Lesson Tools

#### `create_lesson`
Creates a new lesson within a section.

**Input:**
- `sectionId` (string): Parent section ID
- `title` (string): Lesson title (1-500 chars)
- `description` (string): Lesson description (1-5000 chars)
- `order` (number): Order position within section
- `durationMinutes` (number): Estimated duration
- `lessonType` (enum): THEORY | PRACTICE | MIXED | PROJECT | CASE_STUDY | DISCUSSION
- `estimatedDifficulty` (number): Difficulty score (0-10)
- `aiGenerated` (boolean): Whether AI-generated
- `generationTaskId` (string | null): Optional AI task ID

**Output:** Created lesson data

#### `list_lessons`
Lists lessons for a section with filtering.

**Input:**
- `sectionId` (string): Filter by section ID (required)
- **Filters:** `title`, `lessonType`, `active`, `aiGenerated`
- **Pagination:** `page`, `size`
- **Sorting:** `sortBy` (title | order | createdAt), `sortOrder`

**Output:** Paginated list of lessons

#### `create_lesson_content`
Creates content for a lesson (text, video, slides, interactive, etc.).

**Input:**
- `lessonId` (string): Parent lesson ID
- `contentType` (enum): TEXT | VIDEO_SCRIPT | SLIDES | INTERACTIVE | CODE_EXAMPLE | QUIZ | EXERCISE | READING | AUDIO_SCRIPT
- `metadata` (any): Content-specific metadata (structure depends on contentType)
- `difficultyLevel` (enum): BEGINNER | INTERMEDIATE | ADVANCED | EXPERT
- `learningTechnique` (enum): VISUAL | AUDITORY | KINESTHETIC | READING_WRITING | MULTIMODAL
- `orderPreference` (number | null): Preferred display order
- `aiGenerated` (boolean): Whether AI-generated
- `generationLogId` (string | null): Optional generation log ID
- `parentContentId` (string | null): Parent content for versioning

**Output:** Created content data

#### `list_lesson_contents`
Lists all content items for a lesson.

**Input:**
- `lessonId` (string): Filter by lesson ID (required)
- **Filters:** `contentType`, `difficultyLevel`, `active`, `aiGenerated`, `isCurrentVersion`
- **Pagination:** `page`, `size`
- **Sorting:** `sortBy` (orderPreference | createdAt | version), `sortOrder`

**Output:** Paginated list of lesson contents

## Endpoint Configuration

The MCP server is exposed at:

```
POST /mcp    # Main MCP endpoint (stateless mode)
GET  /mcp    # Returns HTTP 405 (session management not supported)
```

### Transport Mode

The server uses **stateless Streamable HTTP transport**:
- A new transport is created for each request
- No session management required
- Prevents request ID collisions
- Suitable for most use cases

### CORS Configuration

CORS is configured to support browser-based MCP clients:

```javascript
{
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  exposedHeaders: ['Mcp-Session-Id'],
  allowedHeaders: ['Content-Type', 'mcp-session-id']
}
```

## Usage Examples

### Connecting to the Server

Using MCP Inspector:
```bash
npx @modelcontextprotocol/inspector
# Then connect to: http://localhost:3000/mcp
```

Using Claude Code:
```bash
claude mcp add --transport http sophia-course http://localhost:3000/mcp
```

Using VS Code:
```bash
code --add-mcp '{"name":"sophia-course","type":"http","url":"http://localhost:3000/mcp"}'
```

### Example Workflow: Creating a Complete Course

1. **Create the course:**
```json
{
  "tool": "create_course",
  "arguments": {
    "instructorId": "instructor-123",
    "title": "Introduction to Machine Learning",
    "description": "A comprehensive introduction to ML concepts and algorithms",
    "price": 49.99,
    "level": "INTERMEDIATE",
    "aiGenerated": false
  }
}
```

2. **Create sections:**
```json
{
  "tool": "create_section",
  "arguments": {
    "courseId": "course-uuid",
    "title": "Fundamentals of ML",
    "description": "Basic concepts and terminology",
    "order": 1,
    "aiGenerated": false,
    "suggestedByAi": false
  }
}
```

3. **Create lessons:**
```json
{
  "tool": "create_lesson",
  "arguments": {
    "sectionId": "section-uuid",
    "title": "What is Machine Learning?",
    "description": "Introduction to ML concepts",
    "order": 1,
    "durationMinutes": 30,
    "lessonType": "THEORY",
    "estimatedDifficulty": 3,
    "aiGenerated": false
  }
}
```

4. **Add lesson content:**
```json
{
  "tool": "create_lesson_content",
  "arguments": {
    "lessonId": "lesson-uuid",
    "contentType": "TEXT",
    "metadata": {
      "text": "Machine Learning is a subset of AI...",
      "format": "markdown"
    },
    "difficultyLevel": "BEGINNER",
    "learningTechnique": "READING_WRITING",
    "orderPreference": 1,
    "aiGenerated": false
  }
}
```

## AI Integration Features

The MCP server supports AI-driven course creation with:

- **AI Generation Tracking:** `aiGenerated`, `generationTaskId`, `generationMetadata` fields
- **AI Suggestions:** `suggestedByAi` flag for sections
- **Content Versioning:** `parentContentId` and version tracking for iterative improvements
- **Generation Logs:** `generationLogId` for content creation audit trails

## Error Handling

All tools return structured responses:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* result data */ },
  "timestamp": "2025-11-27T..."
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "data": null,
  "timestamp": "2025-11-27T..."
}
```

MCP-level errors return:
```json
{
  "content": [{ "type": "text", "text": "Error: ..." }],
  "isError": true
}
```

## Development

### Running the Server

```bash
# Development mode
pnpm dev

# Production mode
pnpm build
pnpm start
```

The MCP server will be available at `http://localhost:3000/mcp` (default port).

### Testing

Use the MCP Inspector for interactive testing:

```bash
npx @modelcontextprotocol/inspector
```

Connect to your local server and test each tool interactively.

### Environment Variables

```env
PORT=3000
NODE_ENV=development
CORS_ORIGIN=*
DATABASE_URL=postgresql://...
```

## Security Considerations

1. **Authentication:** The current implementation does not include authentication. Add authentication middleware before the MCP endpoint for production use.

2. **Rate Limiting:** Consider implementing rate limiting to prevent abuse.

3. **CORS:** Configure `CORS_ORIGIN` appropriately for production to restrict access.

4. **Input Validation:** All inputs are validated using Zod schemas from the existing service layer.

5. **DNS Rebinding Protection:** Currently disabled for backwards compatibility. Enable for local testing:
   ```typescript
   enableDnsRebindingProtection: true,
   allowedHosts: ['127.0.0.1'],
   allowedOrigins: ['https://yourdomain.com']
   ```

## Troubleshooting

### Connection Issues

- Verify the server is running: `curl http://localhost:3000/`
- Check CORS settings if connecting from a browser
- Ensure firewall allows connections on the specified port

### Tool Execution Errors

- Check the service logs for detailed error messages
- Verify the database connection is working
- Ensure all required fields are provided
- Check that referenced IDs (courseId, sectionId, etc.) exist

### TypeScript Compilation

The MCP integration may show TypeScript warnings about `structuredContent` types. These are non-blocking and don't affect runtime behavior.

## Future Enhancements

Potential improvements for the MCP server:

1. **Additional Tools:**
   - Quiz creation and management
   - Assignment creation
   - Resource attachment
   - Course structure queries (hierarchical)

2. **Resource Exposure:**
   - Expose courses as MCP resources: `course://[courseId]`
   - Expose sections: `section://[sectionId]`
   - Allow LLMs to read course data directly

3. **Session Management:**
   - Implement stateful sessions for long-running operations
   - Session-based caching for improved performance

4. **Advanced Features:**
   - Bulk operations (create multiple sections at once)
   - Course cloning/templating
   - Content recommendations
   - Progress tracking for course generation tasks

## References

- [Model Context Protocol Specification](https://modelcontextprotocol.io/specification)
- [MCP TypeScript SDK Documentation](https://github.com/modelcontextprotocol/typescript-sdk)
- [MCP Inspector Tool](https://github.com/modelcontextprotocol/inspector)
- [SOPHIA Course Service API Documentation](./API_DOCUMENTATION.md)

## Support

For issues or questions about the MCP server integration:

1. Check the application logs at `logs/` directory
2. Review the [API Documentation](./API_DOCUMENTATION.md) for service details
3. Consult the [MCP Specification](https://modelcontextprotocol.io/) for protocol questions
4. Open an issue on the project's repository
