# MCP Server Quick Start Guide

## Starting the Server

1. **Install dependencies** (if not already done):
```bash
pnpm install
```

2. **Set up your database**:
```bash
# Generate Prisma client
pnpm prisma:generate

# Run migrations
pnpm prisma:migrate
```

3. **Configure environment variables**:
Create a `.env` file with:
```env
PORT=3000
NODE_ENV=development
CORS_ORIGIN=*
DATABASE_URL=postgresql://user:password@localhost:5432/sophia_courses
```

4. **Start the development server**:
```bash
pnpm dev
```

The MCP server will be available at `http://localhost:3000/mcp`

## Testing with MCP Inspector

1. **Install MCP Inspector**:
```bash
npx @modelcontextprotocol/inspector
```

2. **Connect to your server**:
   - Open the Inspector web interface (usually at `http://localhost:5173`)
   - Select "Streamable HTTP" as the transport
   - Enter the URL: `http://localhost:3000/mcp`
   - Click "Connect"

3. **Test available tools**:
   - Click on "Tools" in the sidebar
   - You should see 10 tools:
     - `create_course`
     - `list_courses`
     - `get_course_by_id`
     - `create_section`
     - `list_sections`
     - `get_section_by_id`
     - `create_lesson`
     - `list_lessons`
     - `create_lesson_content`
     - `list_lesson_contents`

## Example: Create a Complete Course

### Step 1: Create a Course

Select the `create_course` tool and provide:

```json
{
  "instructorId": null,
  "title": "Introduction to Python Programming",
  "description": "Learn Python from scratch with hands-on examples and projects",
  "price": 0,
  "level": "BEGINNER",
  "aiGenerated": false
}
```

**Expected response:**
```json
{
  "success": true,
  "message": "Course created successfully",
  "data": {
    "idCourse": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Introduction to Python Programming",
    "instructorId": null,
    "price": 0,
    "level": "BEGINNER",
    "status": "DRAFT",
    "createdAt": "2025-11-27T..."
  }
}
```

Save the `idCourse` for the next steps.

### Step 2: Create a Section

Use the `create_section` tool:

```json
{
  "courseId": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Python Basics",
  "description": "Introduction to Python syntax and basic concepts",
  "order": 1,
  "aiGenerated": false,
  "suggestedByAi": false
}
```

Save the section ID from the response.

### Step 3: Create a Lesson

Use the `create_lesson` tool:

```json
{
  "sectionId": "section-uuid-here",
  "title": "Variables and Data Types",
  "description": "Learn about Python variables, strings, numbers, and booleans",
  "order": 1,
  "durationMinutes": 45,
  "lessonType": "THEORY",
  "estimatedDifficulty": 2,
  "aiGenerated": false
}
```

Save the lesson ID from the response.

### Step 4: Add Lesson Content

Use the `create_lesson_content` tool:

```json
{
  "lessonId": "lesson-uuid-here",
  "contentType": "TEXT",
  "metadata": {
    "text": "# Variables in Python\n\nVariables are containers for storing data values...",
    "format": "markdown"
  },
  "difficultyLevel": "BEGINNER",
  "learningTechnique": "READING_WRITING",
  "orderPreference": 1,
  "aiGenerated": false
}
```

### Step 5: Query Your Course

Use the `list_courses` tool to verify:

```json
{
  "title": "Python",
  "page": 1,
  "size": 10,
  "sortBy": "createdAt",
  "sortOrder": "desc"
}
```

## Connecting with Claude Code

If you have Claude Code installed:

```bash
claude mcp add --transport http sophia-course http://localhost:3000/mcp
```

Then in Claude Desktop or Code, you can use natural language:

> "Create a course about JavaScript for beginners"

Claude will use the MCP tools to create the course for you.

## Connecting with VS Code Copilot

Add the MCP server to VS Code:

```bash
code --add-mcp '{"name":"sophia-course","type":"http","url":"http://localhost:3000/mcp"}'
```

Or manually add to your VS Code settings (`.vscode/settings.json`):

```json
{
  "github.copilot.advanced": {
    "mcp": {
      "servers": {
        "sophia-course": {
          "type": "http",
          "url": "http://localhost:3000/mcp"
        }
      }
    }
  }
}
```

## Connecting with Cursor

Click this deep link to add the server to Cursor:

[Add to Cursor](cursor://anysphere.cursor-deeplink/mcp/install?name=sophia-course&config=eyJ1cmwiOiJodHRwOi8vbG9jYWxob3N0OjMwMDAvbWNwIn0%3D)

Or manually configure in Cursor settings.

## Troubleshooting

### Server doesn't start

- Check if port 3000 is already in use: `lsof -i :3000`
- Verify environment variables are set correctly
- Check database connection

### MCP connection fails

- Ensure the server is running: `curl http://localhost:3000/`
- Check CORS settings if connecting from a browser
- Verify the URL is correct (including `/mcp` path)

### Tool execution errors

- Check the server logs for detailed error messages
- Ensure the database has the required tables (run migrations)
- Verify you're providing all required fields

### TypeScript errors during development

The project has some pre-existing Prisma-related TypeScript warnings. These don't affect the MCP server functionality and can be safely ignored for now.

## API Documentation

For complete API details, see:
- [MCP Documentation](./MCP_DOCUMENTATION.md) - Full MCP server documentation
- [API Documentation](./API_DOCUMENTATION.md) - REST API documentation
- [DTO Documentation](./DTO_DOCUMENTATION.md) - Data transfer objects reference

## Support

If you encounter issues:
1. Check the application logs in the console
2. Review the MCP Inspector network tab for errors
3. Consult the [MCP Specification](https://modelcontextprotocol.io/)
4. Open an issue on the project repository
