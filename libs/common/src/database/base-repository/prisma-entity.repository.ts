import { Injectable } from "@nestjs/common";
import {RepositoryInterface,FF} from '../interfaces/repository.interface'

@Injectable()
export abstract class PrismaBaseRepository<M,C,R,U,D> implements RepositoryInterface<M> {
 constructor(private readonly prismaModel:any){}


  async create(createArgs:C): Promise<M> {
    return await this.prismaModel.create(createArgs);
  }

  async createMany(createArgs:C): Promise<M[]> {
    return await this.prismaModel.createMany(createArgs);
  }

  async find(queryFilterArgs:R): Promise<M | null> {
   return this.prismaModel.findUnique(queryFilterArgs);
  }

  async findMany(queryFilterArgs:R): Promise<M[]> {
    return await this.prismaModel.findMany(queryFilterArgs);
  }

  async findUniqueOrThrow(queryFilterArgs:R): Promise<M> {
    return await this.prismaModel.deleteMany(queryFilterArgs)!;
  }

  async exists(queryFilterArgs:R): Promise<FF<M>> {
    return await this.prismaModel.exist(queryFilterArgs)!;
  }

  async findFirst(queryFilterArgs:R): Promise<FF<M>> {
    return await this.prismaModel.deleteMany(queryFilterArgs)!;
  }

  async findFirstOrThrow(queryFilterArgs:R): Promise<M> {
    return await this.prismaModel.deleteMany(queryFilterArgs)!;
  }

  async upsert(queryUpdateArgs:U): Promise<M> {
    return await this.prismaModel.deleteMany(queryUpdateArgs)!;
  }

  async update(queryUpadateArgs:U): Promise<M | null> {
    return await this.prismaModel.update(queryUpadateArgs);
  }

  async updateMany(queryUpadateArgs:U): Promise<M[] | null> {
    return await this.prismaModel.updateMany(queryUpadateArgs);
  }

  async delete(queryDeleteArgs:D): Promise<M> {
    return await this.prismaModel.delete(queryDeleteArgs)!;
  }

  async deleteMany(queryDeleteArgs:D): Promise<M[]> {
    return await this.prismaModel.deleteMany(queryDeleteArgs)!;
  }

  async aggregate(queryFilterArgs:R): Promise<M[]> {
    return await this.prismaModel.deleteMany(queryFilterArgs)!;
  }

  async groupBy(queryFilterArgs:R): Promise<M[]> {
    return await this.prismaModel.deleteMany(queryFilterArgs)!;
  }

  async count(queryFilterArgs:R): Promise<FF<M>> {
    return await this.prismaModel.deleteMany(queryFilterArgs)!;
  }

}

// Example usage
// import { PrismaBaseRepository } from "./prisma-entity.epository";
// import { User } from "@prisma/client";

// export class UserRepository extends PrismaRepository<User> {
//   protected get prismaModel(): User {
//     return this.prisma.user;
//   }

//   // Additional methods specific to the User entity can be added here
// }
 
