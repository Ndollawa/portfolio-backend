import { IsNotEmpty, IsString, Matches, Min } from 'class-validator';
import {
  EMAIL_REGEX,
  USER_REGEX,
} from '@app/common';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @Matches(USER_REGEX)
  user: string;

  @IsNotEmpty()
  @IsNotEmpty()
  @IsString()
  password: string;
}