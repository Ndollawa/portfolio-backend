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
import { UserInterface } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getUsers(): Promise<UserInterface[]> {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserInterface> {
    return await this.userService.findUser(
      { _id: id },
      { _id: 1, password: 0, refreshToken: 0 },
    );
  }

  @Post()
  async createUser(
    @Body() createUserData: CreateUserDto,
  ): Promise<UserInterface> {
    return await this.userService.createUser(createUserData);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserData: UpdateUserDto,
  ): Promise<UserInterface> {
    return await this.userService.updateUser(id, updateUserData);
  }

  @Delete(':id')
  async deleteUsers(@Param('id') id: string): Promise<boolean> {
    return await this.userService.deleteUserById(id);
  }
}
