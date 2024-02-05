import { Injectable, Req, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy,'refresh-jwt') {
    constructor(private readonly configService:ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors[
                RefreshJwtStrategy.extractJWTFromCookie,
                 ExtractJwt.fromAuthHeaderAsBearerToken()],
            ignoreExpiration:false,
            secretOrKey:configService.getOrThrow('ACCESS_TOKEN_SECRET') || `${process.env.ACCESS_TOKEN_SECRET}`,
        });
    }

    

    private static extractJWTFromCookie(@Req() req:any):string | null {
        if (req.cookies && req.cookies.jwt) {
            return req.cookies.jwt;
        }

        return null
    }
    validate = async (payload:any) => {
        return {user:payload.sub};
    }
}