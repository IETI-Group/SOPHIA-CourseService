import { DiscriminantResource, ResourceType } from '@prisma/client';
import { describe, expect, it } from 'vitest';
import type { ResourcesInDTO } from '../../../src/app/models/index.js';
import { resourcesInDTOSchema } from '../../../src/utils/parsers/index.js';

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
