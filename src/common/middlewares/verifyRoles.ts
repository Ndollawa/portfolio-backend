import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class VerifyRoles implements NestMiddleware {
  // constructor() {

  // }

  use(...allowedRoles: [number] | number[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      //  const roles = req.roles;
      //     if(roles === null || roles === undefined) return res.status(401).json({message:'Unautherized access'});
      //     const rolesArray = [...allowedRoles];
      //   const  result = roles.map((role:number) => rolesArray.includes(role)).find((val:boolean) => val === true);
      //     if(!result) return res.sendStatus(401);
      next();
    };
  }
}
