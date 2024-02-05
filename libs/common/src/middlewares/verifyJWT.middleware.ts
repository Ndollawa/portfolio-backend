import {
  NestMiddleware,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { RequestService } from '@app/common';

@Injectable()
export class VerifyJwt implements NestMiddleware {
  constructor(private readonly requestService: RequestService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader =
      (req.headers.authorization as string) ||
      (req.headers.Authorization as string);
    // console.log(req.headers.authorization)
    if (!authHeader?.startsWith('Bearer '))
      throw new UnauthorizedException('Unauthorized Access');
    const token = authHeader.split(' ')[1];
    jwt.verify(
      token,
      `${process.env.ACCESS_TOKEN_SECRET}`,
      (err: any, { user }: any) => {
        if (err) throw new ForbiddenException('Access Forbidden'); // invalid token
        // req.user = user;
        this.requestService.setUser(user);
        next();
      },
    );
  }
}
