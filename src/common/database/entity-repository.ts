import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';
import { NotFoundException } from '@nestjs/common/exceptions';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  /**
   *
   * @param entityFilterQuery the query builder object to be used as a filter criteria
   * @param projection
   * @returns promise with an object of @interface T
   */
  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {
    const result = await this.entityModel
      .findOne(entityFilterQuery, {
        __v: 0,
        _id: 0,
        ...projection,
      })
      .exec();
    if (!result)
      throw new NotFoundException({ message: `Resource not found!` });
    return result;
  }

  /**
   *
   * @param entityFilterQuery the query builder object to be used as a filter criteria
   * @returns promise with an object of @interface T[]
   */
  async find(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T[] | null> {
    const result = await this.entityModel.find(entityFilterQuery, {
      __v: 0,
      _id: 0,
      ...projection,
    });
    if (!result)
      throw new NotFoundException({ message: `Resource not found!` });
    return result;
  }

  /**
   *
   * @param createEntityData
   * @returns promise with an object of @interface T
   */
  async create(createEntityData: unknown): Promise<T> {
    return await this.entityModel.create(createEntityData);
  }

  /**
   *
   * @param entityFilterQuery the query builder object to be used as a filter criteria
   * @param updateEntityData
   * @returns promise with an object of @interface T
   */
  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return await this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      { new: true },
    );
  }

  /**
   *
   * @param entityFilterQuery the query builder object to be used as a filter criteria
   * @returns promise with an object of @interface T
   */
  async deleteOne(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const result = await this.entityModel.deleteOne(entityFilterQuery);
    return result.deletedCount >= 1;
  }

  /**
   *
   * @param entityFilterQuery the query builder object to be used as a filter criteria
   * @returns promise with an object of @interface T
   */
  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const result = await this.entityModel.deleteMany(entityFilterQuery);
    return result.deletedCount >= 1;
  }
}
