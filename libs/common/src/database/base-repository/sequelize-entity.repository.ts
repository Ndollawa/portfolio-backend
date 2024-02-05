// import { Model, ModelCtor, Sequelize, Optional } from "sequelize";
// import { BaseEntity } from "./BaseEntity";

// interface BaseAttributes {
//   // Define common attributes across all entities
// }

// export abstract class SequelizeRepository<T extends Model<BaseAttributes, T> & BaseEntity> {
//   protected readonly model: ModelCtor<T>;

//   constructor(sequelize: Sequelize, model: ModelCtor<T>) {
//     this.model = model;
//   }

//   async createEntity(data: Optional<BaseAttributes, "id">): Promise<T> {
//     return this.model.create(data);
//   }

//   async findById(id: string): Promise<T | null> {
//     return this.model.findByPk(id);
//   }

//   async findAll(): Promise<T[]> {
//     return this.model.findAll();
//   }

//   async update(id: string, data: Partial<BaseAttributes>): Promise<T | null> {
//     await this.model.update(data, { where: { id } });
//     return this.findById(id);
//   }

//   async delete(id: string): Promise<boolean> {
//     const result = await this.model.destroy({ where: { id } });
//     return result > 0;
//   }

//   async exists(id: string): Promise<boolean> {
//     return (await this.model.count({ where: { id } })) > 0;
//   }
// }

// //  Example usage
// // import { DataTypes, Sequelize } from "sequelize";
// // import { User } from "./UserModel";
// // import { SequelizeRepository } from "./sequelize-entity.repository";

// // const sequelize = new Sequelize(/* your Sequelize connection options */);

// // class UserRepository extends SequelizeRepository<User> {}

// // User.init(
// //   {
// //     // Define your user model attributes here
// //   },
// //   {
// //     sequelize,
// //     modelName: "User",
// //   }
// // );

// // export { sequelize, UserRepository };
