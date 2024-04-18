import { Controller, UseGuards, Logger } from '@nestjs/common';
import * as grpc from '@grpc/grpc-js';
import {
  CreateUserDto,
  User,
  Empty,
  RefreshToken,
  RefreshTokens,
  CreateRefreshTokenDto,
  RefreshTokenQueryDto,
  AuthServiceControllerMethods,
  AuthServiceController,
  LoginUserDto,
  RegisterUserDto,
  Tokens,
  transformDateToTimestamp,
} from '@app/common';
import { Observable } from 'rxjs';
// import { GrpcLocalAuthGuard } from './guards';
import { AuthService } from './auth.service';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards(GrpcLocalAuthGuard)
  async validateUser(loginUserDto: LoginUserDto) {
    return await this.authService.validateUser(loginUserDto);
  }

  // @UseGuards(GrpcLocalAuthGuard), meta:any,call:any
  async login(user: User): Promise<Tokens> {
    // const {meta} = grpc
    // Logger.debug(new grpc.Metadata());
    const token = await this.authService.login(user);
    return token;
  }

  async register(registerUserDto: RegisterUserDto) {
    Logger.debug('user-reg');
    let user = await this.authService.register(registerUserDto);
    return transformDateToTimestamp(user);
  }

  async refreshUserToken(user: User) {
    return await this.authService.refreshUserToken(user);
  }

  logout(user: any = 'you'): any {
    // let user: User;
    // this.authService.logout(id);
    return user;
  }
  async verifyToken(refreshTokenQueryDto: RefreshTokenQueryDto) {
    const result = await this.authService.verifyToken(refreshTokenQueryDto);
    Logger.debug('verified', result);
    return result;
  }

  async findRefreshToken(
    refreshTokenQueryDto: RefreshTokenQueryDto,
  ): Promise<RefreshToken> {
    return transformDateToTimestamp(
      await this.authService.findRefreshToken(refreshTokenQueryDto),
    );
  }

  async saveUserRefreshToken(
    createRefreshTokenData: CreateRefreshTokenDto,
  ): Promise<RefreshToken> {
    return transformDateToTimestamp(
      await this.authService.findRefreshToken(createRefreshTokenData),
    );
  }

  async removeRefreshToken(
    refreshTokenQueryDto: RefreshTokenQueryDto,
  ): Promise<RefreshToken> {
    return transformDateToTimestamp(
      await this.authService.removeRefreshToken(refreshTokenQueryDto),
    );
  }

  async removeManyRefreshToken(
    refreshTokenQueryDto: RefreshTokenQueryDto,
  ): Promise<RefreshTokens> {
    const deletedTokens = await this.authService.removeManyRefreshToken(
      refreshTokenQueryDto,
    );
    const transformedData = deletedTokens.map((token) =>
      transformDateToTimestamp(token),
    );
    return { refreshTokens: transformedData };
  }
}
