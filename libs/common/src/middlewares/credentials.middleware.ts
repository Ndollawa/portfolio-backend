import { Request, Response, NextFunction } from 'express';
import allowedOrigins from '../config/allowedOrigins';

export function CredentialsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin as string)) {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
}
