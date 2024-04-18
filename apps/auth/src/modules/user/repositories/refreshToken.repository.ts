import { Injectable } from '@nestjs/common';
import {Prisma, RefreshToken } from "@prisma/client";
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';




@Injectable()
export class RefreshTokenRepository extends PrismaBaseRepository<
RefreshToken,
Prisma.RefreshTokenCreateArgs | Prisma.RefreshTokenCreateManyArgs | Prisma.RefreshTokenCreateInput | Prisma.RefreshTokenCreateManyInput | Prisma.RefreshTokenUncheckedCreateInput,
Prisma.RefreshTokenFindUniqueArgs | Prisma.RefreshTokenFindManyArgs | Prisma.RefreshTokenFindUniqueOrThrowArgs | Prisma.RefreshTokenFindFirstArgs | Prisma.RefreshTokenFindFirstOrThrowArgs | Prisma.RefreshTokenAggregateArgs | Prisma.RefreshTokenGroupByArgs | Prisma.RefreshTokenCountArgs,
Prisma.RefreshTokenUpdateArgs | Prisma.RefreshTokenUpdateManyArgs | Prisma.RefreshTokenUpsertArgs,
Prisma.RefreshTokenDeleteArgs | Prisma.RefreshTokenDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.refreshToken)
  }
 


  // Additional methods specific to the RefreshToken entity can be added here
 
}
