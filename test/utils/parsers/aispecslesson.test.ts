import { describe, expect, it } from 'vitest';
import type { AISpecsLessonInDTO } from '../../../src/app/models/index.js';
import {
  aiSpecsLessonInDTOSchema,
  aiSpecsLessonUpdateDTOSchema,
} from '../../../src/utils/parsers/index.js';

describe('aiSpecsLessonInDTOSchema', () => {
  it('should accept valid data', () => {
    const result = aiSpecsLessonInDTOSchema().safeParse({
      lessonContentId: 'content-123',
      generationPromptSummary: 'Test prompt',
      contentStructure: { test: 'data' },
      estimatedVideoDurationMinutes: 10,
      videoScript: 'Script content',
      videoGenerationInstructions: { instructions: 'test' },
      interactiveElements: { elements: [] },
      exerciseParameters: { params: {} },
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: AISpecsLessonInDTO = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should reject invalid data', () => {
    const result = aiSpecsLessonInDTOSchema().safeParse({
      lessonContentId: '',
    });
    expect(result.success).toBe(false);
  });
});

describe('aiSpecsLessonUpdateDTOSchema', () => {
  it('should accept valid data with all fields', () => {
    const result = aiSpecsLessonUpdateDTOSchema().safeParse({
      lessonContentId: 'content-123',
      generationPromptSummary: 'Test prompt',
      contentStructure: { test: 'data' },
      estimatedVideoDurationMinutes: 10,
      videoScript: 'Script content',
      videoGenerationInstructions: { instructions: 'test' },
      interactiveElements: { elements: [] },
      exerciseParameters: { params: {} },
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeDefined();
    }
  });

  it('should accept partial data (some fields only)', () => {
    const result = aiSpecsLessonUpdateDTOSchema().safeParse({
      generationPromptSummary: 'Updated prompt',
      estimatedVideoDurationMinutes: 15,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.generationPromptSummary).toBe('Updated prompt');
      expect(result.data.estimatedVideoDurationMinutes).toBe(15);
    }
  });

  it('should accept empty object for partial updates', () => {
    const result = aiSpecsLessonUpdateDTOSchema().safeParse({});
    expect(result.success).toBe(true);
  });

  it('should reject invalid field values', () => {
    const result = aiSpecsLessonUpdateDTOSchema().safeParse({
      lessonContentId: '', // Empty string is invalid
    });
    expect(result.success).toBe(false);
  });
});
