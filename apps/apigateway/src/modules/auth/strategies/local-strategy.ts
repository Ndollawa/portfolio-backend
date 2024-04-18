import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginUserDto } from '../dto';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private readonly authService: AuthService) {
    super();
  }

  validate = async (username: string, password: string) => {
    const foundUser = await this.authService.validateUser({
      username,
      password,
    });
    Logger.debug(foundUser);
    if (!foundUser) {
      throw new UnauthorizedException('Invalid credentials.');
    }
    return foundUser;
  };
}
