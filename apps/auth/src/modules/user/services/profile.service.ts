import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import * as grpc from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';
import {
  hashData,
  CreateProfileDto,
  UpdateDto,
  FindOneDto,
  PaginationDto,
  ProfileEnum_ProfileStatus,
  transformDateToTimestamp,
} from '@app/common';

import { ProfileStatus, Profile } from '@prisma/client';
import { ProfileRepository } from '../repositories/profile.repository';
const { ALREADY_EXISTS, UNAUTHENTICATED } = grpc.status;

@Injectable()
export class ProfileService {
  constructor(
    protected readonly profileRepository: ProfileRepository,
    protected readonly eventEmitter: EventEmitter2,
  ) {}
  async findProfile(query: any): Promise<Profile> {
    try {
      return await this.profileRepository.find({
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

  async findAllProfiles(query: any): Promise<Profile[]> {
    try {
      return await this.profileRepository.findMany(query);
    } catch (error) {
      throw new RpcException({
        code: error.code,
        message: error.message ? error.message : error,
      });
    }
  }

  async createProfile(createProfileData: CreateProfileDto): Promise<Profile> {
    const { userId } = createProfileData;
    try {
      if (
        (
          (await this.profileRepository.findFirst({
            where: { userId },
          })) as any
        ).count > 0
      ) {
        throw new RpcException({
          code: ALREADY_EXISTS,
          message: 'Profile with credentials already exist.',
        });
      }

      const ProfileData = {
        firstName: '',
        middleName: '',
        lastName: '',
        phone: '',
        dob: '',
        userId: '',
        gender: '',
        address: '',
        city: '',
        state: '',
        country: '',
        occupation: '',
        bio: '',
        for: '',
        image: '',
        status: ProfileStatus.ACTIVE,
        authentication2FA: false,
        // socialHandles: [],
        user: {
          connect: {
            id: userId,
          },
        },
      };
      // delete ProfileData.confirmPassword;

      const newProfile = await this.profileRepository.create({
        data: ProfileData,
      });

      this.eventEmitter.emit('Profile-created', newProfile);
      Logger.debug(newProfile);
      return newProfile;
    } catch (error) {
      Logger.log(error);
      throw new RpcException({
        code: error.code,
        message: error.message ? error.message : error,
      });
    }
  }

  async updateProfile(updateProfileData: UpdateDto<Profile>) {
    Logger.debug(updateProfileData);
    try {
      return await this.profileRepository.update({
        where: { id: updateProfileData?.id },
        data: updateProfileData?.data,
      });
    } catch (error) {
      throw new RpcException({
        code: error.code,
        message: error.message ? error.message : error,
      });
    }
  }

  async upsertProfile(updateProfileData: UpdateDto<Profile>) {
    Logger.debug(updateProfileData);
    try {
      return await this.profileRepository.upsert({
        where: { id: updateProfileData?.id },
        data: updateProfileData?.data,
      });
    } catch (error) {
      throw new RpcException({
        code: error.code,
        message: error.message ? error.message : error,
      });
    }
  }

  async removeProfile(findProfileDto: FindOneDto): Promise<Profile> {
    try {
      return await this.profileRepository.delete({
        where: { id: findProfileDto.id },
      });
    } catch (error) {
      throw new RpcException({
        code: error.code,
        message: error.message ? error.message : error,
      });
    }
  }

  @OnEvent('Profile-created')
  sendVerificationEmail(payload: Profile) {
    console.log(payload);
  }
}
