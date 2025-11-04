import type { DISCRIMINANT_RESOURCE, RESOURCE_TYPE } from '../../../utils/index.js';

export interface ResourcesOutLightDTO {
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
