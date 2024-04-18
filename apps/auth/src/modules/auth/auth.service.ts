import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  EMAIL_REGEX,
  RegisterUserDto,
  LoginUserDto,
  Tokens,
  RefreshTokenQueryDto,
  CreateRefreshTokenDto,
  RequestService,
  User,
  transformDateToTimestamp,
  compareHashData,
} from '@app/common';
import { UserService, RefreshTokenService } from '../user';
import { RefreshToken } from '@prisma/client';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    protected readonly refreshTokenService: RefreshTokenService,
    private readonly jwtService: JwtService,
  ) {}

  validateUser = async ({ username, password }: LoginUserDto) => {
    const userType = EMAIL_REGEX.test(username);
    const userQuery = userType ? { email: username } : { username };
    const foundUser = await this.userService.findUser(userQuery);
    // this.logger.debug(foundUser);
    if (foundUser && (await compareHashData(password, foundUser?.password))) {
      const { password, ...user } = foundUser;
      return transformDateToTimestamp(user);
    }
    return null;
  };

  verifyToken = async (refreshTokenQueryDto: RefreshTokenQueryDto) => {
    const { refreshToken } = refreshTokenQueryDto;
    return await this.jwtService.verifyAsync(refreshToken);
  };

  login = async (user: User): Promise<Tokens> => {
    const { accessToken, refreshToken } = await this._generateTokens(user);
    await this.refreshTokenService.createRefreshToken({
      userId: user.id,
      refreshToken,
    });
    return { accessToken, refreshToken };
  };

  register = async (registerUserDto: RegisterUserDto) => {
    return await this.userService.createUser(registerUserDto);
  };

  saveUserRefreshToken = async (
    createRefreshTokenData: CreateRefreshTokenDto,
  ) => {
    return await this.refreshTokenService.createRefreshToken(
      createRefreshTokenData,
    );
  };

  refreshUserToken = async (user: User): Promise<Tokens> => {
    const { accessToken, refreshToken } = await this._generateTokens(user);
    return { accessToken, refreshToken };
  };

  logout = async (user: User) => {};

  findRefreshToken = async (
    refreshTokenQueryDto: RefreshTokenQueryDto,
  ): Promise<RefreshToken> => {
    return await this.refreshTokenService.findRefreshToken(
      refreshTokenQueryDto,
    );
  };

  removeRefreshToken = async (
    refreshTokenQueryDto: RefreshTokenQueryDto,
  ): Promise<RefreshToken> => {
    return await this.refreshTokenService.removeRefreshToken(
      refreshTokenQueryDto,
    );
  };

  removeManyRefreshToken = async (
    refreshTokenQueryDto: RefreshTokenQueryDto,
  ): Promise<RefreshToken[]> => {
    return await this.refreshTokenService.removeManyRefreshToken(
      refreshTokenQueryDto,
    );
  };

  protected async _generateTokens(user: User): Promise<Tokens> {
    const roles = Object.values(user.roles! || {}).filter(Boolean);
    const payload = {
      user: user.email,
      sub: {
        ...user,
        roles,
      },
    };
    const accessToken = this.jwtService.sign(payload);
    const newRefreshToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
      secret: this.configService.getOrThrow('REFRESH_TOKEN_SECRET'),
    });
    return { accessToken, refreshToken: newRefreshToken };
  }
}
