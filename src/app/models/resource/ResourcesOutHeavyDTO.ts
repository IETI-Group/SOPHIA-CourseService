import type { Json } from '../../../utils/index.js';
import type { ResourcesOutLightDTO } from './ResourcesOutLightDTO.js';

export interface ResourcesOutHeavyDTO extends ResourcesOutLightDTO {
  mimeType: string | null;
  thumnailUrl: string | null;
  metadata: Json;
}
