import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  AUTH_SERVICE,
  USER_SERVICE_NAME,
  UpdateDto,
  UserServiceClient
 } from '@app/common';
// import { User } from '@app/prisma/models';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService implements OnModuleInit {
  private userService: UserServiceClient;
  constructor(@Inject(AUTH_SERVICE) private client: ClientGrpc) {}

  onModuleInit() {
    this.userService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }
  findAllUsers(){
    return this.userService.findAllUsers({});
  }

  findUser(id: string) {
    return this.userService.findUser({ id });
  }

  create(createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  update(updateUserDto: UpdateDto) {
    return this.userService.updateUser(updateUserDto);
  }

  remove(id: string) {
    return this.userService.removeUser({ id });
  }
}
