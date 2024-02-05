import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto,UpdateUserDto } from './dto';
import { User } from '@app/prisma/models';
import { Observable } from 'rxjs';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUsers() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.findUser(id);
  }

  @Post()
  createUser(@Body() createUserData: CreateUserDto) {
    return this.userService.create(createUserData);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updateUserData = { id, data:updateUserDto};
    return this.userService.update(updateUserData);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
