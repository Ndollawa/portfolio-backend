import {
  Injectable,
  Logger,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { User, hashData, CreateUserDto, UpdateDto, FindOneDto, PaginationDto } from '@app/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    protected readonly userRepository: UserRepository
  ) {}

  async findUser(query: any): Promise<User> {
    try {
      return await this.userRepository.find(
        { where: { id: query.id }, include: { profile: true, roles: true, refreshTokens: true } },
      );
    } catch (error) {
      throw new RpcException({  code: error.code, message: error.message? error.message : error });
    }
  }

  async findAllUsers(query: any): Promise<User[]> {
    try {
      return await this.userRepository.findMany(query);
    } catch (error) {
      throw new RpcException({  code: error.code, message: error.message? error.message : error });
    }
  }

  async createUser(createUserData: CreateUserDto): Promise<User> {
    const {firstName, lastName, username, email, password, confirmPassword } = createUserData;

    if (password !== confirmPassword) {
      throw new RpcException({ code: 3, message: 'password mis-match' });
    }

    try {
      
Logger.debug((await this.userRepository.findFirst({where: {OR: [{ email},{username}]}}) as any).count)
      if ((await this.userRepository.findFirst({where: {OR: [{ email},{username}]}}) as any).count) {
        throw new RpcException({ code: 4, message: 'User with credentials already exist.' });
      }

      const hashedPassword = await hashData(password, 10);
      const userData = {
        username,
        email,
        password: hashedPassword,
        verificationStatus: false,
        roles: {
          create: {
            role: 'user',
            code: '3000',
          },
        },
        profile: {
          create: {
            firstName,
            lastName,
          },
        },
      };
      // delete userData.confirmPassword;

     const  newUser = this.userRepository.create({ data: userData });
     Logger.debug(newUser)
      return newUser
    } catch (error) {
      Logger.log(error)
      throw new RpcException({ code: error.code, message: error.message? error.message : error });
    }
  }

  async updateUser(updateUserData: UpdateDto) {
    Logger.debug(updateUserData)
    try {
      return await this.userRepository.update({
        where: { id: updateUserData?.id },
        data: updateUserData?.data,
      });
    } catch (error) {
      throw new RpcException({  code: error.code, message: error.message? error.message : error });
    }
  }

  async removeUser(findUserDto: FindOneDto): Promise<User> {
    try {
      return await this.userRepository.delete({ where: { id: findUserDto.id } });
    } catch (error) {
      throw new RpcException({  code: error.code, message: error.message? error.message : error });
    }
  }
}
