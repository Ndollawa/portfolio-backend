import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import {
  CreateUserDto,
  UpdateDto,
  FindOneDto,
  Empty,
  User,
  Users,
  UserServiceController,
  UserServiceControllerMethods,
} from '@app/common';
// import {User} from "@app/prisma"

@Controller()
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(private readonly userService: UserService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }

  async findAllUsers(): Promise<Users> {
    return { users: await this.userService.findAllUsers({where:{},include:{profile:true,roles:true}}) };
  }

  async findUser(findUserDto: FindOneDto): Promise<User> {
    return await this.userService.findUser(findUserDto);
  }

  async updateUser(updateUserDto: UpdateDto): Promise<User> {
    console.log(updateUserDto.data)
    return await this.userService.updateUser(updateUserDto);
  }

 async removeUser(findUserDto: FindOneDto): Promise<User> {
    return await this.userService.removeUser(findUserDto);
  }
  // queryUsers(paginationDtoStream: PaginationDto):Promise<any> | Observable<any> {
  //   // return this.userService.queryUser(paginationDtoStream);
  //   return null
  // }
}
