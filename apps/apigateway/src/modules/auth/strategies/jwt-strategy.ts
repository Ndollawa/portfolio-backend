import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey:
        configService.getOrThrow('ACCESS_TOKEN_SECRET') ||
        `${process.env.ACCESS_TOKEN_SECRET}`,
    });
  }

  private static extractJWTFromCookie(@Req() req: Request): string | null {
    if (req.cookies && req.cookies.jwt) {
      return req.cookies.jwt;
    }

    return null;
  }

  validate = async (payload: any) => {
    return { user: payload.sub };
  };
}
