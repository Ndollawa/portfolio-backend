import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  title: string;
  author: string;
  description: string;
  body: string;
  tags: string[];
  //   attachment: {
  //     attachmentType: string;
  //     attachment: string;
  //   }[];
  coverImage: string;
  category: string;
  status: string;
}
