import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import UserSchema from './schemas/user.schema';
import { UserRepository } from './user.repository';
import { RequestService } from '@/modules/request.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, UserRepository, RequestService],
  exports: [UserService, UserRepository],
})
export class UserModule {}
