import type { DISCRIMINANT_RESOURCE, Json, RESOURCE_TYPE } from '../../../utils/index.js';

export interface ResourcesInDTO {
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
