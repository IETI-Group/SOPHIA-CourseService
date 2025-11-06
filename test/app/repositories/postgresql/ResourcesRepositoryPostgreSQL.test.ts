import { DiscriminantResource, type PrismaClient, ResourceType } from '@prisma/client/default.js';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { ResourcesInDTO } from '../../../../src/app/models/index.js';
import type { ResourcesRepository } from '../../../../src/app/repositories/interfaces/ResourcesRepository.js';
import { ResourcesRepositoryPostgreSQL } from '../../../../src/app/repositories/postgresql/ResourcesRepositoryPostgreSQL.js';
import type { FiltersResource, SortingResources } from '../../../../src/utils/index.js';
import { SORT_RESOURCE } from '../../../../src/utils/index.js';

describe('Resources Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let resourcesRepository: ResourcesRepository;
  beforeEach(() => {
    mockReset(prismaClient);
    resourcesRepository = new ResourcesRepositoryPostgreSQL(prismaClient);
  });
  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(resourcesRepository).toBeDefined();
  });

  describe('getResources', () => {
    it('Should return paginated resources with light DTO', async () => {
      const filters: FiltersResource = {
        discriminant: DiscriminantResource.LESSON,
        entityReference: null,
        type: null,
        name: null,
        orderMin: null,
        orderMax: null,
        durationSecondsMin: null,
        durationSecondsMax: null,
        fileSizeMbMin: null,
        fileSizeMbMax: null,
      };
      const sort: SortingResources = {
        sortFields: [SORT_RESOURCE.NAME],
        page: 1,
        size: 10,
        sortDirection: 'asc',
      };

      const mockResources = [
        {
          id_resource: 'resource_1',
          name: 'Introduction Video',
          type: ResourceType.VIDEO,
          url: 'https://example.com/video.mp4',
          content: null,
          order: 1,
          duration_seconds: 300,
          file_size_mb: 50.5,
          mime_type: 'video/mp4',
          thumnail_url: 'https://example.com/thumb.jpg',
          metadata: { quality: 'HD' },
          lesson: {
            id_resource: 'resource_1',
            lesson_content_id: 'lesson_1',
          },
        },
      ];

      prismaClient.resources.count.mockResolvedValueOnce(1);
      prismaClient.resources.findMany.mockResolvedValueOnce(mockResources);

      const result = await resourcesRepository.getResources(filters, sort, true);

      expect(prismaClient.resources.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.data[0].discriminant).toBe(DiscriminantResource.LESSON);
      expect(result.data[0].entityReference).toBe('lesson_1');
    });

    it('Should return paginated resources with heavy DTO for quiz options', async () => {
      const filters: FiltersResource = {
        discriminant: DiscriminantResource.QUIZ_OPTION,
        entityReference: 'option_1',
        type: null,
        name: null,
        orderMin: null,
        orderMax: null,
        durationSecondsMin: null,
        durationSecondsMax: null,
        fileSizeMbMin: null,
        fileSizeMbMax: null,
      };
      const sort: SortingResources = {
        sortFields: [SORT_RESOURCE.ORDER],
        page: 1,
        size: 10,
        sortDirection: 'asc',
      };

      const mockResources = [
        {
          id_resource: 'resource_2',
          name: 'Option Image',
          type: ResourceType.PICTURE,
          url: 'https://example.com/option.png',
          content: null,
          order: 1,
          duration_seconds: 0,
          file_size_mb: 2.5,
          mime_type: 'image/png',
          thumnail_url: null,
          metadata: { width: 800, height: 600 },
          quiz_option: {
            id_resource: 'resource_2',
            quiz_option_id: 'option_1',
          },
        },
      ];

      prismaClient.resources.count.mockResolvedValueOnce(1);
      prismaClient.resources.findMany.mockResolvedValueOnce(mockResources);

      const result = await resourcesRepository.getResources(filters, sort, false);

      expect(prismaClient.resources.findMany).toHaveBeenCalledOnce();
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].discriminant).toBe(DiscriminantResource.QUIZ_OPTION);
      expect(result.data[0]).toHaveProperty('mimeType', 'image/png');
      expect(result.data[0]).toHaveProperty('metadata');
    });

    it('Should return filtered resources by type and duration range', async () => {
      const filters: FiltersResource = {
        discriminant: null,
        entityReference: null,
        type: ResourceType.VIDEO,
        name: null,
        orderMin: null,
        orderMax: null,
        durationSecondsMin: 100,
        durationSecondsMax: 500,
        fileSizeMbMin: null,
        fileSizeMbMax: null,
      };
      const sort: SortingResources = {
        sortFields: [SORT_RESOURCE.DURATION_SECONDS],
        page: 1,
        size: 10,
        sortDirection: 'desc',
      };

      const mockResources = [
        {
          id_resource: 'resource_3',
          name: 'Tutorial Video',
          type: ResourceType.VIDEO,
          url: 'https://example.com/tutorial.mp4',
          content: null,
          order: 1,
          duration_seconds: 450,
          file_size_mb: 75.0,
          mime_type: 'video/mp4',
          thumnail_url: 'https://example.com/tutorial-thumb.jpg',
          metadata: {},
          quiz_question: {
            id_resource: 'resource_3',
            quiz_question_id: 'question_1',
          },
        },
      ];

      prismaClient.resources.count.mockResolvedValueOnce(1);
      prismaClient.resources.findMany.mockResolvedValueOnce(mockResources);

      const result = await resourcesRepository.getResources(filters, sort, true);

      expect(prismaClient.resources.findMany).toHaveBeenCalledOnce();
      expect(result.data).toHaveLength(1);
      expect(result.data[0].type).toBe(ResourceType.VIDEO);
      expect(result.data[0].durationSeconds).toBe(450);
    });
  });

  describe('getResourceById', () => {
    it('Should return resource by id with light DTO for submission', async () => {
      const resourceId = 'resource_4';

      const mockResource = {
        id_resource: 'resource_4',
        name: 'Submission Document',
        type: ResourceType.PDF,
        url: 'https://example.com/submission.pdf',
        content: null,
        order: 1,
        duration_seconds: 0,
        file_size_mb: 3.2,
        mime_type: 'application/pdf',
        thumnail_url: null,
        metadata: { pages: 10 },
        submission: {
          id_resource: 'resource_4',
          submission_id: 'submission_1',
        },
      };

      prismaClient.resources.findUniqueOrThrow.mockResolvedValueOnce(mockResource);

      const result = await resourcesRepository.getResourceById(resourceId, true);

      expect(prismaClient.resources.findUniqueOrThrow).toHaveBeenCalledOnce();
      expect(result.idResource).toBe('resource_4');
      expect(result.discriminant).toBe(DiscriminantResource.SUBMISSION);
      expect(result.entityReference).toBe('submission_1');
      expect(result.type).toBe(ResourceType.PDF);
    });

    it('Should return resource by id with heavy DTO for quiz question', async () => {
      const resourceId = 'resource_5';

      const mockResource = {
        id_resource: 'resource_5',
        name: 'Question Diagram',
        type: ResourceType.DIAGRAM,
        url: null,
        content: '<svg>...</svg>',
        order: 2,
        duration_seconds: 0,
        file_size_mb: 0.5,
        mime_type: 'image/svg+xml',
        thumnail_url: 'https://example.com/diagram-thumb.png',
        metadata: { format: 'svg' },
        quiz_question: {
          id_resource: 'resource_5',
          quiz_question_id: 'question_2',
        },
      };

      prismaClient.resources.findUniqueOrThrow.mockResolvedValueOnce(mockResource);

      const result = await resourcesRepository.getResourceById(resourceId, false);

      expect(prismaClient.resources.findUniqueOrThrow).toHaveBeenCalledOnce();
      expect(result.idResource).toBe('resource_5');
      expect(result.discriminant).toBe(DiscriminantResource.QUIZ_QUESTION);
      expect(result).toHaveProperty('mimeType', 'image/svg+xml');
      expect(result).toHaveProperty('thumnailUrl', 'https://example.com/diagram-thumb.png');
    });

    it('Should throw error when resource not found', async () => {
      const resourceId = 'nonexistent';
      prismaClient.resources.findUniqueOrThrow.mockRejectedValueOnce(new Error('Not found'));

      await expect(resourcesRepository.getResourceById(resourceId, true)).rejects.toThrow();
    });
  });

  describe('createResource', () => {
    it('Should create a new resource for lesson with light DTO', async () => {
      const dto: ResourcesInDTO = {
        entityReference: 'lesson_2',
        discriminant: DiscriminantResource.LESSON,
        name: 'Lesson PDF',
        type: ResourceType.PDF,
        url: 'https://example.com/lesson.pdf',
        content: null,
        order: 1,
        durationSeconds: 0,
        fileSizeMb: 5.0,
        mimeType: 'application/pdf',
        thumnailUrl: null,
        metadata: { chapters: 5 },
      };

      const mockCreatedResource = {
        id_resource: 'resource_6',
        name: 'Lesson PDF',
        type: ResourceType.PDF,
        url: 'https://example.com/lesson.pdf',
        content: null,
        order: 1,
        duration_seconds: 0,
        file_size_mb: 5.0,
        mime_type: 'application/pdf',
        thumnail_url: null,
        metadata: { chapters: 5 },
        lesson: {
          id_resource: 'resource_6',
          lesson_content_id: 'lesson_2',
        },
      };

      prismaClient.resources.create.mockResolvedValueOnce(mockCreatedResource);
      prismaClient.lessonResources.create.mockResolvedValueOnce(mockCreatedResource.lesson);
      prismaClient.resources.findUniqueOrThrow.mockResolvedValueOnce(mockCreatedResource);

      const result = await resourcesRepository.createResource(dto, true);

      expect(prismaClient.resources.create).toHaveBeenCalledOnce();
      expect(prismaClient.lessonResources.create).toHaveBeenCalledOnce();
      expect(result.idResource).toBe('resource_6');
      expect(result.discriminant).toBe(DiscriminantResource.LESSON);
      expect(result.entityReference).toBe('lesson_2');
    });

    it('Should create a new resource for quiz option with heavy DTO', async () => {
      const dto: ResourcesInDTO = {
        entityReference: 'option_2',
        discriminant: DiscriminantResource.QUIZ_OPTION,
        name: 'Option Audio',
        type: ResourceType.AUDIO,
        url: 'https://example.com/option.mp3',
        content: null,
        order: 2,
        durationSeconds: 120,
        fileSizeMb: 3.5,
        mimeType: 'audio/mpeg',
        thumnailUrl: null,
        metadata: { bitrate: '128kbps' },
      };

      const mockCreatedResource = {
        id_resource: 'resource_7',
        name: 'Option Audio',
        type: ResourceType.AUDIO,
        url: 'https://example.com/option.mp3',
        content: null,
        order: 2,
        duration_seconds: 120,
        file_size_mb: 3.5,
        mime_type: 'audio/mpeg',
        thumnail_url: null,
        metadata: { bitrate: '128kbps' },
        quiz_option: {
          id_resource: 'resource_7',
          quiz_option_id: 'option_2',
        },
      };

      prismaClient.resources.create.mockResolvedValueOnce(mockCreatedResource);
      prismaClient.quizOptionResources.create.mockResolvedValueOnce(
        mockCreatedResource.quiz_option
      );
      prismaClient.resources.findUniqueOrThrow.mockResolvedValueOnce(mockCreatedResource);

      const result = await resourcesRepository.createResource(dto, false);

      expect(prismaClient.resources.create).toHaveBeenCalledOnce();
      expect(prismaClient.quizOptionResources.create).toHaveBeenCalledOnce();
      expect(result.idResource).toBe('resource_7');
      expect(result.discriminant).toBe(DiscriminantResource.QUIZ_OPTION);
      expect(result).toHaveProperty('mimeType', 'audio/mpeg');
    });

    it('Should create a new resource for submission', async () => {
      const dto: ResourcesInDTO = {
        entityReference: 'submission_2',
        discriminant: DiscriminantResource.SUBMISSION,
        name: 'Student Code',
        type: ResourceType.CODE,
        url: null,
        content: 'console.log("Hello World");',
        order: 1,
        durationSeconds: 0,
        fileSizeMb: 0.01,
        mimeType: 'text/javascript',
        thumnailUrl: null,
        metadata: { language: 'javascript' },
      };

      const mockCreatedResource = {
        id_resource: 'resource_8',
        name: 'Student Code',
        type: ResourceType.CODE,
        url: null,
        content: 'console.log("Hello World");',
        order: 1,
        duration_seconds: 0,
        file_size_mb: 0.01,
        mime_type: 'text/javascript',
        thumnail_url: null,
        metadata: { language: 'javascript' },
        submission: {
          id_resource: 'resource_8',
          submission_id: 'submission_2',
        },
      };

      prismaClient.resources.create.mockResolvedValueOnce(mockCreatedResource);
      prismaClient.submissionResources.create.mockResolvedValueOnce(mockCreatedResource.submission);
      prismaClient.resources.findUniqueOrThrow.mockResolvedValueOnce(mockCreatedResource);

      const result = await resourcesRepository.createResource(dto, true);

      expect(prismaClient.resources.create).toHaveBeenCalledOnce();
      expect(prismaClient.submissionResources.create).toHaveBeenCalledOnce();
      expect(result.idResource).toBe('resource_8');
      expect(result.discriminant).toBe(DiscriminantResource.SUBMISSION);
      expect(result.content).toBe('console.log("Hello World");');
    });

    it('Should create a new resource for quiz question', async () => {
      const dto: ResourcesInDTO = {
        entityReference: 'question_3',
        discriminant: DiscriminantResource.QUIZ_QUESTION,
        name: 'Question Interactive',
        type: ResourceType.INTERACTIVE,
        url: 'https://example.com/interactive.html',
        content: null,
        order: 1,
        durationSeconds: 300,
        fileSizeMb: 1.2,
        mimeType: 'text/html',
        thumnailUrl: 'https://example.com/interactive-thumb.png',
        metadata: { framework: 'HTML5' },
      };

      const mockCreatedResource = {
        id_resource: 'resource_9',
        name: 'Question Interactive',
        type: ResourceType.INTERACTIVE,
        url: 'https://example.com/interactive.html',
        content: null,
        order: 1,
        duration_seconds: 300,
        file_size_mb: 1.2,
        mime_type: 'text/html',
        thumnail_url: 'https://example.com/interactive-thumb.png',
        metadata: { framework: 'HTML5' },
        quiz_question: {
          id_resource: 'resource_9',
          quiz_question_id: 'question_3',
        },
      };

      prismaClient.resources.create.mockResolvedValueOnce(mockCreatedResource);
      prismaClient.quizQuestionResources.create.mockResolvedValueOnce(
        mockCreatedResource.quiz_question
      );
      prismaClient.resources.findUniqueOrThrow.mockResolvedValueOnce(mockCreatedResource);

      const result = await resourcesRepository.createResource(dto, false);

      expect(prismaClient.resources.create).toHaveBeenCalledOnce();
      expect(prismaClient.quizQuestionResources.create).toHaveBeenCalledOnce();
      expect(result.idResource).toBe('resource_9');
      expect(result.discriminant).toBe(DiscriminantResource.QUIZ_QUESTION);
      expect(result.entityReference).toBe('question_3');
    });
  });

  describe('updateResource', () => {
    it('Should update an existing resource for lesson with light DTO', async () => {
      const resourceId = 'resource_10';
      const dto: ResourcesInDTO = {
        entityReference: 'lesson_3',
        discriminant: DiscriminantResource.LESSON,
        name: 'Updated Lesson Video',
        type: ResourceType.VIDEO,
        url: 'https://example.com/updated-lesson.mp4',
        content: null,
        order: 1,
        durationSeconds: 600,
        fileSizeMb: 80.0,
        mimeType: 'video/mp4',
        thumnailUrl: 'https://example.com/updated-thumb.jpg',
        metadata: { resolution: '1080p' },
      };

      const mockUpdatedResource = {
        id_resource: 'resource_10',
        name: 'Updated Lesson Video',
        type: ResourceType.VIDEO,
        url: 'https://example.com/updated-lesson.mp4',
        content: null,
        order: 1,
        duration_seconds: 600,
        file_size_mb: 80.0,
        mime_type: 'video/mp4',
        thumnail_url: 'https://example.com/updated-thumb.jpg',
        metadata: { resolution: '1080p' },
        lesson: {
          id_resource: 'resource_10',
          lesson_content_id: 'lesson_3',
        },
      };

      prismaClient.resources.update.mockResolvedValueOnce(mockUpdatedResource);

      const result = await resourcesRepository.updateResource(resourceId, dto, true);

      expect(prismaClient.resources.update).toHaveBeenCalledOnce();
      expect(result.idResource).toBe('resource_10');
      expect(result.name).toBe('Updated Lesson Video');
      expect(result.durationSeconds).toBe(600);
    });

    it('Should update an existing resource for quiz option with heavy DTO', async () => {
      const resourceId = 'resource_11';
      const dto: ResourcesInDTO = {
        entityReference: 'option_3',
        discriminant: DiscriminantResource.QUIZ_OPTION,
        name: 'Updated Option Image',
        type: ResourceType.PICTURE,
        url: 'https://example.com/updated-option.jpg',
        content: null,
        order: 3,
        durationSeconds: 0,
        fileSizeMb: 4.0,
        mimeType: 'image/jpeg',
        thumnailUrl: 'https://example.com/updated-option-thumb.jpg',
        metadata: { width: 1024, height: 768 },
      };

      const mockUpdatedResource = {
        id_resource: 'resource_11',
        name: 'Updated Option Image',
        type: ResourceType.PICTURE,
        url: 'https://example.com/updated-option.jpg',
        content: null,
        order: 3,
        duration_seconds: 0,
        file_size_mb: 4.0,
        mime_type: 'image/jpeg',
        thumnail_url: 'https://example.com/updated-option-thumb.jpg',
        metadata: { width: 1024, height: 768 },
        quiz_option: {
          id_resource: 'resource_11',
          quiz_option_id: 'option_3',
        },
      };

      prismaClient.resources.update.mockResolvedValueOnce(mockUpdatedResource);

      const result = await resourcesRepository.updateResource(resourceId, dto, false);

      expect(prismaClient.resources.update).toHaveBeenCalledOnce();
      expect(result.idResource).toBe('resource_11');
      expect(result).toHaveProperty('mimeType', 'image/jpeg');
      expect(result).toHaveProperty('metadata');
    });

    it('Should update only some fields of a resource', async () => {
      const resourceId = 'resource_partial';
      const partialUpdateDTO: Partial<ResourcesInDTO> = {
        name: 'Updated Name Only',
        order: 5,
      };

      const existingData = {
        id_resource: resourceId,
        name: 'Updated Name Only',
        type: ResourceType.VIDEO,
        url: 'https://example.com/original.mp4',
        content: null,
        order: 5,
        duration_seconds: 300,
        file_size_mb: 50.5,
        mime_type: 'video/mp4',
        thumnail_url: 'https://example.com/thumb.jpg',
        metadata: { quality: 'HD' },
        lesson: {
          id_resource: resourceId,
          lesson_content_id: 'lesson_1',
        },
      };

      prismaClient.resources.update.mockResolvedValueOnce(existingData);

      const result = await resourcesRepository.updateResource(resourceId, partialUpdateDTO, true);

      expect(prismaClient.resources.update).toHaveBeenCalledOnce();
      expect(result.name).toBe('Updated Name Only');
      expect(result.order).toBe(5);
    });

    it('Should throw error when trying to update non-existent resource', async () => {
      const resourceId = 'nonexistent';
      const dto: Partial<ResourcesInDTO> = {
        entityReference: 'lesson_4',
        discriminant: DiscriminantResource.LESSON,
        name: 'Some Resource',
        type: ResourceType.TEXT,
        url: null,
        content: 'Content',
        order: 1,
        durationSeconds: 0,
        fileSizeMb: 0.1,
        mimeType: 'text/plain',
        thumnailUrl: null,
        metadata: {},
      };

      prismaClient.resources.update.mockRejectedValueOnce(new Error('Not found'));

      await expect(resourcesRepository.updateResource(resourceId, dto, true)).rejects.toThrow();
    });
  });

  describe('deleteResourceById', () => {
    it('Should delete a resource by id for lesson', async () => {
      const resourceId = 'resource_12';

      prismaClient.lessonResources.delete.mockResolvedValueOnce({
        id_resource: resourceId,
        lesson_content_id: 'lesson_5',
      });
      prismaClient.quizOptionResources.delete.mockRejectedValueOnce(new Error('Not found'));
      prismaClient.quizQuestionResources.delete.mockRejectedValueOnce(new Error('Not found'));
      prismaClient.submissionResources.delete.mockRejectedValueOnce(new Error('Not found'));
      prismaClient.resources.delete.mockResolvedValueOnce({
        id_resource: resourceId,
        name: 'Deleted Resource',
        type: ResourceType.PDF,
        url: 'https://example.com/deleted.pdf',
        content: null,
        order: 1,
        duration_seconds: 0,
        file_size_mb: 2.0,
        mime_type: 'application/pdf',
        thumnail_url: null,
        metadata: {},
      });

      await resourcesRepository.deleteResourceById(resourceId);

      expect(prismaClient.lessonResources.delete).toHaveBeenCalledOnce();
      expect(prismaClient.resources.delete).toHaveBeenCalledOnce();
    });

    it('Should delete a resource by id for quiz option', async () => {
      const resourceId = 'resource_13';

      prismaClient.lessonResources.delete.mockRejectedValueOnce(new Error('Not found'));
      prismaClient.quizOptionResources.delete.mockResolvedValueOnce({
        id_resource: resourceId,
        quiz_option_id: 'option_4',
      });
      prismaClient.quizQuestionResources.delete.mockRejectedValueOnce(new Error('Not found'));
      prismaClient.submissionResources.delete.mockRejectedValueOnce(new Error('Not found'));
      prismaClient.resources.delete.mockResolvedValueOnce({
        id_resource: resourceId,
        name: 'Deleted Option Resource',
        type: ResourceType.PICTURE,
        url: 'https://example.com/deleted-option.png',
        content: null,
        order: 1,
        duration_seconds: 0,
        file_size_mb: 1.5,
        mime_type: 'image/png',
        thumnail_url: null,
        metadata: {},
      });

      await resourcesRepository.deleteResourceById(resourceId);

      expect(prismaClient.quizOptionResources.delete).toHaveBeenCalledOnce();
      expect(prismaClient.resources.delete).toHaveBeenCalledOnce();
    });

    it('Should delete a resource by id for quiz question', async () => {
      const resourceId = 'resource_14';

      prismaClient.lessonResources.delete.mockRejectedValueOnce(new Error('Not found'));
      prismaClient.quizOptionResources.delete.mockRejectedValueOnce(new Error('Not found'));
      prismaClient.quizQuestionResources.delete.mockResolvedValueOnce({
        id_resource: resourceId,
        quiz_question_id: 'question_4',
      });
      prismaClient.submissionResources.delete.mockRejectedValueOnce(new Error('Not found'));
      prismaClient.resources.delete.mockResolvedValueOnce({
        id_resource: resourceId,
        name: 'Deleted Question Resource',
        type: ResourceType.VIDEO,
        url: 'https://example.com/deleted-question.mp4',
        content: null,
        order: 1,
        duration_seconds: 200,
        file_size_mb: 30.0,
        mime_type: 'video/mp4',
        thumnail_url: null,
        metadata: {},
      });

      await resourcesRepository.deleteResourceById(resourceId);

      expect(prismaClient.quizQuestionResources.delete).toHaveBeenCalledOnce();
      expect(prismaClient.resources.delete).toHaveBeenCalledOnce();
    });

    it('Should delete a resource by id for submission', async () => {
      const resourceId = 'resource_15';

      prismaClient.lessonResources.delete.mockRejectedValueOnce(new Error('Not found'));
      prismaClient.quizOptionResources.delete.mockRejectedValueOnce(new Error('Not found'));
      prismaClient.quizQuestionResources.delete.mockRejectedValueOnce(new Error('Not found'));
      prismaClient.submissionResources.delete.mockResolvedValueOnce({
        id_resource: resourceId,
        submission_id: 'submission_3',
      });
      prismaClient.resources.delete.mockResolvedValueOnce({
        id_resource: resourceId,
        name: 'Deleted Submission Resource',
        type: ResourceType.CODE,
        url: null,
        content: 'deleted code',
        order: 1,
        duration_seconds: 0,
        file_size_mb: 0.05,
        mime_type: 'text/plain',
        thumnail_url: null,
        metadata: {},
      });

      await resourcesRepository.deleteResourceById(resourceId);

      expect(prismaClient.submissionResources.delete).toHaveBeenCalledOnce();
      expect(prismaClient.resources.delete).toHaveBeenCalledOnce();
    });

    it('Should throw error when trying to delete non-existent resource', async () => {
      const resourceId = 'nonexistent';

      prismaClient.lessonResources.delete.mockRejectedValueOnce(null);
      prismaClient.quizOptionResources.delete.mockRejectedValueOnce(null);
      prismaClient.quizQuestionResources.delete.mockRejectedValueOnce(null);
      prismaClient.submissionResources.delete.mockRejectedValueOnce(null);

      await expect(resourcesRepository.deleteResourceById(resourceId)).rejects.toThrow();
    });
  });
});
