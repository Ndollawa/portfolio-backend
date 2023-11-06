export class CreateSettingsDto {
  title: string;
  author: string;
  description: string;
  body: string;
  tags: string[];
  attachment: {
    attachmentType: string;
    attachment: string;
  }[];
  coverImage: string;
  category: string;
  status: string;
}
