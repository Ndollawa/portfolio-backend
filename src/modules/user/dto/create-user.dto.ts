import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
  Max,
  Min,
} from 'class-validator';
import {
  EMAIL_REGEX,
  PWD_REGEX,
  USER_REGEX,
} from '@/common/utils/constants/auth.constants';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  // @Min(3)
  // @Max(100)
  @Matches(USER_REGEX, {
    message: `Invalid Username. Ensure that these requirements are met:\n
            Must be at least 3  characters. (and up to 100 characters)\n
            Must begin with  a letter\n`,
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Matches(EMAIL_REGEX, {
    message: `Invalid email address. Ensure that these requirements are met:\n
                At least 10 characters (and up to 100 characters)\n
                Must begin with letter followed by @ and a provider. eg. youremail@provider.com\n
                Mustnend with a domain\n`,
  })
  email: string;

  @IsNotEmpty()
  // @Min(8)
  // @Max(24)
  @Matches(PWD_REGEX, {
    message: `Weak Password. Ensure that these requirements are met:\n
             At least 8 characters (and up to 24 characters)\n
            Must include uppercase and lowercase letters\n
            Must include at least one special character, e.g.,- % $ ! @ # ?\n`,
  })
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  // @Min(8)
  // @Max(24)
  @Matches(PWD_REGEX, {
    message: `Weak Password. Ensure that these requirements are met:\n
             At least 8 characters (and up to 24 characters)\n
            Must include uppercase and lowercase letters\n
            Must include at least one special character, e.g.,- % $ ! @ # ?\n`,
  })
  confirmPassword: string;
}
