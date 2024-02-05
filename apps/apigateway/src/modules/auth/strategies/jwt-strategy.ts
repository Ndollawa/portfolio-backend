import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
    constructor(
    private readonly configService:ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:configService.getOrThrow('ACCESS_TOKEN_SECRET') || `${process.env.ACCESS_TOKEN_SECRET}`,
        });
    }

    validate = async (payload:any) => {
        return {user:payload.sub};
    }
}