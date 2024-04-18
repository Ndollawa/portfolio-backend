import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';
import {
  CreateUserDto,
  UpdateDto,
  FindOneDto,
  Empty,
  User,
  Users,
  UserServiceController,
  UserServiceControllerMethods,
  transformTimestampToDate,
  transformDateToTimestamp,
} from '@app/common';
// import {User} from "@app/prisma"

@Controller()
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(private readonly userService: UserService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.createUser(createUserDto);
    return transformDateToTimestamp(user);
  }

  async findAllUsers(): Promise<Users> {
    const users = await this.userService.findAllUsers({
      where: {},
      include: { profile: true, roles: true },
    });
    const transformedData = users.map((user) => transformDateToTimestamp(user));
    return { users: transformedData };
  }

  async findUser(findUserDto: FindOneDto): Promise<User> {
    return transformDateToTimestamp(
      await this.userService.findUser(findUserDto),
    );
  }

  async updateUser(updateUserDto: UpdateDto<User>): Promise<User> {
    return transformDateToTimestamp(
      await this.userService.updateUser(updateUserDto),
    );
  }

  async removeUser(findUserDto: FindOneDto): Promise<User> {
    return transformDateToTimestamp(
      await this.userService.removeUser(findUserDto),
    );
  }

  // queryUsers(paginationDtoStream: PaginationDto):Promise<any> | Observable<any> {
  //   // return this.userService.queryUser(paginationDtoStream);
  //   return null
  // }
}
