import { Module } from '@nestjs/common';
import { RequestService } from '@app/common';
import {PrismaModule } from '@app/prisma';
import {UserRepository} from "./user.repository"
import {UserService} from "./user.service"
import {UserController} from "./user.controller"

@Module({
  controllers: [UserController],
  imports:[PrismaModule],
  providers: [UserRepository, UserService, RequestService],
  exports: [UserService],
})
export class UserModule {}
