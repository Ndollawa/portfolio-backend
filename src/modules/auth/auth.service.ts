import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from '@/modules/user/user.service';
import { UserInterface } from '@/modules/user/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(protected readonly userService: UserService) {}
  async register(userData: RegisterUserDto) {
    return await this.userService.createUser(userData);
  }
  async login(userCredentials: LoginUserDto) {
    return await this.userService.authenticateUser(userCredentials);
  }

  // async logOut() {}
  // async refreshToken() {}

  async saveRefreshToken(user: UserInterface, token: string[]): Promise<void> {
    await this.userService.saveUserRefreshToken(user, token);
  }

  async findUser(filter: any): Promise<UserInterface> {
    return await this.userService.findUser(filter);
  }
}
