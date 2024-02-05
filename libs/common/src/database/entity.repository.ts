// import { PrismaRepository, MongooseRepository, SequelizeRepository, TypeORMRepository } from "./base-repository";

// type RepositoryKind = "Prisma" | "Mongoose" | "Sequelize" | "TypeORM"; 

// export class BaseRepository<T> {
//   private repository: PrismaRepository<T> | MongooseRepository<T> | SequelizeRepository<T> | TypeORMRepository<T>;

//   constructor(kind: RepositoryKind) {
//     switch (kind) {
//       case "Prisma":
//         this.repository = new PrismaRepository<T>();
//         break;
//       case "Mongoose":
//         this.repository = new MongooseRepository<T>();
//         break;
//       case "Sequelize":
//         this.repository = new SequelizeRepository<T>();
//         break;
//       case "TypeORM":
//         this.repository = new TypeORMRepository<T>();
//         break;
//       default:
//         throw new Error(`Unsupported repository kind: ${kind}`);
//     }
//   }

//   createEntity(data: T): Promise<T> {
//     return this.repository.createEntity(data);
//   }

//   findById(id: string): Promise<T | null> {
//     return this.repository.findById(id);
//   }

//   findAll(): Promise<T[]> {
//     return this.repository.findAll();
//   }

//   update(id: string, data: Partial<T>): Promise<T | null> {
//     return this.repository.update(id, data);
//   }

//   delete(id: string): Promise<boolean> {
//     return this.repository.delete(id);
//   }

//   exists(id: string): Promise<boolean> {
//     return this.repository.exists(id);
//   }
// }

// // Example usage:RepositorySwapper
// // const prismaSwapper = new BaseRepository<PrismaEntity>('Prisma');
// // const mongooseSwapper = new BaseRepository<MongooseEntity>('Mongoose');

// // prismaSwapper.createEntity(/* Prisma entity data */);
// // mongooseSwapper.createEntity(/* Mongoose entity data */);
