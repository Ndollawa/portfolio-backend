import { Injectable } from '@nestjs/common';
import {Prisma, User as UserModel } from "@prisma/client";
import { User } from '@app/common';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';




@Injectable()
export class UserRepository extends PrismaBaseRepository<
User,
Prisma.UserCreateArgs | Prisma.UserCreateManyArgs | Prisma.UserCreateInput | Prisma.UserCreateManyInput | Prisma.UserUncheckedCreateInput,
Prisma.UserFindUniqueArgs | Prisma.UserFindManyArgs | Prisma.UserFindUniqueOrThrowArgs | Prisma.UserFindFirstArgs | Prisma.UserFindFirstOrThrowArgs | Prisma.UserAggregateArgs | Prisma.UserGroupByArgs | Prisma.UserCountArgs,
Prisma.UserUpdateArgs | Prisma.UserUpdateManyArgs | Prisma.UserUpsertArgs,
Prisma.UserDeleteArgs | Prisma.UserDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.user)
  }
 


  // Additional methods specific to the User entity can be added here
 
}
