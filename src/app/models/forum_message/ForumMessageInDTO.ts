export interface ForumMessageInDTO {
  forumId: string;
  userId: string;
  content: string;
  parentMessageId: string | null;
}
