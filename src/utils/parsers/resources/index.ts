import { DiscriminantResource, ResourceType } from '@prisma/client';
import { z } from 'zod';

export const resourcesInDTOSchema = () => {
  return z.object({
    entityReference: z.string().min(1).max(200),
    discriminant: z.enum(DiscriminantResource),
    name: z.string().min(1).max(500),
    type: z.enum(ResourceType),
    url: z.string().min(1).max(2000).nullable().or(z.literal(null)),
    content: z.string().min(1).max(10000).nullable().or(z.literal(null)),
    order: z.coerce.number().min(0),
    durationSeconds: z.coerce.number().min(0),
    fileSizeMb: z.coerce.number().min(0),
    mimeType: z.string().min(1).max(200).nullable().or(z.literal(null)),
    thumnailUrl: z.string().min(1).max(2000).nullable().or(z.literal(null)),
    metadata: z.any(),
  });
};

export const resourcesUpdateDTOSchema = () => {
  return resourcesInDTOSchema().partial();
};
