
// import { EntityRepository, Repository, DeepPartial } from "typeorm";
// import { Injectable } from "@nestjs/common";

// @Injectable ()
// export abstract class TypeORMRepository<T extends BaseEntity> extends Repository<T> {
//   async createEntity(data: DeepPartial<T>): Promise<T> {
//     const entity = this.create(data);
//     return this.save(entity);
//   }

//   async findById(id: string): Promise<T | undefined> {
//     return this.findOne(id);
//   }

//   async findAll(): Promise<T[]> {
//     return this.find();
//   }

//   async update(id: string, data: DeepPartial<T>): Promise<T | undefined> {
//     await this.update(id, data);
//     return this.findOne(id);
//   }

//   async delete(id: string): Promise<boolean> {
//     const result = await this.delete(id);
//     return result.affected !== undefined && result.affected > 0;
//   }

//   async exists(id: string): Promise<boolean> {
//     return (await this.count({ where: { id } })) > 0;
//   }
// }

// // Example usage

// // import { EntityRepository, Repository } from ‘typeorm’;
// // import { User } from ‘./UserEntity’;
// // import { TypeORMRepository } from ‘./typeorm-entity.repository’;

// // @EntityRepository(User)
// // export class UserRepository extends TypeORMRepository<User> {}
