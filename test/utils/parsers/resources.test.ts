import { DiscriminantResource, ResourceType } from '@prisma/client';
import { describe, expect, it } from 'vitest';
import type { ResourcesInDTO } from '../../../src/app/models/index.js';
import {
  resourcesInDTOSchema,
  resourcesUpdateDTOSchema,
} from '../../../src/utils/parsers/index.js';

describe('resourcesInDTOSchema', () => {
  it('should accept valid data', () => {
    const result = resourcesInDTOSchema().safeParse({
      entityReference: 'entity-123',
      discriminant: DiscriminantResource.LESSON,
      name: 'Resource 1',
      type: ResourceType.VIDEO,
      url: 'https://example.com/video.mp4',
      content: 'Content text',
      order: 1,
      durationSeconds: 300,
      fileSizeMb: 50,
      mimeType: 'video/mp4',
      thumnailUrl: 'https://example.com/thumb.jpg',
      metadata: { data: 'test' },
    });
    expect(result.success).toBe(true);
    if (result.success) {
      const data: ResourcesInDTO = result.data;
      expect(data).toBeDefined();
    }
  });

  it('should reject invalid data', () => {
    const result = resourcesInDTOSchema().safeParse({
      entityReference: '',
    });
    expect(result.success).toBe(false);
  });
});

describe('resourcesUpdateDTOSchema', () => {
  it('should accept valid data with all fields', () => {
    const result = resourcesUpdateDTOSchema().safeParse({
      entityReference: 'entity-123',
      discriminant: DiscriminantResource.LESSON,
      name: 'Resource 1',
      type: ResourceType.VIDEO,
      url: 'https://example.com/video.mp4',
      content: 'Content text',
      order: 1,
      durationSeconds: 300,
      fileSizeMb: 50,
      mimeType: 'video/mp4',
      thumnailUrl: 'https://example.com/thumb.jpg',
      metadata: { data: 'test' },
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toBeDefined();
    }
  });

  it('should accept partial data (some fields only)', () => {
    const result = resourcesUpdateDTOSchema().safeParse({
      name: 'Updated Resource Name',
      order: 5,
      durationSeconds: 450,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('Updated Resource Name');
      expect(result.data.order).toBe(5);
      expect(result.data.durationSeconds).toBe(450);
    }
  });

  it('should accept empty object for partial updates', () => {
    const result = resourcesUpdateDTOSchema().safeParse({});
    expect(result.success).toBe(true);
  });

  it('should reject invalid field values', () => {
    const result = resourcesUpdateDTOSchema().safeParse({
      name: '', // Empty string is invalid
    });
    expect(result.success).toBe(false);
  });
});
