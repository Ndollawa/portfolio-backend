import {
  BadRequestException,
  ConflictException,
  Injectable,
  Req,
  Res,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';
import { Request, Response } from 'express';
import { UserInterface } from 'src/user/interfaces/user.interface';

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

  async saveRefreshToken(token: string[]): Promise<void> {
    await this.userService.saveUserRefreshToken(token);
  }

  async findUser(filter: any): Promise<UserInterface> {
    return await this.userService.findUser(filter);
  }
}
