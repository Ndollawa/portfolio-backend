import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
// import {  } from '@prisma/client';
import { RegisterUserDto, LoginUserDto } from './dto';
import { UserService } from '../user/user.service';
import {
  User,
  AUTH_SERVICE,
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  CreateRefreshTokenDto,
  RefreshTokenQueryDto,
  Tokens,
  RefreshToken,
} from '@app/common';

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: AuthServiceClient;
  constructor(@Inject(AUTH_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  async register(userData: RegisterUserDto) {
    return lastValueFrom(await this.authService.register(userData));
  }

  async validateUser(userCredentials: LoginUserDto) {
    return await lastValueFrom(
      await this.authService.validateUser(userCredentials),
    );
  }

  async login(userCredentials: User): Promise<Tokens> {
    return await lastValueFrom(await this.authService.login(userCredentials));
  }

  // async logOut() {}
  // async refreshToken() {}

  async verifyToken(refreshTokenQueryDto: RefreshTokenQueryDto) {
    return lastValueFrom(
      await this.authService.verifyToken(refreshTokenQueryDto),
    );
  }

  async saveUserRefreshToken(createRefreshTokenData: CreateRefreshTokenDto) {
    return lastValueFrom(
      await this.authService.saveUserRefreshToken(createRefreshTokenData),
    );
  }

  async refreshUserToken(user: User): Promise<Tokens> {
    return lastValueFrom(await this.authService.refreshUserToken(user));
  }

  async findRefreshToken(refreshTokenQueryDto: RefreshTokenQueryDto) {
    return lastValueFrom(
      await this.authService.findRefreshToken(refreshTokenQueryDto),
    );
  }

  async removeRefreshToken(
    refreshTokenQueryDto: RefreshTokenQueryDto,
  ): Promise<RefreshToken> {
    return lastValueFrom(
      await this.authService.removeRefreshToken(refreshTokenQueryDto),
    );
  }

  async removeManyRefreshToken(refreshTokenQueryDto: RefreshTokenQueryDto) {
    return await this.authService.removeManyRefreshToken(refreshTokenQueryDto);
  }
}
