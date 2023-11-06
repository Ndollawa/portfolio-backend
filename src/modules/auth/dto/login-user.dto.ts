import { IsNotEmpty, IsString, Matches, Min } from 'class-validator';
import {
  EMAIL_REGEX,
  USER_REGEX,
} from '@/common/utils/constants/auth.constants';

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
//  @Matches(EMAIL_REGEX) ||
