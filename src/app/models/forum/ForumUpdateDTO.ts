import type { ForumInDTO } from './ForumInDTO.js';

export interface ForumUpdateDTO extends ForumInDTO {
  commentsCount: number;
}
