import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import * as grpc from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';
import { RefreshToken } from '@prisma/client';
import {
  hashData,
  CreateRefreshTokenDto,
  UpdateDto,
  FindOneDto,
  PaginationDto,
} from '@app/common';
import { RefreshTokenRepository } from '../repositories/refreshToken.repository';

const { ALREADY_EXISTS, UNAUTHENTICATED } = grpc.status;

@Injectable()
export class RefreshTokenService {
  constructor(
    protected readonly refreshTokenRepository: RefreshTokenRepository,
    protected readonly eventEmitter: EventEmitter2,
  ) {}
  async findRefreshToken(query: any): Promise<RefreshToken> {
    try {
      return await this.refreshTokenRepository.find({
        where: query,
        include: { user: true },
      });
    } catch (error) {
      throw new RpcException({
        code: error.code,
        message: error.message ? error.message : error,
      });
    }
  }

  async findAllRefreshTokens(query: any): Promise<RefreshToken[]> {
    try {
      return await this.refreshTokenRepository.findMany(query);
    } catch (error) {
      throw new RpcException({
        code: error.code,
        message: error.message ? error.message : error,
      });
    }
  }

  async createRefreshToken(
    createRefreshTokenData: CreateRefreshTokenDto,
  ): Promise<RefreshToken> {
    const { userId, refreshToken } = createRefreshTokenData;

    try {
      if (
        (
          (await this.refreshTokenRepository.findFirst({
            where: { refreshToken },
          })) as any
        ).count > 0
      ) {
        throw new RpcException({
          code: ALREADY_EXISTS,
          message: 'RefreshToken with credentials already exist.',
        });
      }

      // const hashedRefreshToken = await hashData(refreshToken, 10);
      const RefreshTokenData = {
        refreshToken: refreshToken,
        user: {
          connect: {
            id: userId,
          },
        },
      };
      // delete RefreshTokenData.confirmPassword;

      const newRefreshToken = await this.refreshTokenRepository.create({
        data: RefreshTokenData,
      });
      this.eventEmitter.emit('RefreshToken-created', newRefreshToken);
      Logger.debug(newRefreshToken);
      return newRefreshToken;
    } catch (error) {
      Logger.log(error);
      throw new RpcException({
        code: error.code,
        message: error.message ? error.message : error,
      });
    }
  }

  async updateRefreshToken(updateRefreshTokenData: UpdateDto<RefreshToken>) {
    Logger.debug(updateRefreshTokenData);
    try {
      return await this.refreshTokenRepository.update({
        where: { id: updateRefreshTokenData?.id },
        data: updateRefreshTokenData?.data,
      });
    } catch (error) {
      throw new RpcException({
        code: error.code,
        message: error.message ? error.message : error,
      });
    }
  }

  async upsertRefreshToken(updateRefreshTokenData: UpdateDto<RefreshToken>) {
    Logger.debug(updateRefreshTokenData);
    try {
      return await this.refreshTokenRepository.upsert({
        where: { id: updateRefreshTokenData?.id },
        data: updateRefreshTokenData?.data,
      });
    } catch (error) {
      throw new RpcException({
        code: error.code,
        message: error.message ? error.message : error,
      });
    }
  }

  async removeRefreshToken(
    findRefreshTokenDto: FindOneDto,
  ): Promise<RefreshToken> {
    try {
      return await this.refreshTokenRepository.delete({
        where: { id: findRefreshTokenDto.id },
      });
    } catch (error) {
      throw new RpcException({
        code: error.code,
        message: error.message ? error.message : error,
      });
    }
  }

  async removeManyRefreshToken(
    findRefreshTokenDto: FindOneDto,
  ): Promise<RefreshToken[]> {
    try {
      return await this.refreshTokenRepository.deleteMany({
        where: { id: findRefreshTokenDto.id },
      });
    } catch (error) {
      throw new RpcException({
        code: error.code,
        message: error.message ? error.message : error,
      });
    }
  }

  @OnEvent('RefreshToken-created')
  sendVerificationEmail(payload: RefreshToken) {
    console.log(payload);
  }
}
