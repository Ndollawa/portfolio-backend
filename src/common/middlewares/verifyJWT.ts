import { NestMiddleware, Injectable } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// require('dotenv').config();

@Injectable()
export class VerifyJwt implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader =
      req.headers.authorization || (req.headers.Authorization as any);
    // console.log(req.headers.authorization)
    if (!authHeader?.startsWith('Bearer '))
      return res.status(401).json({ message: 'Unauthorized Access' });
    const token = authHeader.split(' ')[1];
    jwt.verify(
      token,
      `${process.env.ACCESS_TOKEN_SECRET}`,
      (err: any, options: any) => {
        if (err) return res.status(403).json({ message: 'Access Forbidden' }); // invalid token

        // req.user = options?.userInfo?.user;
        // req.username = options?.userInfo?.username;
        // req.email = options?.userInfo?.email;
        // req.roles = options?.userInfo?.roles;
        next();
      },
    );
  }
}
