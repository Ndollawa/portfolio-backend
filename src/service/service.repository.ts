import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceInterface } from './interfaces/service.interface';
import { EntityRepository } from 'src/common/database/entity-repository';

@Injectable()
export class ServiceRepository extends EntityRepository<ServiceInterface> {
  constructor(@InjectModel('Service') serviceModel: Model<ServiceInterface>) {
    super(serviceModel);
  }
}
