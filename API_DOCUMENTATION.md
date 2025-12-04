# SOPHIA Course Service - API Documentation

## Tabla de Contenidos
- [Información General](#información-general)
- [Base URL](#base-url)
- [Códigos de Respuesta](#códigos-de-respuesta)
- [Formato de Respuesta](#formato-de-respuesta)
- [Endpoints](#endpoints)
  - [Health Check](#health-check)
  - [Courses](#courses)
  - [Sections](#sections)
  - [Lessons](#lessons)
  - [Quizzes](#quizzes)
  - [Assignments](#assignments)
  - [Resources](#resources)
  - [Tags](#tags)
  - [Categories](#categories)
  - [AI Specs](#ai-specs)
  - [Forums](#forums)
  - [Forum Messages](#forum-messages)

---

## Información General

API RESTful para la gestión de cursos, lecciones, cuestionarios y recursos educativos del sistema SOPHIA.

**Versión:** 1.0.0  
**Tecnologías:** Node.js, Express, TypeScript, PostgreSQL, Prisma

---

## Base URL

```
/api/v1
```

---

## Códigos de Respuesta

| Código | Descripción |
|--------|-------------|
| 200 | Operación exitosa |
| 201 | Recurso creado exitosamente |
| 400 | Solicitud inválida (error de validación) |
| 404 | Recurso no encontrado |
| 500 | Error interno del servidor |

---

## Formato de Respuesta

Todas las respuestas siguen este formato estándar:

```typescript
{
  success: boolean;
  message: string;
  data?: T;
  timestamp: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
```

---

# Endpoints

## Health Check

### GET /health
Verifica el estado del servicio.

**Respuesta (200):**
```json
{
  "status": "UP",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

## Courses

### GET /api/v1/courses
Obtiene todos los cursos con paginación y filtros.

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción | Valores |
|-----------|------|-----------|-------------|---------|
| page | number | No | Número de página | Default: 1 |
| size | number | No | Cantidad por página | Default: 10, Max: 100 |
| sort | string | No | Campo para ordenar | title, price, level, createdAt, etc. |
| order | string | No | Orden de clasificación | asc, desc |
| lightDTO | boolean | No | Usar DTO ligero | true, false (default) |
| title | string | No | Filtrar por título | |
| level | string | No | Filtrar por nivel | BEGINNER, INTERMEDIATE, ADVANCED, EXPERT |
| active | boolean | No | Filtrar por estado activo | |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Courses retrieved successfully",
  "data": [
    {
      "idCourse": "uuid",
      "title": "Introduction to AI",
      "description": "Learn the basics of AI...",
      "price": 49.99,
      "level": "BEGINNER",
      "active": true,
      "averageReviews": 4.5,
      "totalLessons": 10,
      "status": "PUBLISHED",
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

### GET /api/v1/courses/:id
Obtiene un curso por su ID.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID del curso (UUID) |

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| lightDTO | boolean | No | Usar DTO ligero (default: true) |

**Respuesta (200) - lightDTO=true:**
```json
{
  "success": true,
  "message": "Course retrieved successfully",
  "data": {
    "idCourse": "uuid",
    "instructorId": "uuid-instructor",
    "title": "Introduction to AI",
    "description": "Full description...",
    "price": 49.99,
    "level": "BEGINNER",
    "active": true,
    "status": "PUBLISHED",
    "averageReviews": 4.5,
    "durationHours": 10,
    "totalLessons": 20,
    "totalReviews": 100,
    "totalEnrollments": 500,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-02T00:00:00.000Z",
    "publishedAt": "2025-01-03T00:00:00.000Z"
  },
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

**Respuesta (200) - lightDTO=false:**
```json
{
  "success": true,
  "message": "Course retrieved successfully",
  "data": {
    "idCourse": "uuid",
    "instructorId": "uuid-instructor",
    "title": "Introduction to AI",
    "description": "Full description...",
    "price": 49.99,
    "level": "BEGINNER",
    "active": true,
    "status": "PUBLISHED",
    "averageReviews": 4.5,
    "durationHours": 10,
    "totalLessons": 20,
    "totalReviews": 100,
    "totalEnrollments": 500,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-02T00:00:00.000Z",
    "publishedAt": "2025-01-03T00:00:00.000Z",
    "aiGenerated": false,
    "generationTaskId": null,
    "generationMetadata": {},
    "lastAIUpdateAt": null
  },
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### POST /api/v1/courses
Crea un nuevo curso.

**Request Body:**
```json
{
  "instructorId": "uuid-instructor",
  "title": "Advanced TypeScript",
  "description": "Deep dive into TS features",
  "price": 99.99,
  "level": "ADVANCED",
  "aiGenerated": false,
  "generationMetadata": {},
  "generationTaskId": null,
  "lastAIUpdateAt": null
}
```

**Validaciones:**
- `title`: String requerido, max 100 chars
- `description`: String requerido
- `price`: Number requerido
- `level`: Enum requerido (BEGINNER, INTERMEDIATE, ADVANCED, EXPERT)
- `generationTaskId`: String o null requerido
- `lastAIUpdateAt`: Date o null requerido

**Respuesta (201):**
```json
{
  "success": true,
  "message": "Course created successfully",
  "data": "uuid-del-nuevo-curso",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### PUT /api/v1/courses/:id
Actualiza un curso existente.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID del curso |

**Request Body:** (Todos los campos opcionales)
```json
{
  "title": "Updated Title",
  "price": 79.99,
  "active": true
}
```

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Course updated successfully",
  "data": null,
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### DELETE /api/v1/courses/:id
Elimina un curso.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID del curso |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Course deleted successfully",
  "data": null,
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

## Sections

### GET /api/v1/courses/:courseId/sections
Obtiene todas las secciones de un curso.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| courseId | string | ID del curso |

**Query Parameters:** lightDTO, filters, sorting

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Sections retrieved successfully",
  "data": [
    {
      "idSection": "uuid",
      "title": "Module 1: Basics",
      "order": 1,
      "durationHours": 2,
      "active": true
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### POST /api/v1/courses/:courseId/sections
Crea una nueva sección en un curso.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| courseId | string | ID del curso |

**Request Body:**
```json
{
  "courseId": "uuid-del-curso",
  "title": "Module 1",
  "description": "Introduction",
  "order": 1,
  "aiGenerated": false,
  "generationTaskId": null,
  "suggestedByAi": false
}
```

**Respuesta (201):**
```json
{
  "success": true,
  "message": "Section created successfully",
  "data": "uuid-de-la-seccion",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

## Lessons

### GET /api/v1/sections/:sectionId/lessons
Obtiene todas las lecciones de una sección.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| sectionId | string | ID de la sección |

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| lightDTO | boolean | No | Usar DTO ligero (default: true) |
| filters | object | No | Filtros adicionales |
| sorting | object | No | Parámetros de ordenamiento |

**Respuesta (200) - lightDTO=true:**
```json
{
  "success": true,
  "message": "Lessons retrieved successfully",
  "data": [
    {
      "idLesson": "uuid",
      "title": "Lesson 1",
      "description": "Intro to topic",
      "lessonType": "THEORY",
      "durationMinutes": 15,
      "order": 1,
      "active": true,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "sectionId": "uuid-section"
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

**Respuesta (200) - lightDTO=false:**
```json
{
  "success": true,
  "message": "Lessons retrieved successfully",
  "data": [
    {
      "idLesson": "uuid",
      "title": "Lesson 1",
      "description": "Intro to topic",
      "lessonType": "THEORY",
      "durationMinutes": 15,
      "order": 1,
      "active": true,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "sectionId": "uuid-section",
      "aiGenerated": false,
      "generationTaskId": null,
      "estimatedDifficulty": 1.0
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### POST /api/v1/sections/:sectionId/lessons
Crea una nueva lección.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| sectionId | string | ID de la sección |

**Request Body:**
```json
{
  "sectionId": "uuid-de-la-seccion",
  "title": "Lesson 1",
  "description": "Intro to topic",
  "order": 1,
  "durationMinutes": 15,
  "lessonType": "THEORY",
  "estimatedDifficulty": 1.0,
  "aiGenerated": false,
  "generationTaskId": null
}
```

**Respuesta (201):**
```json
{
  "success": true,
  "message": "Lesson created successfully",
  "data": "uuid-de-la-leccion",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### GET /api/v1/lessons/:id
Obtiene una lección por ID.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID de la lección |

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| lightDTO | boolean | No | Usar DTO ligero (default: true) |

**Respuesta (200) - lightDTO=true:**
```json
{
  "success": true,
  "message": "Lesson retrieved successfully",
  "data": {
    "idLesson": "uuid",
    "title": "Lesson 1",
    "description": "Intro to topic",
    "lessonType": "THEORY",
    "durationMinutes": 15,
    "order": 1,
    "active": true,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "sectionId": "uuid-section"
  },
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

**Respuesta (200) - lightDTO=false:**
```json
{
  "success": true,
  "message": "Lesson retrieved successfully",
  "data": {
    "idLesson": "uuid",
    "title": "Lesson 1",
    "description": "Intro to topic",
    "lessonType": "THEORY",
    "durationMinutes": 15,
    "order": 1,
    "active": true,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "sectionId": "uuid-section",
    "aiGenerated": false,
    "generationTaskId": null,
    "estimatedDifficulty": 1.0
  },
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### PUT /api/v1/lessons/:id
Actualiza una lección.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID de la lección |

**Request Body:** (Todos los campos opcionales)
```json
{
  "title": "Updated Lesson Title",
  "durationMinutes": 20
}
```

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Lesson updated successfully",
  "data": null,
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### DELETE /api/v1/lessons/:id
Elimina una lección.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID de la lección |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Lesson deleted successfully",
  "data": null,
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

## Lesson Contents

### GET /api/v1/lessons/:lessonId/contents
Obtiene el contenido de una lección.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| lessonId | string | ID de la lección |

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| lightDTO | boolean | No | Usar DTO ligero (default: true) |
| filters | object | No | Filtros adicionales |
| sorting | object | No | Parámetros de ordenamiento |

**Respuesta (200) - lightDTO=true:**
```json
{
  "success": true,
  "message": "Lesson contents retrieved successfully",
  "data": [
    {
      "idLessonContent": "uuid",
      "version": 1,
      "lessonId": "uuid-lesson",
      "active": true,
      "isCurrentVersion": true,
      "difficultyLevel": "BEGINNER",
      "learningTechnique": "VISUAL",
      "orderPreference": 1,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "metadata": {}
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

**Respuesta (200) - lightDTO=false:**
```json
{
  "success": true,
  "message": "Lesson contents retrieved successfully",
  "data": [
    {
      "idLessonContent": "uuid",
      "version": 1,
      "lessonId": "uuid-lesson",
      "active": true,
      "isCurrentVersion": true,
      "difficultyLevel": "BEGINNER",
      "learningTechnique": "VISUAL",
      "orderPreference": 1,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "metadata": {},
      "aiGenerated": false,
      "generationLogId": null,
      "contentType": "TEXT",
      "parentContentId": null
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### GET /api/v1/contents/:id
Obtiene un contenido específico por ID.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID del contenido |

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| lightDTO | boolean | No | Usar DTO ligero (default: true) |

**Respuesta (200) - lightDTO=true:**
```json
{
  "success": true,
  "message": "Content retrieved successfully",
  "data": {
    "idLessonContent": "uuid",
    "version": 1,
    "lessonId": "uuid-lesson",
    "active": true,
    "isCurrentVersion": true,
    "difficultyLevel": "BEGINNER",
    "learningTechnique": "VISUAL",
    "orderPreference": 1,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "metadata": {}
  },
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

**Respuesta (200) - lightDTO=false:**
```json
{
  "success": true,
  "message": "Content retrieved successfully",
  "data": {
    "idLessonContent": "uuid",
    "version": 1,
    "lessonId": "uuid-lesson",
    "active": true,
    "isCurrentVersion": true,
    "difficultyLevel": "BEGINNER",
    "learningTechnique": "VISUAL",
    "orderPreference": 1,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "metadata": {},
    "aiGenerated": false,
    "generationLogId": null,
    "contentType": "TEXT",
    "parentContentId": null
  },
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### POST /api/v1/lessons/:lessonId/contents
Crea nuevo contenido para una lección.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| lessonId | string | ID de la lección |

**Request Body:**
```json
{
  "lessonId": "uuid-lesson",
  "metadata": {},
  "difficultyLevel": "BEGINNER",
  "learningTechnique": "VISUAL",
  "orderPreference": 1,
  "aiGenerated": false,
  "generationLogId": null,
  "contentType": "TEXT",
  "parentContentId": null
}
```

**Respuesta (201):**
```json
{
  "success": true,
  "message": "Content created successfully",
  "data": "uuid-del-contenido",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### PUT /api/v1/contents/:id
Actualiza un contenido.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID del contenido |

**Request Body:** (Todos los campos opcionales)
```json
{
  "metadata": { "text": "Updated content..." },
  "active": true
}
```

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Content updated successfully",
  "data": null,
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### DELETE /api/v1/contents/:id
Elimina un contenido.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID del contenido |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Content deleted successfully",
  "data": null,
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

## Quizzes

### GET /api/v1/sections/:sectionId/quizzes
Obtiene los cuestionarios de una sección.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| sectionId | string | ID de la sección |

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| lightDTO | boolean | No | Usar DTO ligero (default: true) |
| filters | object | No | Filtros adicionales |
| sorting | object | No | Parámetros de ordenamiento |

**Respuesta (200) - lightDTO=true:**
```json
{
  "success": true,
  "message": "Quizzes retrieved successfully",
  "data": [
    {
      "idQuiz": "uuid",
      "title": "Final Exam",
      "durationMinutes": 60,
      "active": true
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

**Respuesta (200) - lightDTO=false:**
```json
{
  "success": true,
  "message": "Quizzes retrieved successfully",
  "data": [
    {
      "idQuiz": "uuid",
      "title": "Final Exam",
      "description": "Comprehensive test covering all modules",
      "durationMinutes": 60,
      "active": true,
      "aiGenerated": false,
      "generationTaskId": null,
      "difficultyDistribution": {},
      "adaptativeLogic": {},
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### GET /api/v1/quizzes/:id
Obtiene un cuestionario por ID.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID del cuestionario |

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| lightDTO | boolean | No | Usar DTO ligero (default: true) |

**Respuesta (200) - lightDTO=true:**
```json
{
  "success": true,
  "message": "Quiz retrieved successfully",
  "data": {
    "idQuiz": "uuid",
    "title": "Final Exam",
    "durationMinutes": 60,
    "active": true
  },
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

**Respuesta (200) - lightDTO=false:**
```json
{
  "success": true,
  "message": "Quiz retrieved successfully",
  "data": {
    "idQuiz": "uuid",
    "title": "Final Exam",
    "description": "Comprehensive test covering all modules",
    "durationMinutes": 60,
    "active": true,
    "aiGenerated": false,
    "generationTaskId": null,
    "difficultyDistribution": {},
    "adaptativeLogic": {},
    "createdAt": "2025-01-01T00:00:00.000Z"
  },
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### POST /api/v1/sections/:sectionId/quizzes
Crea un nuevo cuestionario.

**Request Body:**
```json
{
  "sectionId": "uuid-de-la-seccion",
  "title": "Quiz 1",
  "description": "Test your knowledge",
  "aiGenerated": false,
  "generationTaskId": null,
  "difficultyDistribution": {},
  "adaptativeLogic": {}
}
```

**Respuesta (201):**
```json
{
  "success": true,
  "message": "Quiz created successfully",
  "data": "uuid-del-quiz",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### PUT /api/v1/quizzes/:id
Actualiza un cuestionario.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID del cuestionario |

**Request Body:** (Todos los campos opcionales)
```json
{
  "title": "Updated Quiz Title",
  "active": false
}
```

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Quiz updated successfully",
  "data": null,
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### DELETE /api/v1/quizzes/:id
Elimina un cuestionario.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID del cuestionario |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Quiz deleted successfully",
  "data": null,
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

## Assignments

### GET /api/v1/lessons/:lessonId/assignments
Obtiene las tareas de una lección.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| lessonId | string | ID de la lección |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Assignments retrieved successfully",
  "data": [
    {
      "idAssignment": "uuid",
      "title": "Homework 1",
      "dueDate": "2025-12-31T23:59:59.000Z",
      "maxScore": 100
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### POST /api/v1/lessons/:lessonId/assignments
Crea una nueva tarea.

**Request Body:**
```json
{
  "lessonId": "uuid-de-la-leccion",
  "title": "Project Submission",
  "instructions": "Upload your code...",
  "maxFileSizeMb": 10,
  "allowedTypes": "PDF",
  "dueDate": "2025-12-31T23:59:59.000Z",
  "maxScore": 100
}
```

**Respuesta (201):**
```json
{
  "success": true,
  "message": "Assignment created successfully",
  "data": "uuid-de-la-tarea",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

## Resources

### GET /api/v1/resources
Obtiene todos los recursos.

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| lightDTO | boolean | No | Usar DTO ligero (default: true) |
| filters | object | No | Filtros adicionales |
| sorting | object | No | Parámetros de ordenamiento |

**Respuesta (200) - lightDTO=true:**
```json
{
  "success": true,
  "message": "Resources retrieved successfully",
  "data": [
    {
      "idResource": "uuid",
      "name": "Course Syllabus",
      "type": "PDF",
      "url": "https://storage...",
      "fileSizeMb": 2.5
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

**Respuesta (200) - lightDTO=false:**
```json
{
  "success": true,
  "message": "Resources retrieved successfully",
  "data": [
    {
      "idResource": "uuid",
      "name": "Course Syllabus",
      "type": "PDF",
      "url": "https://storage...",
      "fileSizeMb": 2.5,
      "content": null,
      "order": 1,
      "durationSeconds": 0,
      "mimeType": "application/pdf",
      "thumnailUrl": null,
      "metadata": {}
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### GET /api/v1/resources/:id
Obtiene un recurso por ID.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID del recurso |

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| lightDTO | boolean | No | Usar DTO ligero (default: true) |

**Respuesta (200) - lightDTO=true:**
```json
{
  "success": true,
  "message": "Resource retrieved successfully",
  "data": {
    "idResource": "uuid",
    "name": "Course Syllabus",
    "type": "PDF",
    "url": "https://storage...",
    "fileSizeMb": 2.5
  },
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

**Respuesta (200) - lightDTO=false:**
```json
{
  "success": true,
  "message": "Resource retrieved successfully",
  "data": {
    "idResource": "uuid",
    "name": "Course Syllabus",
    "type": "PDF",
    "url": "https://storage...",
    "fileSizeMb": 2.5,
    "content": null,
    "order": 1,
    "durationSeconds": 0,
    "mimeType": "application/pdf",
    "thumnailUrl": null,
    "metadata": {}
  },
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### POST /api/v1/resources
Crea un nuevo recurso.

**Request Body:**
```json
{
  "entityReference": "uuid-referencia",
  "discriminant": "COURSE",
  "name": "Intro Video",
  "type": "VIDEO",
  "url": "https://video...",
  "content": null,
  "order": 1,
  "durationSeconds": 120,
  "fileSizeMb": 50,
  "mimeType": "video/mp4",
  "thumnailUrl": null,
  "metadata": {}
}
```

**Respuesta (201):**
```json
{
  "success": true,
  "message": "Resource created successfully",
  "data": "uuid-del-recurso",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

## Tags

### GET /api/v1/tags
Obtiene todos los tags.

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Tags retrieved successfully",
  "data": [
    {
      "categoryId": "uuid",
      "courseId": "uuid",
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

## Categories

### GET /api/v1/categories
Obtiene todas las categorías.

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Categories retrieved successfully",
  "data": [
    {
      "idCategory": "uuid",
      "name": "Programming",
      "description": "Software development courses",
      "active": true
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

## AI Specs

### GET /api/v1/lessons/:lessonId/ai-specs
Obtiene especificaciones de IA para una lección.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| lessonId | string | ID de la lección |

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| lightDTO | boolean | No | Usar DTO ligero (default: true) |
| filters | object | No | Filtros adicionales |
| sorting | object | No | Parámetros de ordenamiento |

**Respuesta (200) - lightDTO=true:**
```json
{
  "success": true,
  "message": "AI Specs retrieved successfully",
  "data": [
    {
      "idLessonSpec": "uuid",
      "generationPromptSummary": "Create a lesson about...",
      "contentStructure": {},
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

**Respuesta (200) - lightDTO=false:**
```json
{
  "success": true,
  "message": "AI Specs retrieved successfully",
  "data": [
    {
      "idLessonSpec": "uuid",
      "generationPromptSummary": "Create a lesson about...",
      "contentStructure": {},
      "createdAt": "2025-01-01T00:00:00.000Z",
      "estimatedVideoDurationMins": 10,
      "videoScript": "Script content...",
      "videoGenerationInstructions": {},
      "interactiveElements": {},
      "exerciseParameters": {}
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### GET /api/v1/ai-specs/:id
Obtiene una especificación de IA por ID.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID de la especificación |

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| lightDTO | boolean | No | Usar DTO ligero (default: true) |

**Respuesta (200) - lightDTO=true:**
```json
{
  "success": true,
  "message": "AI Spec retrieved successfully",
  "data": {
    "idLessonSpec": "uuid",
    "generationPromptSummary": "Create a lesson about...",
    "contentStructure": {},
    "createdAt": "2025-01-01T00:00:00.000Z"
  },
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

**Respuesta (200) - lightDTO=false:**
```json
{
  "success": true,
  "message": "AI Spec retrieved successfully",
  "data": {
    "idLessonSpec": "uuid",
    "generationPromptSummary": "Create a lesson about...",
    "contentStructure": {},
    "createdAt": "2025-01-01T00:00:00.000Z",
    "estimatedVideoDurationMins": 10,
    "videoScript": "Script content...",
    "videoGenerationInstructions": {},
    "interactiveElements": {},
    "exerciseParameters": {}
  },
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### POST /api/v1/lessons/:lessonId/ai-specs
Crea una nueva especificación de IA.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| lessonId | string | ID de la lección |

**Request Body:**
```json
{
  "lessonContentId": "uuid-contenido",
  "generationPromptSummary": "Prompt used...",
  "contentStructure": {},
  "estimatedVideoDuration": 300
}
```

**Respuesta (201):**
```json
{
  "success": true,
  "message": "AI Spec created successfully",
  "data": "uuid-de-la-spec",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### PUT /api/v1/ai-specs/:id
Actualiza una especificación de IA.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID de la especificación |

**Request Body:** (Todos los campos opcionales)
```json
{
  "generationPromptSummary": "Updated prompt..."
}
```

**Respuesta (200):**
```json
{
  "success": true,
  "message": "AI Spec updated successfully",
  "data": null,
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### DELETE /api/v1/ai-specs/:id
Elimina una especificación de IA.

**Path Parameters:**
| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | string | ID de la especificación |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "AI Spec deleted successfully",
  "data": null,
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

## Enums y Tipos

### Course Level
```typescript
enum CourseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT'
}
```

### Course Status
```typescript
enum CourseStatus {
  DRAFT = 'DRAFT',
  UNDER_REVIEW = 'UNDER_REVIEW',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}
```

### Lesson Type
```typescript
enum LessonType {
  THEORY = 'THEORY',
  PRACTICE = 'PRACTICE',
  MIXED = 'MIXED',
  PROJECT = 'PROJECT',
  CASE_STUDY = 'CASE_STUDY',
  DISCUSSION = 'DISCUSSION'
}
```

### Resource Type
```typescript
enum ResourceType {
  PDF = 'PDF',
  PICTURE = 'PICTURE',
  CODE = 'CODE',
  LINK = 'LINK',
  TEXT = 'TEXT',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  INTERACTIVE = 'INTERACTIVE',
  DIAGRAM = 'DIAGRAM',
  SIMULATION = 'SIMULATION',
  NOTEBOOK = 'NOTEBOOK',
  DATASET = 'DATASET'
}
```

### Assignment Type
```typescript
enum AssignmentType {
  PDF = 'PDF',
  PICTURE = 'PICTURE',
  CODE = 'CODE',
  LINK = 'LINK',
  TEXT = 'TEXT'
}
```

### Discriminant Resource
```typescript
enum DiscriminantResource {
  SUBMISSION = 'SUBMISSION',
  QUIZ_QUESTION = 'QUIZ_QUESTION',
  QUIZ_OPTION = 'QUIZ_OPTION',
  LESSON = 'LESSON'
}
```

---

## Errores Comunes

### Error de Validación (400)
```json
{
  "success": false,
  "message": "Validation error: Invalid input data",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

### Recurso No Encontrado (404)
```json
{
  "success": false,
  "message": "Resource not found",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

### Error Interno (500)
```json
{
  "success": false,
  "message": "Internal server error",
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

## Forums

### GET /api/v1/forums
Obtiene todos los foros con paginación y filtros.

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción | Valores |
|-----------|------|-----------|-------------|---------|
| page | number | No | Número de página | Default: 1 |
| size | number | No | Cantidad por página | Default: 10, Max: 100 |
| sort | string | No | Campo para ordenar | createdAt, commentsCount |
| sortDirection | string | No | Dirección del ordenamiento | asc, desc (Default: asc) |
| lightDTO | boolean | No | Retornar DTO ligero | Default: true |
| courseId | string | No | Filtrar por ID del curso | UUID |
| active | boolean | No | Filtrar por estado activo | true, false |
| commentsCountMin | number | No | Comentarios mínimos | >= 0 |
| commentsCountMax | number | No | Comentarios máximos | >= 0 |
| createdAtStart | date | No | Fecha de creación inicio | ISO 8601 |
| createdAtEnd | date | No | Fecha de creación fin | ISO 8601 |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Forums retrieved successfully",
  "data": [
    {
      "idForum": "550e8400-e29b-41d4-a716-446655440001",
      "courseId": "550e8400-e29b-41d4-a716-446655440002",
      "active": true,
      "commentsCount": 25,
      "createdAt": "2025-11-20T10:30:00.000Z"
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

### GET /api/v1/forums/:id
Obtiene un foro específico por ID.

**Path Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|-----------|-----------|-------------|
| id | string | Sí | ID del foro (UUID) |

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|-----------|-----------|-------------|
| lightDTO | boolean | No | Retornar DTO ligero (Default: true) |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Forum retrieved successfully",
  "data": {
    "idForum": "550e8400-e29b-41d4-a716-446655440001",
    "courseId": "550e8400-e29b-41d4-a716-446655440002",
    "active": true,
    "commentsCount": 25,
    "createdAt": "2025-11-20T10:30:00.000Z"
  },
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### GET /api/v1/courses/:courseId/forum
Obtiene el foro de un curso específico.

**Path Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|-----------|-----------|-------------|
| courseId | string | Sí | ID del curso (UUID) |

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|-----------|-----------|-------------|
| lightDTO | boolean | No | Retornar DTO ligero (Default: true) |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Forum retrieved successfully",
  "data": {
    "idForum": "550e8400-e29b-41d4-a716-446655440001",
    "courseId": "550e8400-e29b-41d4-a716-446655440002",
    "active": true,
    "commentsCount": 25,
    "createdAt": "2025-11-20T10:30:00.000Z"
  },
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### POST /api/v1/forums
Crea un nuevo foro.

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|-----------|-----------|-------------|
| lightDTO | boolean | No | Retornar DTO ligero (Default: true) |

**Body:**
```json
{
  "courseId": "550e8400-e29b-41d4-a716-446655440002",
  "active": true
}
```

**Campos del Body:**
| Campo | Tipo | Requerido | Validación | Descripción |
|-------|------|-----------|------------|-------------|
| courseId | string | Sí | UUID, max 36 | ID del curso |
| active | boolean | Sí | true/false | Estado activo del foro |

**Respuesta (201):**
```json
{
  "success": true,
  "message": "Forum created successfully",
  "data": {
    "idForum": "550e8400-e29b-41d4-a716-446655440001",
    "courseId": "550e8400-e29b-41d4-a716-446655440002",
    "active": true,
    "commentsCount": 0,
    "createdAt": "2025-11-20T10:30:00.000Z"
  },
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### PUT /api/v1/forums/:id
Actualiza un foro existente.

**Path Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|-----------|-----------|-------------|
| id | string | Sí | ID del foro (UUID) |

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|-----------|-----------|-------------|
| lightDTO | boolean | No | Retornar DTO ligero (Default: true) |

**Body (todos los campos opcionales):**
```json
{
  "courseId": "550e8400-e29b-41d4-a716-446655440002",
  "active": false,
  "commentsCount": 30
}
```

**Campos del Body:**
| Campo | Tipo | Requerido | Validación | Descripción |
|-------|------|-----------|------------|-------------|
| courseId | string | No | UUID, max 36 | ID del curso |
| active | boolean | No | true/false | Estado activo |
| commentsCount | number | No | >= 0, int | Contador de comentarios |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Forum updated successfully",
  "data": {
    "idForum": "550e8400-e29b-41d4-a716-446655440001",
    "courseId": "550e8400-e29b-41d4-a716-446655440002",
    "active": false,
    "commentsCount": 30,
    "createdAt": "2025-11-20T10:30:00.000Z"
  },
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### DELETE /api/v1/forums/:id
Elimina un foro.

**Path Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|-----------|-----------|-------------|
| id | string | Sí | ID del foro (UUID) |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Forum deleted successfully",
  "data": {
    "deleted": true
  },
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

## Forum Messages

### GET /api/v1/forum-messages
Obtiene todos los mensajes de foro con paginación y filtros.

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción | Valores |
|-----------|------|-----------|-------------|---------|
| page | number | No | Número de página | Default: 1 |
| size | number | No | Cantidad por página | Default: 10, Max: 100 |
| sort | string | No | Campo para ordenar | createdAt, updatedAt |
| sortDirection | string | No | Dirección del ordenamiento | asc, desc (Default: asc) |
| lightDTO | boolean | No | Retornar DTO ligero | Default: true |
| forumId | string | No | Filtrar por ID del foro | UUID |
| userId | string | No | Filtrar por ID del usuario | string |
| parentMessageId | string | No | Filtrar por ID del mensaje padre | UUID o null |
| content | string | No | Buscar en contenido | string |
| createdAtStart | date | No | Fecha de creación inicio | ISO 8601 |
| createdAtEnd | date | No | Fecha de creación fin | ISO 8601 |
| updatedAtStart | date | No | Fecha de actualización inicio | ISO 8601 |
| updatedAtEnd | date | No | Fecha de actualización fin | ISO 8601 |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Forum messages retrieved successfully",
  "data": [
    {
      "idMessage": "550e8400-e29b-41d4-a716-446655440001",
      "forumId": "550e8400-e29b-41d4-a716-446655440002",
      "userId": "user-123",
      "content": "Este es un mensaje de ejemplo",
      "parentMessageId": null,
      "createdAt": "2025-11-20T10:30:00.000Z"
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

### GET /api/v1/forum-messages/:id
Obtiene un mensaje específico por ID.

**Path Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|-----------|-----------|-------------|
| id | string | Sí | ID del mensaje (UUID) |

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|-----------|-----------|-------------|
| lightDTO | boolean | No | Retornar DTO ligero (Default: true) |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Forum message retrieved successfully",
  "data": {
    "idMessage": "550e8400-e29b-41d4-a716-446655440001",
    "forumId": "550e8400-e29b-41d4-a716-446655440002",
    "userId": "user-123",
    "content": "Este es un mensaje de ejemplo",
    "parentMessageId": null,
    "createdAt": "2025-11-20T10:30:00.000Z",
    "updatedAt": null
  },
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### GET /api/v1/forums/:forumId/messages
Obtiene todos los mensajes de un foro específico.

**Path Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|-----------|-----------|-------------|
| forumId | string | Sí | ID del foro (UUID) |

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|-----------|-----------|-------------|
| page | number | No | Número de página (Default: 1) |
| size | number | No | Cantidad por página (Default: 10) |
| sort | string | No | Campo para ordenar |
| sortDirection | string | No | Dirección (asc, desc) |
| lightDTO | boolean | No | Retornar DTO ligero (Default: true) |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Forum messages retrieved successfully",
  "data": [
    {
      "idMessage": "550e8400-e29b-41d4-a716-446655440001",
      "forumId": "550e8400-e29b-41d4-a716-446655440002",
      "userId": "user-123",
      "content": "Mensaje en el foro",
      "parentMessageId": null,
      "createdAt": "2025-11-20T10:30:00.000Z"
    }
  ],
  "timestamp": "2025-11-20T10:30:00.000Z",
  "pagination": {...}
}
```

---

### GET /api/v1/forum-messages/:parentMessageId/replies
Obtiene todas las respuestas a un mensaje específico.

**Path Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|-----------|-----------|-------------|
| parentMessageId | string | Sí | ID del mensaje padre (UUID) |

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|-----------|-----------|-------------|
| page | number | No | Número de página (Default: 1) |
| size | number | No | Cantidad por página (Default: 10) |
| sort | string | No | Campo para ordenar |
| sortDirection | string | No | Dirección (asc, desc) |
| lightDTO | boolean | No | Retornar DTO ligero (Default: true) |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Replies retrieved successfully",
  "data": [
    {
      "idMessage": "550e8400-e29b-41d4-a716-446655440010",
      "forumId": "550e8400-e29b-41d4-a716-446655440002",
      "userId": "user-456",
      "content": "Esta es una respuesta",
      "parentMessageId": "550e8400-e29b-41d4-a716-446655440001",
      "createdAt": "2025-11-20T11:00:00.000Z"
    }
  ],
  "timestamp": "2025-11-20T11:00:00.000Z",
  "pagination": {...}
}
```

---

### POST /api/v1/forum-messages
Crea un nuevo mensaje en el foro.

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|-----------|-----------|-------------|
| lightDTO | boolean | No | Retornar DTO ligero (Default: true) |

**Body:**
```json
{
  "forumId": "550e8400-e29b-41d4-a716-446655440002",
  "userId": "user-123",
  "content": "Este es un nuevo mensaje en el foro",
  "parentMessageId": null
}
```

**Campos del Body:**
| Campo | Tipo | Requerido | Validación | Descripción |
|-------|------|-----------|------------|-------------|
| forumId | string | Sí | UUID, max 36 | ID del foro |
| userId | string | Sí | max 200 | ID del usuario |
| content | string | Sí | min 1 | Contenido del mensaje |
| parentMessageId | string\|null | Sí | UUID o null | ID del mensaje padre (null para mensajes principales) |

**Respuesta (201):**
```json
{
  "success": true,
  "message": "Forum message created successfully",
  "data": {
    "idMessage": "550e8400-e29b-41d4-a716-446655440001",
    "forumId": "550e8400-e29b-41d4-a716-446655440002",
    "userId": "user-123",
    "content": "Este es un nuevo mensaje en el foro",
    "parentMessageId": null,
    "createdAt": "2025-11-20T10:30:00.000Z"
  },
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

### PUT /api/v1/forum-messages/:id
Actualiza un mensaje existente.

**Path Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|-----------|-----------|-------------|
| id | string | Sí | ID del mensaje (UUID) |

**Query Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|-----------|-----------|-------------|
| lightDTO | boolean | No | Retornar DTO ligero (Default: true) |

**Body:**
```json
{
  "content": "Contenido actualizado del mensaje"
}
```

**Campos del Body:**
| Campo | Tipo | Requerido | Validación | Descripción |
|-------|------|-----------|------------|-------------|
| content | string | No | min 1 | Nuevo contenido del mensaje |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Forum message updated successfully",
  "data": {
    "idMessage": "550e8400-e29b-41d4-a716-446655440001",
    "forumId": "550e8400-e29b-41d4-a716-446655440002",
    "userId": "user-123",
    "content": "Contenido actualizado del mensaje",
    "parentMessageId": null,
    "createdAt": "2025-11-20T10:30:00.000Z",
    "updatedAt": "2025-11-20T12:00:00.000Z"
  },
  "timestamp": "2025-11-20T12:00:00.000Z"
}
```

---

### DELETE /api/v1/forum-messages/:id
Elimina un mensaje del foro.

**Path Parameters:**
| Parámetro | Tipo | Requerido | Descripción |
|-----------|-----------|-----------|-------------|
| id | string | Sí | ID del mensaje (UUID) |

**Respuesta (200):**
```json
{
  "success": true,
  "message": "Forum message deleted successfully",
  "data": {
    "deleted": true
  },
  "timestamp": "2025-11-20T10:30:00.000Z"
}
```

---

## Notas de Desarrollo

1. **Paginación**: Por defecto, todas las consultas paginadas retornan 10 elementos por página con un máximo de 100.

2. **Ordenamiento**: Los campos válidos para ordenar dependen del recurso (ej. `title`, `createdAt`, `price`).

3. **DTO Ligero vs Pesado**: El parámetro `lightDTO` permite obtener versiones simplificadas de los objetos para optimizar el rendimiento.

4. **Fechas**: Todas las fechas deben estar en formato ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ).

5. **IDs**: Todos los IDs son UUID v4.

6. **Validaciones**: Todas las rutas implementan validación de datos usando Zod.

---

## Contacto y Soporte

Para reportar problemas o solicitar nuevas funcionalidades:
- **Repositorio**: [SOPHIA-CourseService](https://github.com/IETI-Group/SOPHIA-CourseService)
- **Branch**: develop
