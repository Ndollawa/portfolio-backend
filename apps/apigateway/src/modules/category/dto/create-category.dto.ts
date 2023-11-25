import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  type: string;

  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  status: string;
}
