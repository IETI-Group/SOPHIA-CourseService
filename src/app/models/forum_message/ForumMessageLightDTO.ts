export interface ForumMessageLightDTO {
  idMessage: string;
  forumId: string;
  userId: string;
  content: string;
  createdAt: Date;
  parentMessageId: string | null;
}
