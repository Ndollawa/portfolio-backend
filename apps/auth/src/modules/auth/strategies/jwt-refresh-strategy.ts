import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy } from 'passport-jwt';
import { grpc } from 'google-protobuf';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy,'jwt-refresh') {
    constructor(private readonly configService:ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                // JwtRefreshStrategy.extractJWTFromCookie,
                (request) => {
          return request.cookies['jwt']; // Replace with your actual cookie name
        },
                 ExtractJwt.fromAuthHeaderAsBearerToken()]),
            ignoreExpiration:false,
            secretOrKey:configService.getOrThrow('ACCESS_TOKEN_SECRET') || `${process.env.ACCESS_TOKEN_SECRET}`,
        });
    }




    async canActivate(context: grpc.ServerUnaryCall<any, any>): Promise<boolean> {
        const metadata = context.metadata;

        if (!metadata) {
            throw new UnauthorizedException();
        }

        const token = this.extractTokenFromMetadata(metadata);

        if (!token) {
            throw new UnauthorizedException();
        }

        // Add additional validation if needed

        return true;
    }

      private extractTokenFromMetadata(metadata: grpc.Metadata): string | null {
    // No need to extract token from metadata when using cookies
    return null;
      }
    
    // private static extractJWTFromCookie(req:Request):string | null {
    //     if (req.cookies && req.cookies.jwt) {
    //         return req.cookies.jwt;
    //     }

    //     return null
    // }
    validate = async (payload:any) => {
        return {user:payload.sub};
    }
}