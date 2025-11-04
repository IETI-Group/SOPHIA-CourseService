import { describe, expect, it } from 'vitest';
import type { AISpecsLessonInDTO } from '../../../src/app/models/index.js';
import { aiSpecsLessonInDTOSchema } from '../../../src/utils/parsers/index.js';

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
