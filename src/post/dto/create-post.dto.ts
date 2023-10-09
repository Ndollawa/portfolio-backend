import { IsNotEmpty, IsString, IsArray, IsEnum } from 'class-validator';
import { PostStatusEnum } from '../interfaces/post.interface';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  body: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  image: string;
  @IsNotEmpty()
  @IsArray()
  tags: string[];
  @IsNotEmpty()
  @IsString()
  category: string;
  @IsNotEmpty()
  @IsString()
  @IsEnum(PostStatusEnum)
  status: string;
}
