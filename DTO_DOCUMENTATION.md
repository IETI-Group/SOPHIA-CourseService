# SOPHIA Course Service - DTO Documentation

## Tabla de Contenidos
- [AI Specs](#ai-specs)
- [Assignment](#assignment)
- [Category](#category)
- [Course](#course)
- [Forum](#forum)
- [Lesson](#lesson)
- [Quiz](#quiz)
- [Resource](#resource)
- [Section](#section)

---

## AI Specs

### AISpecsLessonInDTO
DTO de entrada para especificaciones de IA en lecciones.
```typescript
interface AISpecsLessonInDTO {
  lessonContentId: string;
  generationPromptSummary: string;
  contentStructure: Json;
  estimatedVideoDurationMinutes: number | null;
  videoScript: string | null;
  videoGenerationInstructions: Json;
  interactiveElements: Json | null;
  exerciseParameters: Json | null;
}
```

### AISpecsLessonOutLightDTO
DTO de salida ligero para especificaciones de IA.
```typescript
interface AISpecsLessonOutLightDTO {
  idLessonSpec: string;
  createdAt: Date;
  lessonContentId: string;
  generationPromptSummary: string;
  contentStructure: Json;
  estimatedVideoDurationMinutes: number | null;
}
```

### AISpecsLessonOutHeavyDTO
DTO de salida completo para especificaciones de IA (extiende LightDTO).
```typescript
interface AISpecsLessonOutHeavyDTO extends AISpecsLessonOutLightDTO {
  videoScript: string | null;
  videoGenerationInstructions: Json;
  interactiveElements: Json;
  exerciseParameters: Json;
}
```

---

## Assignment

### AssignmentLessonInDTO
DTO de entrada para crear tareas.
```typescript
interface AssignmentLessonInDTO {
  lessonId: string;
  title: string;
  instructions: string;
  maxFileSizeMb: number;
  allowedTypes: ASSIGNMENT_TYPE;
  dueDate: Date;
  maxScore: number;
}
```

### AssignmentLessonUpdateDTO
DTO para actualizar tareas (extiende InDTO).
```typescript
interface AssignmentLessonUpdateDTO extends AssignmentLessonInDTO {
  active: boolean;
}
```

### AssignmentLessonOutDTO
DTO de salida para tareas (extiende UpdateDTO).
```typescript
interface AssignmentLessonOutDTO extends AssignmentLessonUpdateDTO {
  idAssignment: string;
  createdAt: Date;
}
```

### SubmissionAssignmentInDTO
DTO de entrada para entregas de tareas.
```typescript
interface SubmissionAssignmentInDTO {
  assignmentId: string;
  userId: string;
}
```

### SubmissionAssignmentUpdateDTO
DTO para actualizar entregas (extiende InDTO).
```typescript
interface SubmissionAssignmentUpdateDTO extends SubmissionAssignmentInDTO {
  feedback: string | null;
  active: boolean;
  score: number | null;
  status: SUBMISSION_STATUS;
}
```

### SubmissionAssignmentOutDTO
DTO de salida para entregas (extiende UpdateDTO).
```typescript
interface SubmissionAssignmentOutDTO extends SubmissionAssignmentUpdateDTO {
  idSubmission: string;
  gradedAt: Date | null;
  submittedAt: Date | null;
}
```

---

## Category

### CategoryCourseInDTO
DTO de entrada para categorías.
```typescript
interface CategoryCourseInDTO {
  name: string;
  description: string;
  parentCategory: string | null;
}
```

### CategoryCourseUpdateDTO
DTO para actualizar categorías (extiende InDTO).
```typescript
interface CategoryCourseUpdateDTO extends CategoryCourseInDTO {
  active: boolean;
}
```

### CategoryCourseOutDTO
DTO de salida para categorías (extiende UpdateDTO).
```typescript
interface CategoryCourseOutDTO extends CategoryCourseUpdateDTO {
  idCategory: string;
}
```

### TagCourseInDTO
DTO de entrada para etiquetas.
```typescript
interface TagCourseInDTO {
  categoryId: string;
  courseId: string;
}
```

### TagCourseOutDTO
DTO de salida para etiquetas (extiende InDTO).
```typescript
interface TagCourseOutDTO extends TagCourseInDTO {
  createdAt: Date;
  name: string;
}
```

---

## Course

### CourseInDTO
DTO de entrada para cursos.
```typescript
interface CourseInDTO {
  instructorId: string | null;
  title: string;
  description: string;
  price: number;
  level: COURSE_LEVEL;
  aiGenerated: boolean;
  generationTaskId: string | null;
  generationMetadata: Json;
  lastAIUpdateAt: Date | null;
}
```

### CourseUpdateDTO
DTO para actualizar cursos (extiende InDTO).
```typescript
interface CourseUpdateDTO extends CourseInDTO {
  active: boolean;
  status: COURSE_STATUS;
}
```

### CourseLightDTO
DTO de salida ligero para cursos.
```typescript
interface CourseLightDTO {
  idCourse: string;
  instructorId: string | null;
  title: string;
  price: number;
  level: COURSE_LEVEL;
  active: boolean;
  averageReviews: number;
  durationHours: number;
  totalLessons: number;
  status: COURSE_STATUS;
  updatedAt: Date | null;
  createdAt: Date;
  totalReviews: number;
  totalEnrollments: number;
  publishedAt: Date | null;
}
```

### CourseHeavyDTO
DTO de salida completo para cursos (extiende LightDTO).
```typescript
interface CourseHeavyDTO extends CourseLightDTO {
  description: string;
  aiGenerated: boolean;
  generationTaskId: string | null;
  generationMetadata: Json;
  lastAIUpdateAt: Date | null;
}
```

### InscriptionCourseInDTO
DTO de entrada para inscripciones.
```typescript
interface InscriptionCourseInDTO {
  userId: string;
  courseId: string;
}
```

### InscriptionCourseUpdateDTO
DTO para actualizar inscripciones (extiende InDTO).
```typescript
interface InscriptionCourseUpdateDTO extends InscriptionCourseInDTO {
  progressPercentage: number;
  score: number | null;
  active: boolean;
}
```

### InscriptionCourseOutDTO
DTO de salida para inscripciones (extiende UpdateDTO).
```typescript
interface InscriptionCourseOutDTO extends InscriptionCourseUpdateDTO {
  idInscription: string;
  createdAt: Date;
  completed: boolean;
}
```

### FavoriteCourseInDTO
DTO de entrada para favoritos.
```typescript
interface FavoriteCourseInDTO {
  userId: string;
  courseId: string;
}
```

### FavoriteCourseOutDTO
DTO de salida para favoritos (extiende InDTO).
```typescript
interface FavoriteCourseOutDTO extends FavoriteCourseInDTO {
  createdAt: Date;
  courseTitle: string;
  courseAverageReviews: number;
  courseTotalEnrollments: number;
  courseLevel: COURSE_LEVEL;
}
```

---

## Forum

### ForumInDTO
DTO de entrada para foros.
```typescript
interface ForumInDTO {
  courseId: string;
  active: boolean;
}
```

### ForumUpdateDTO
DTO para actualizar foros (extiende InDTO).
```typescript
interface ForumUpdateDTO extends ForumInDTO {
  commentsCount: number;
}
```

### ForumLightDTO
DTO de salida ligero para foros.
```typescript
interface ForumLightDTO {
  idForum: string;
  courseId: string;
  active: boolean;
  commentsCount: number;
  createdAt: Date;
}
```

### ForumHeavyDTO
DTO de salida completo para foros (extiende LightDTO).
```typescript
interface ForumHeavyDTO extends ForumLightDTO {
  // Actualmente no hay campos adicionales
}
```

### ForumMessageInDTO
DTO de entrada para mensajes de foro.
```typescript
interface ForumMessageInDTO {
  forumId: string;
  userId: string;
  content: string;
  parentMessageId: string | null;
}
```

### ForumMessageUpdateDTO
DTO para actualizar mensajes de foro.
```typescript
interface ForumMessageUpdateDTO {
  content: string;
}
```

### ForumMessageLightDTO
DTO de salida ligero para mensajes de foro.
```typescript
interface ForumMessageLightDTO {
  idMessage: string;
  forumId: string;
  userId: string;
  content: string;
  parentMessageId: string | null;
  createdAt: Date;
}
```

### ForumMessageHeavyDTO
DTO de salida completo para mensajes de foro (extiende LightDTO).
```typescript
interface ForumMessageHeavyDTO extends ForumMessageLightDTO {
  updatedAt: Date | null;
}
```

---

## Lesson

### LessonSectionInDTO
DTO de entrada para lecciones.
```typescript
interface LessonSectionInDTO {
  sectionId: string;
  title: string;
  description: string;
  order: number;
  durationMinutes: number;
  aiGenerated: boolean;
  generationTaskId: string | null;
  lessonType: LESSON_TYPE;
  estimatedDifficulty: number;
}
```

### LessonSectionUpdateDTO
DTO para actualizar lecciones (extiende InDTO).
```typescript
interface LessonSectionUpdateDTO extends LessonSectionInDTO {
  active: boolean;
}
```

### LessonSectionOutLightDTO
DTO de salida ligero para lecciones.
```typescript
interface LessonSectionOutLightDTO {
  idLesson: string;
  active: boolean;
  createdAt: Date;
  sectionId: string;
  title: string;
  order: number;
  durationMinutes: number;
  lessonType: LESSON_TYPE;
}
```

### LessonSectionOutHeavyDTO
DTO de salida completo para lecciones (extiende LightDTO).
```typescript
interface LessonSectionOutHeavyDTO extends LessonSectionOutLightDTO {
  description: string;
  aiGenerated: boolean;
  generationTaskId: string | null;
  estimatedDifficulty: number;
}
```

### ContentLessonInDTO
DTO de entrada para contenido de lecciones.
```typescript
interface ContentLessonInDTO {
  lessonId: string;
  metadata: Json;
  difficultyLevel: DIFFICULTY_LEVEL;
  learningTechnique: LEARNING_TECHNIQUE;
  orderPreference: number | null;
  aiGenerated: boolean;
  generationLogId: string | null;
  contentType: LESSON_CONTENT_TYPE;
  parentContentId: string | null;
}
```

### ContentLessonUpdateDTO
DTO para actualizar contenido (extiende InDTO).
```typescript
interface ContentLessonUpdateDTO extends ContentLessonInDTO {
  active: boolean;
  isCurrentVersion: boolean;
}
```

### ContentLessonOutLightDTO
DTO de salida ligero para contenido.
```typescript
interface ContentLessonOutLightDTO {
  idLessonContent: string;
  version: number;
  lessonId: string;
  active: boolean;
  isCurrentVersion: boolean;
  difficultyLevel: DIFFICULTY_LEVEL;
  learningTechnique: LEARNING_TECHNIQUE;
  orderPreference: number | null;
  createdAt: Date;
}
```

### ContentLessonOutHeavyDTO
DTO de salida completo para contenido (extiende LightDTO).
```typescript
interface ContentLessonOutHeavyDTO extends ContentLessonOutLightDTO {
  metadata: Json;
  aiGenerated: boolean;
  generationLogId: string | null;
  contentType: LESSON_CONTENT_TYPE;
  parentContentId: string | null;
}
```

### ProgressContentInDTO
DTO de entrada para progreso.
```typescript
interface ProgressContentInDTO {
  userId: string;
  lessonContentId: string;
}
```

### ProgressContentUpdateDTO
DTO para actualizar progreso (extiende InDTO).
```typescript
interface ProgressContentUpdateDTO extends ProgressContentInDTO {
  timeSpendMinutes: number;
  completionPercentage: number;
  effectivinessScore: number;
  active: boolean;
  userRating: number | null;
}
```

### ProgressContentOutDTO
DTO de salida para progreso (extiende UpdateDTO).
```typescript
interface ProgressContentOutDTO extends ProgressContentUpdateDTO {
  idContentProgress: string;
  startedAt: Date | null;
  completedAt: Date | null;
}
```

---

## Quiz

### QuizSectionInDTO
DTO de entrada para cuestionarios.
```typescript
interface QuizSectionInDTO {
  sectionId: string;
  description: string;
  title: string;
  aiGenerated: boolean;
  generationTaskId: string | null;
  difficultyDistribution: Json;
  adaptativeLogic: Json;
}
```

### QuizSectionUpdateDTO
DTO para actualizar cuestionarios (extiende InDTO).
```typescript
interface QuizSectionUpdateDTO extends QuizSectionInDTO {
  active: boolean;
  durationMinutes: number;
}
```

### QuizSectionOutLightDTO
DTO de salida ligero para cuestionarios.
```typescript
interface QuizSectionOutLightDTO {
  idQuiz: string;
  createdAt: Date;
  active: boolean;
  durationMinutes: number;
  sectionId: string;
  title: string;
}
```

### QuizSectionOutHeavyDTO
DTO de salida completo para cuestionarios (extiende LightDTO).
```typescript
interface QuizSectionOutHeavyDTO extends QuizSectionOutLightDTO {
  description: string;
  aiGenerated: boolean;
  generationTaskId: string | null;
  difficultyDistribution: Json;
  adaptativeLogic: Json;
}
```

### QuestionQuizInDTO
DTO de entrada para preguntas.
```typescript
interface QuestionQuizInDTO {
  quizId: string;
  question: string;
  durationMinutes: number;
}
```

### QuestionQuizOutDTO
DTO de salida para preguntas (extiende InDTO).
```typescript
interface QuestionQuizOutDTO extends QuestionQuizInDTO {
  idQuizQuestion: string;
}
```

### OptionQuizInDTO
DTO de entrada para opciones.
```typescript
interface OptionQuizInDTO {
  quizQuestionId: string;
  option: string;
  isCorrect: boolean;
}
```

### OptionQuizOutDTO
DTO de salida para opciones (extiende InDTO).
```typescript
interface OptionQuizOutDTO extends OptionQuizInDTO {
  idQuizOption: string;
}
```

### AttemptQuizInDTO
DTO de entrada para intentos.
```typescript
interface AttemptQuizInDTO {
  quizId: string;
  userId: string;
}
```

### AttemptQuizUpdateDTO
DTO para actualizar intentos (extiende InDTO).
```typescript
interface AttemptQuizUpdateDTO extends AttemptQuizInDTO {
  grade: number | null;
}
```

### AttemptQuizOutDTO
DTO de salida para intentos (extiende UpdateDTO).
```typescript
interface AttemptQuizOutDTO extends AttemptQuizUpdateDTO {
  idQuizAttempt: string;
  submittedAt: Date;
  durationMinutes: number;
}
```

---

## Resource

### ResourcesInDTO
DTO de entrada para recursos.
```typescript
interface ResourcesInDTO {
  entityReference: string;
  discriminant: DISCRIMINANT_RESOURCE;
  name: string;
  type: RESOURCE_TYPE;
  url: string | null;
  content: string | null;
  order: number;
  durationSeconds: number;
  fileSizeMb: number;
  mimeType: string | null;
  thumnailUrl: string | null;
  metadata: Json;
}
```

### ResourcesOutLightDTO
DTO de salida ligero para recursos.
```typescript
interface ResourcesOutLightDTO {
  idResource: string;
  entityReference: string;
  discriminant: DISCRIMINANT_RESOURCE;
  name: string;
  type: RESOURCE_TYPE;
  url: string | null;
  content: string | null;
  order: number;
  durationSeconds: number;
  fileSizeMb: number;
}
```

### ResourcesOutHeavyDTO
DTO de salida completo para recursos (extiende LightDTO).
```typescript
interface ResourcesOutHeavyDTO extends ResourcesOutLightDTO {
  mimeType: string | null;
  thumnailUrl: string | null;
  metadata: Json;
}
```

---

## Section

### SectionCourseInDTO
DTO de entrada para secciones.
```typescript
interface SectionCourseInDTO {
  courseId: string;
  title: string;
  description: string;
  order: number;
  aiGenerated: boolean;
  generationTaskId: string | null;
  suggestedByAi: boolean;
}
```

### SectionCourseUpdateDTO
DTO para actualizar secciones (extiende InDTO).
```typescript
interface SectionCourseUpdateDTO extends SectionCourseInDTO {
  active: boolean;
}
```

### SectionCourseOutLightDTO
DTO de salida ligero para secciones.
```typescript
interface SectionCourseOutLightDTO {
  idSection: string;
  courseId: string;
  title: string;
  durationHours: number;
  createdAt: Date;
  active: boolean;
  order: number;
}
```

### SectionCourseOutHeavyDTO
DTO de salida completo para secciones (extiende LightDTO).
```typescript
interface SectionCourseOutHeavyDTO extends SectionCourseOutLightDTO {
  description: string;
  aiGenerated: boolean;
  generationTaskId: string | null;
  suggestedByAi: boolean;
}
```
