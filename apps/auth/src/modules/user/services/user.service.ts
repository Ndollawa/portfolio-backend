import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import * as grpc from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';
import { User } from '@prisma/client';
import {
  hashData,
  CreateUserDto,
  UpdateDto,
  FindOneDto,
  PaginationDto,
} from '@app/common';
import { UserRepository } from '../repositories/user.repository';
const { ALREADY_EXISTS, UNAUTHENTICATED } = grpc.status;

@Injectable()
export class UserService {
  constructor(
    protected readonly userRepository: UserRepository,
    protected readonly eventEmitter: EventEmitter2,
  ) {}
  async findUser(query: any): Promise<User> {
    try {
      return await this.userRepository.find({
        where: query,
        include: { profile: true, roles: true, refreshTokens: true },
      });
    } catch (error) {
      throw new RpcException({
        code: error.code,
        message: error.message ? error.message : error,
      });
    }
  }

  async findAllUsers(query: any): Promise<User[]> {
    try {
      return await this.userRepository.findMany(query);
    } catch (error) {
      throw new RpcException({
        code: error.code,
        message: error.message ? error.message : error,
      });
    }
  }

  async createUser(createUserData: CreateUserDto): Promise<User> {
    const { firstName, lastName, username, email, password, confirmPassword } =
      createUserData;

    if (password !== confirmPassword) {
      throw new RpcException({
        code: UNAUTHENTICATED,
        message: 'password mis-match',
      });
    }

    try {
      Logger.debug(
        (
          (await this.userRepository.findFirst({
            where: { OR: [{ email }, { username }] },
          })) as any
        ).count,
      );
      if (
        (
          (await this.userRepository.findFirst({
            where: { OR: [{ email }, { username }] },
          })) as any
        ).count > 0
      ) {
        throw new RpcException({
          code: ALREADY_EXISTS,
          message: 'User with credentials already exist.',
        });
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
        // refreshToken: {
        //   create: {
        //    refreshToken,
        //   },
        // },
        // registeredApp: {
        //   create: {
        //     authorized:true,
        //     connect:{
        //       app:{
        //         appId
        //       }
        //     }
        //   },
        // },
      };
      // delete userData.confirmPassword;

      const newUser = await this.userRepository.create({
        data: userData,
        //  include:{profile:true, roles:true, registeredApps:true}
      });
      delete newUser.password;
      this.eventEmitter.emit('user-created', newUser);
      return newUser;
    } catch (error) {
      Logger.log(error);
      throw new RpcException({
        code: error.code,
        message: error.message ? error.message : error,
      });
    }
  }

  async updateUser(updateUserData: UpdateDto<User>) {
    Logger.debug(updateUserData);
    try {
      const res = await this.userRepository.update({
        where: { id: updateUserData?.id },
        data: updateUserData?.data,
      });
      return res;
    } catch (error) {
      throw new RpcException({
        code: error.code,
        message: error.message ? error.message : error,
      });
    }
  }

  async upsertUser(updateUserData: UpdateDto<User>) {
    Logger.debug(updateUserData);
    try {
      const user = await this.userRepository.upsert({
        where: { id: updateUserData?.id },
        data: updateUserData?.data,
      });
      return user;
    } catch (error) {
      throw new RpcException({
        code: error.code,
        message: error.message ? error.message : error,
      });
    }
  }

  async removeUser(findUserDto: FindOneDto): Promise<User> {
    try {
      const removedUser = await this.userRepository.delete({
        where: { id: findUserDto.id },
      });
      return removedUser;
    } catch (error) {
      throw new RpcException({
        code: error.code,
        message: error.message ? error.message : error,
      });
    }
  }

  @OnEvent('user-created')
  sendVerificationEmail(payload: User) {
    console.log(payload);
  }
}
