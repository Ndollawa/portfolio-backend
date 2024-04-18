import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
// import {} from "@prisma/client";
import {
  AUTH_SERVICE,
  USER_SERVICE_NAME,
  UpdateDto,
  User,
  UserServiceClient
 } from '@app/common';
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

  update(updateUserDto: UpdateDto<User>) {
    return this.userService.updateUser(updateUserDto);
  }

  remove(id: string) {
    return this.userService.removeUser({ id });
  }
}
