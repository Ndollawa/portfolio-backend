import { Injectable } from '@nestjs/common';
import {Prisma, Mailer as MailerModel } from "@prisma/client";
import { Mailer } from '@app/common';
import { PrismaService } from '@app/prisma';
import { PrismaBaseRepository } from '@app/common/database/base-repository';




@Injectable()
export class MailerRepository extends PrismaBaseRepository<
Mailer,
Prisma.MailerCreateArgs | Prisma.MailerCreateManyArgs | Prisma.MailerCreateInput | Prisma.MailerCreateManyInput | Prisma.MailerUncheckedCreateInput,
Prisma.MailerFindUniqueArgs | Prisma.MailerFindManyArgs | Prisma.MailerFindUniqueOrThrowArgs | Prisma.MailerFindFirstArgs | Prisma.MailerFindFirstOrThrowArgs | Prisma.MailerAggregateArgs | Prisma.MailerGroupByArgs | Prisma.MailerCountArgs,
Prisma.MailerUpdateArgs | Prisma.MailerUpdateManyArgs | Prisma.MailerUpsertArgs,
Prisma.MailerDeleteArgs | Prisma.MailerDeleteManyArgs
> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService.Mailer)
  }
 


  // Additional methods specific to the Mailer entity can be added here
 
}
