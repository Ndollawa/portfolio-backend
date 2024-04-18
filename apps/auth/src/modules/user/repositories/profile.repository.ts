import { Injectable } from '@nestjs/common';
import {Prisma, Profile } from "@prisma/client";
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';




@Injectable()
export class ProfileRepository extends PrismaBaseRepository<
Profile,
Prisma.ProfileCreateArgs | Prisma.ProfileCreateManyArgs | Prisma.ProfileCreateInput | Prisma.ProfileCreateManyInput | Prisma.ProfileUncheckedCreateInput,
Prisma.ProfileFindUniqueArgs | Prisma.ProfileFindManyArgs | Prisma.ProfileFindUniqueOrThrowArgs | Prisma.ProfileFindFirstArgs | Prisma.ProfileFindFirstOrThrowArgs | Prisma.ProfileAggregateArgs | Prisma.ProfileGroupByArgs | Prisma.ProfileCountArgs,
Prisma.ProfileUpdateArgs | Prisma.ProfileUpdateManyArgs | Prisma.ProfileUpsertArgs | Prisma.ProfileUncheckedUpdateInput | Prisma.ProfileUncheckedUpdateManyInput,
Prisma.ProfileDeleteArgs | Prisma.ProfileDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.profile)
  }
 


  // Additional methods specific to the Profile entity can be added here
 
}
