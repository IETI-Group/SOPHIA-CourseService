import { AssignmentType, type PrismaClient } from '@prisma/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import type { AssignmentsLessonRepository } from '../../../../src/app/index.js';
import { AssignmentsLessonRepositoryPostgreSQL } from '../../../../src/app/index.js';
import { SORT_ASSIGNMENT } from '../../../../src/utils/index.js';

describe('Assignments Lesson Repository', () => {
  const prismaClient = mockDeep<PrismaClient>();
  let assignmentsLessonRepository: AssignmentsLessonRepository;

  beforeEach(() => {
    mockReset(prismaClient);
    assignmentsLessonRepository = new AssignmentsLessonRepositoryPostgreSQL(prismaClient);
  });

  afterEach(() => {});

  it('Should be defined for every test', () => {
    expect(assignmentsLessonRepository).toBeDefined();
  });

  describe('getAssignments', () => {
    it('Should return paginated assignments', async () => {
      const mockAssignments = [
        {
          id_assignment: '1',
          lesson_id: 'lesson-1',
          title: 'Assignment 1',
          instructions: 'Complete the task',
          max_file_size_mb: 10,
          allowed_types: AssignmentType.PDF,
          created_at: new Date('2024-01-01'),
          due_date: new Date('2024-01-31'),
          max_score: 100,
          active: true,
        },
        {
          id_assignment: '2',
          lesson_id: 'lesson-1',
          title: 'Assignment 2',
          instructions: 'Submit code',
          max_file_size_mb: 5,
          allowed_types: AssignmentType.CODE,
          created_at: new Date('2024-01-02'),
          due_date: new Date('2024-02-15'),
          max_score: 50,
          active: true,
        },
      ];

      prismaClient.assignments.findMany.mockResolvedValue(mockAssignments);
      prismaClient.assignments.count.mockResolvedValue(2);

      const result = await assignmentsLessonRepository.getAssignments(
        {
          lessonId: 'lesson-1',
          title: null,
          allowedTypes: null,
          active: null,
          limitFileSizeMbMin: null,
          limitFileSizeMbMax: null,
          limitScoreMin: null,
          limitScoreMax: null,
          orderMin: null,
          orderMax: null,
          createdAtStart: null,
          createdAtEnd: null,
          dueDateStart: null,
          dueDateEnd: null,
        },
        {
          page: 1,
          size: 10,
          sortFields: [SORT_ASSIGNMENT.CREATION_DATE],
          sortDirection: 'desc',
        }
      );

      expect(result).toMatchObject({
        data: [
          {
            idAssignment: '1',
            lessonId: 'lesson-1',
            title: 'Assignment 1',
            instructions: 'Complete the task',
            maxFileSizeMb: 10,
            allowedTypes: AssignmentType.PDF,
            createdAt: new Date('2024-01-01'),
            dueDate: new Date('2024-01-31'),
            maxScore: 100,
            active: true,
          },
          {
            idAssignment: '2',
            lessonId: 'lesson-1',
            title: 'Assignment 2',
            instructions: 'Submit code',
            maxFileSizeMb: 5,
            allowedTypes: AssignmentType.CODE,
            createdAt: new Date('2024-01-02'),
            dueDate: new Date('2024-02-15'),
            maxScore: 50,
            active: true,
          },
        ],
        page: 1,
        size: 10,
        total: 2,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      });
      expect(result.success).toBe(true);
      expect(result.message).toBe('Assignments retrieved successfully');
    });
  });

  describe('getAssignmentById', () => {
    it('Should return assignment by id', async () => {
      const mockAssignment = {
        id_assignment: '1',
        lesson_id: 'lesson-1',
        title: 'Assignment 1',
        instructions: 'Complete the task',
        max_file_size_mb: 10,
        allowed_types: AssignmentType.PDF,
        created_at: new Date('2024-01-01'),
        due_date: new Date('2024-01-31'),
        max_score: 100,
        active: true,
      };

      prismaClient.assignments.findUniqueOrThrow.mockResolvedValue(mockAssignment);

      const result = await assignmentsLessonRepository.getAssignmentById('1');

      expect(result).toEqual({
        idAssignment: '1',
        lessonId: 'lesson-1',
        title: 'Assignment 1',
        instructions: 'Complete the task',
        maxFileSizeMb: 10,
        allowedTypes: AssignmentType.PDF,
        createdAt: new Date('2024-01-01'),
        dueDate: new Date('2024-01-31'),
        maxScore: 100,
        active: true,
      });
    });

    it('Should throw error when assignment not found', async () => {
      prismaClient.assignments.findUniqueOrThrow.mockRejectedValue(
        new Error('Assignment not found')
      );

      await expect(assignmentsLessonRepository.getAssignmentById('999')).rejects.toThrow(
        'Assignment not found'
      );
    });
  });

  describe('createAssignment', () => {
    it('Should create a new assignment', async () => {
      const assignmentIn = {
        lessonId: 'lesson-1',
        title: 'New Assignment',
        instructions: 'Complete the task',
        maxFileSizeMb: 10,
        allowedTypes: AssignmentType.PDF,
        dueDate: new Date('2024-01-31'),
        maxScore: 100,
      };

      const mockCreatedAssignment = {
        id_assignment: 'new-id',
        lesson_id: 'lesson-1',
        title: 'New Assignment',
        instructions: 'Complete the task',
        max_file_size_mb: 10,
        allowed_types: AssignmentType.PDF,
        created_at: new Date('2024-01-01'),
        due_date: new Date('2024-01-31'),
        max_score: 100,
        active: false,
      };

      prismaClient.assignments.create.mockResolvedValue(mockCreatedAssignment);

      const result = await assignmentsLessonRepository.createAssignment(assignmentIn);

      expect(result).toEqual({
        idAssignment: 'new-id',
        lessonId: 'lesson-1',
        title: 'New Assignment',
        instructions: 'Complete the task',
        maxFileSizeMb: 10,
        allowedTypes: AssignmentType.PDF,
        createdAt: new Date('2024-01-01'),
        dueDate: new Date('2024-01-31'),
        maxScore: 100,
        active: false,
      });
    });
  });

  describe('updateAssignment', () => {
    it('Should update an existing assignment', async () => {
      const assignmentUpdate: Partial<{
        lessonId: string;
        title: string;
        instructions: string;
        maxFileSizeMb: number;
        allowedTypes: AssignmentType;
        dueDate: Date;
        maxScore: number;
        active: boolean;
      }> = {
        lessonId: 'lesson-1',
        title: 'Updated Assignment',
        instructions: 'Updated instructions',
        maxFileSizeMb: 20,
        allowedTypes: AssignmentType.CODE,
        dueDate: new Date('2024-02-28'),
        maxScore: 150,
        active: true,
      };

      const mockUpdatedAssignment = {
        id_assignment: '1',
        lesson_id: 'lesson-1',
        title: 'Updated Assignment',
        instructions: 'Updated instructions',
        max_file_size_mb: 20,
        allowed_types: AssignmentType.CODE,
        created_at: new Date('2024-01-01'),
        due_date: new Date('2024-02-28'),
        max_score: 150,
        active: true,
      };

      prismaClient.assignments.update.mockResolvedValue(mockUpdatedAssignment);

      const result = await assignmentsLessonRepository.updateAssignment('1', assignmentUpdate);

      expect(result).toEqual({
        idAssignment: '1',
        lessonId: 'lesson-1',
        title: 'Updated Assignment',
        instructions: 'Updated instructions',
        maxFileSizeMb: 20,
        allowedTypes: AssignmentType.CODE,
        createdAt: new Date('2024-01-01'),
        dueDate: new Date('2024-02-28'),
        maxScore: 150,
        active: true,
      });
    });

    it('Should update only some fields of an assignment', async () => {
      const partialUpdate: Partial<{
        lessonId: string;
        title: string;
        instructions: string;
        maxFileSizeMb: number;
        allowedTypes: AssignmentType;
        dueDate: Date;
        maxScore: number;
        active: boolean;
      }> = {
        title: 'Partially Updated Title',
        maxScore: 200,
      };

      const mockUpdatedAssignment = {
        id_assignment: '1',
        lesson_id: 'lesson-1',
        title: 'Partially Updated Title',
        instructions: 'Original instructions',
        max_file_size_mb: 10,
        allowed_types: AssignmentType.PDF,
        created_at: new Date('2024-01-01'),
        due_date: new Date('2024-01-31'),
        max_score: 200,
        active: true,
      };

      prismaClient.assignments.update.mockResolvedValue(mockUpdatedAssignment);

      const result = await assignmentsLessonRepository.updateAssignment('1', partialUpdate);

      expect(result).toEqual({
        idAssignment: '1',
        lessonId: 'lesson-1',
        title: 'Partially Updated Title',
        instructions: 'Original instructions',
        maxFileSizeMb: 10,
        allowedTypes: AssignmentType.PDF,
        createdAt: new Date('2024-01-01'),
        dueDate: new Date('2024-01-31'),
        maxScore: 200,
        active: true,
      });
    });

    it('Should throw error when updating non-existent assignment', async () => {
      const assignmentUpdate: Partial<{
        lessonId: string;
        title: string;
        instructions: string;
        maxFileSizeMb: number;
        allowedTypes: AssignmentType;
        dueDate: Date;
        maxScore: number;
        active: boolean;
      }> = {
        lessonId: 'lesson-1',
        title: 'Updated Assignment',
        instructions: 'Updated instructions',
        maxFileSizeMb: 20,
        allowedTypes: AssignmentType.CODE,
        dueDate: new Date('2024-02-28'),
        maxScore: 150,
        active: true,
      };

      prismaClient.assignments.update.mockRejectedValue(new Error('Assignment not found'));

      await expect(
        assignmentsLessonRepository.updateAssignment('999', assignmentUpdate)
      ).rejects.toThrow('Assignment not found');
    });
  });

  describe('deleteAssignmentById', () => {
    it('Should delete assignment by id', async () => {
      prismaClient.assignments.delete.mockResolvedValue({
        id_assignment: '1',
        lesson_id: 'lesson-1',
        title: 'Assignment 1',
        instructions: 'Complete the task',
        max_file_size_mb: 10,
        allowed_types: AssignmentType.PDF,
        created_at: new Date('2024-01-01'),
        due_date: new Date('2024-01-31'),
        max_score: 100,
        active: true,
      });

      await assignmentsLessonRepository.deleteAssignmentById('1');

      expect(prismaClient.assignments.delete).toHaveBeenCalledWith({
        where: { id_assignment: '1' },
      });
    });

    it('Should throw error when deleting non-existent assignment', async () => {
      prismaClient.assignments.delete.mockRejectedValue(new Error('Assignment not found'));

      await expect(assignmentsLessonRepository.deleteAssignmentById('999')).rejects.toThrow(
        'Assignment not found'
      );
    });
  });
});
